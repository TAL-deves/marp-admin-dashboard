import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { Circles } from 'react-loader-spinner';
import Box from '@mui/material/Box';
import { deleteRequestHandler, getRequestHandler } from '../apiHandler/customApiHandler';
import deleteIcon from "../img/delete.png";

const DeleteBucket = () => {
    const [show, setShow]= useState(false)
    const [bucketList, setBucketList]= useState([])
    const navigate = useNavigate();
// get 
    async function handleGetAllBucket() {
        setShow(true)
        try {
          const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket`);
          // Handle the response data
          console.log("bucket res", response.data.data)
          
          setShow(false)
          setBucketList(response.data.data)
        } catch (error) {
          // Handle the error
          console.error(error);
          setShow(false)
        }
      }

      // delete 
      async function handleDeleteBucket(name) {
        setShow(true)
        try {
          const response = await deleteRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket`,{name});
          // Handle the response data
          console.log("bucket delete response", response.data.encoded.success)
          if(response.data.encoded.success===true){
            navigate("/dashboard/bucket")
          }
          setShow(false)
        } catch (error) {
          // Handle the error
          console.error(error);
          setShow(false)
        }
      }
   useEffect(()=>{
    handleGetAllBucket()
   },[])
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
        <Box sx={{border:"1px solid #6610F2", borderRadius:1, padding:".4rem", backgroundColor:"#6610F2", color:"white"}}>
          Folder
        </Box>
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
    {bucketList.map((bucket) => (
      <Box sx={{display:"flex",justifyContent: "space-between" }}>
        <Typography sx={{fontSize:"18px", fontWeight:500,lineHeight:"21.6px", paddingY:"1rem"}} key={bucket.id}>{bucket.name}</Typography>
        <Box sx={{display:"flex", alignItems:"center", cursor:"pointer"}} onClick={()=>{handleDeleteBucket(bucket.name)}}>
          <img src={deleteIcon} alt="" />
          <Typography sx={{color:"red", padding:".3rem"}}>Delete</Typography>
        </Box>
        </Box>
      ))}
    </Box>
    
    </Box>
    </>}
    </>
  )
}

export default DeleteBucket
