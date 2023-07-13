import React, { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { Circles } from 'react-loader-spinner';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { getRequestHandler } from '../apiHandler/customApiHandler';

const Container = styled('div')({
    border: '2px dashed #03A550',
    borderRadius:"20px",
    height: "30rem",
    width: "30rem",
    textAlign: 'center',
    cursor: 'pointer',
    
  });

function UploadFilesToBucket() {
    const [folder, setFolder] = useState()
    const [show, setShow] = useState(false)
    const [bucketList, setBucketList] = useState([])

    const [droppedImages, setDroppedImages] = useState([]);
    const fileInputRef = useRef(null);
    const handleDragOver = (event) => {
      event.preventDefault();
    };
    // console.log("images list", droppedImages)
    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      handleFiles(files);
    };
  
    const handleFileInputChange = (event) => {
      const files = event.target.files;
      handleFiles(files);
    };
  
    const handleFiles = (files) => {
      const images = Array.from(files).map((file) => URL.createObjectURL(file));
      setDroppedImages((prevImages) => [...prevImages, ...images]);
    };
  
    const handleBrowseClick = () => {
      fileInputRef.current.click();
    };


    return (
        <>
        {show ?
        <>
          <Backdrop
            sx={{ color: '#808080', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            // eslint-disable-next-line no-restricted-globals
            open={open}
          >
            <Circles
              height="80"
              width="80"
              color="#c7eed8"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={show}
            />
          </Backdrop>
        </> :
        <>
            <Box sx={{ margin: "2rem" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link style={{ textDecoration: "none" }} to="/dashboard/bucket">
                        <Box sx={{ border: "1px solid #6610F2", borderRadius: 1, padding: ".4rem", backgroundColor: "#6610F2", color: "white" }}>
                            Folder
                        </Box>
                    </Link>
                    <Box sx={{ display: "flex" }}>
                        <Link style={{ textDecoration: "none" }} to="/dashboard/create-new-bucket">
                            <Box sx={{ margin: ".3rem", border: "1px solid #03A550", borderRadius: 1, padding: ".4rem", backgroundColor: "#03A550", color: "white" }}>
                                + New Bucket
                            </Box >
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/dashboard/delete-bucket">
                            <Box sx={{ margin: ".3rem", border: "1px solid #EB2127", borderRadius: 1, padding: ".4rem", backgroundColor: "#EB2127", color: "white" }}>
                                + Delete file
                            </Box>
                        </Link>
                        {/* <Link style={{ textDecoration: "none" }} to="/dashboard/select-folder-to-upload"> */}
                        <Box sx={{ margin: ".3rem", border: "1px solid #03A550", borderRadius: 1, padding: ".4rem", backgroundColor: "#03A550", color: "white" }}>
                            + Upload file
                        </Box>
                        {/* </Link> */}
                    </Box>
                </Box>

                <Box container spacing={2} sx={{justifyContent:"center", mt:"2rem"}}>
              {/* <ImageDragnDrop/> */}
              <Box sx={{ display: "" }}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ justifyContent: "space-between" }} container spacing={2}>
                    {droppedImages.map((image, index) => (
                      <Box key={index} item xs={4}>
                        <Container sx={{ mx: ".5rem" }}>
                          <img src={image} alt={`Dropped ${index}`} style={{ width: "auto", maxHeight: '100%' }} />
                        </Container>
                      </Box>
                    ))}
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around",alignItems:"center", m: "1rem", mx:"1.5rem" }} onDragOver={handleDragOver} onDrop={handleDrop}>
                      <Box >
                        
                        <Box sx={{display:""}}>
                        <Box sx={{backgroundColor:"#03A550", paddingY:".5rem", borderRadius:"10px" }}>
                          <Typography onClick={handleBrowseClick} style={{ color: "white", cursor: 'pointer' }}>
                            Upload
                          </Typography>
                          </Box>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                          />
                        </Box>
                        <Typography sx={{color:"#03A550",marginTop:"2rem"}}>---------- or drag stuff here ----------</Typography>
                      </Box>

                      <Typography onClick={handleBrowseClick} style={{ color: "#03A550", cursor: 'pointer' }}>
                            Upload Maximum 5 MB
                          </Typography>
                    </Container>
                    
                  </Box>
                </Box>


              </Box>

            </Box>

            </Box>
        </>}
        </>
    )
}

export default UploadFilesToBucket
