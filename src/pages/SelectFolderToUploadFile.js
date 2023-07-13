import React, { useEffect, useState } from 'react'
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
import { getRequestHandler } from '../apiHandler/customApiHandler';

function SelectFolderToUploadFile() {
    const [folder, setFolder] = useState()
    const [show, setShow] = useState(false)
    const [bucketList, setBucketList] = useState([])
    // get 
    async function handleGetAllBucket() {
        setShow(true)
        try {
            const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket`);
            // Handle the response data
            setShow(false)
            setBucketList(response.data.data)
        } catch (error) {
            // Handle the error
            console.error(error);
            setShow(false)
        }
    }
    useEffect(() => {
        handleGetAllBucket()
    }, [])
    const handleChange = (event) => {
        setFolder(event.target.value);
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

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "5rem" }}>
                    <Box sx={{ width: "404px", height: "209px", backgroundColor: "#E8E8E8", borderRadius: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <FormControl sx={{ width: "90%" }}>
                            <InputLabel id="demo-simple-select-label">Select Folder</InputLabel>
                            <Select
                                //   sx={{margin:".5rem"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={folder}
                                label="Select Folder"
                                onChange={handleChange}
                            >
                                {bucketList.map((bucket) => (
                                    <MenuItem value={bucket.name}>{bucket.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Link style={{ textDecoration: "none", color: "black" }} to={`/dashboard/upload-files-to-bucket/${folder}`}>
                        <Box sx={{ margin: ".3rem", border: "1px solid #03A550", borderRadius: 1, padding: ".4rem", backgroundColor: "#03A550", color: "white", cursor: "pointer" }} >
                            Next
                        </Box>
                        </Link>
                    </Box>
                </Box>

            </Box>
        </>}
        </>
    )
}

export default SelectFolderToUploadFile
