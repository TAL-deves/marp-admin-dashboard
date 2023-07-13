import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { Circles } from 'react-loader-spinner';
import Box from '@mui/material/Box';
import { getRequestHandler } from '../apiHandler/customApiHandler';

function Bucketimages() {
    const name= useParams()
    const [show, setShow]= useState(false)
    const [files, setFiles]=useState([])
    console.log("name", name.name)

    async function handleGetAllImages() {
        setShow(true)
        try {
          const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket/files?bucketName=${name.name}&items=45`);
          // Handle the response data
        //   const matchedProduct = response.data.data.find(bucket => bucket.name === name.name);
          console.log("main data", response.data.data);
          setShow(false)
          setFiles(response.data.data)
        } catch (error) {
          // Handle the error
          console.error(error);
          setShow(false)
        }
      }

      useEffect(()=>{handleGetAllImages()},[])
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
    
    <Box sx={{margin:"2rem"}}>
    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
    <Link style={{ textDecoration: "none" }} to="/dashboard/bucket">
        <Box sx={{border:"1px solid #6610F2", borderRadius:1, padding:".4rem", backgroundColor:"#6610F2", color:"white"}}>
          Folder
        </Box>
        </Link>
        <Box sx={{display:"flex"}}>
        <Link style={{ textDecoration: "none" }} to="/dashboard/create-new-bucket">
            <Box sx={{margin:".3rem", border:"1px solid #03A550", borderRadius:1, padding:".4rem",backgroundColor:"#03A550", color:"white"}}>
                + New Bucket
            </Box >
            </Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/delete-bucket">
            <Box sx={{margin:".3rem", border:"1px solid #EB2127", borderRadius:1, padding:".4rem", backgroundColor:"#EB2127", color:"white"}}>
                + Delete file
            </Box>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/select-folder-to-upload">
            <Box sx={{margin:".3rem", border:"1px solid #03A550", borderRadius:1, padding:".4rem", backgroundColor:"#03A550", color:"white"}}>
                + Upload file
            </Box>
            </Link>
        </Box>
    </Box>

    <Box sx={{marginTop:"5rem"}}>
    <Grid container spacing={2}>
    {files.map((file) => (
        <>
        {/* <Typography>{file}</Typography> */}
        {/* <img src={file} alt="" /> */}
        <Grid item xs={12} sm={6} md={4}>
        <img height="300" width="300"  src={`https://oajxusxzqqhuwzvyniyc.supabase.co/storage/v1/object/public/${name.name}/${file}`} alt="" />
        </Grid>
        </>
      ))}
      </Grid>
    </Box>
    
    </Box>
    </>}
    </>
  )
}

export default Bucketimages
