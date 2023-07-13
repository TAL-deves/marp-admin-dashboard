import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import { Circles } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { postRequestHandler } from '../apiHandler/customApiHandler';

function AddNewBucket() {
    const [name, setName] =useState()
    const [show, setShow]=useState(false)
    const navigate = useNavigate();
    async function handleAddBucket() {
        setShow(true);
        try {
          const response = await postRequestHandler('https://marpapi.techanalyticaltd.com/admin/bucket',{name
          });
          // Handle the response data
          setShow(false);
        if(response.success){
           navigate("/dashboard/bucket")
        }
           console.log("create user response",response);
           
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      }
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
       
            <Box sx={{margin:".3rem", border:"1px solid #03A550", borderRadius:1, padding:".4rem",backgroundColor:"#03A550", color:"white"}}>
                + New Bucket
            </Box >
            <Box sx={{margin:".3rem", border:"1px solid #EB2127", borderRadius:1, padding:".4rem", backgroundColor:"#EB2127", color:"white"}}>
                + Delete file
            </Box>
            <Box sx={{margin:".3rem", border:"1px solid #03A550", borderRadius:1, padding:".4rem", backgroundColor:"#03A550", color:"white"}}>
                + Upload file
            </Box>
        </Box>
    </Box>
    
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", mt:"5rem"}}>
    <Box sx={{width: "404px", height: "209px", backgroundColor: "#E8E8E8", borderRadius: 1, display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
    <TextField
        label="Bucket Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{mb: "1rem"}}
    />
    <Box onClick={()=>{handleAddBucket()}} sx={{margin:".3rem", border:"1px solid #03A550", borderRadius:1, padding:".4rem", backgroundColor:"#03A550", color:"white", cursor:"pointer"}} >
                Create
            </Box>
</Box>
</Box>

    </Box>
    </>}
    </>
  )
}

export default AddNewBucket
