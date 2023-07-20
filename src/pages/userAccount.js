import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import Modal from '@mui/material/Modal';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getRequestHandler, postRequestHandler, patchRequestHandler, photoUploadRequestHandler, deleteRequestHandler} from "../apiHandler/customApiHandler"
import BackDrop from "../backDrop"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const Container = styled('div')({
    border: '2px dotted #03A550',
    borderRadius:"10px",
    height: "6rem",
    width: "100%",
    textAlign: 'center',
    // justifyContent:"center",
    // alignContent:"center"
    // cursor: 'pointer',
  });

const userAccount = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [reloader, setReloader]=React.useState(true);
// eslint-disable-next-line react-hooks/rules-of-hooks
const [password, setPassword]=useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const [ConPassword, setConPassword]=useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const [show, setShow]=useState(false)
// eslint-disable-next-line react-hooks/rules-of-hooks
const [role, setRole]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [phoneNumber, setPhoneNumber]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [email, setEmail]=useState("")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setShow(true);
        async function getData() {
          const adminProfile = await getRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}admin/profile`);
          // setData(adminProfile.data);
          setRole(adminProfile.data.role);
          setPhoneNumber(adminProfile.data.phoneNumber);
          setEmail(adminProfile.data.email);
          console.log("admin Profile response", adminProfile.data);
          setShow(false);
        }
        getData();
      }, [reloader]);
// console.log("admin email", data?.email);
// const name="Admin dashboard";
// const phoneNumber="01515212610";
// const password="100200300";


const handleUpdateProfile=()=>{
    // console.log("update button clicked phn eml pwd", phoneNumber, email, password );
    async function getData() {
        const adminProfileRes = await patchRequestHandler(`https://marpapi.techanalyticaltd.com/admin/updateaccountinfo`, {phoneNumber, email, role});
        // setData(categoriesData.data);
        console.log("admin Profile update Res", adminProfileRes);
        setReloader(!reloader);
      }
      getData();
}
const handleSetPassword=()=>{
    // const userId=data.id;
    console.log("Set Password button" , password);
    async function getData() {
      const adminProfileRes = await patchRequestHandler(`https://marpapi.techanalyticaltd.com/admin/updateaccountinfo`, {password});
        // setData(categoriesData.data);
        console.log("admin profile set password", adminProfileRes);
        // setShow(false);
        setPassword("");
        setConPassword("")
      }
      getData();
}





// eslint-disable-next-line react-hooks/rules-of-hooks
const [droppedImages, setDroppedImages] = useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const [createFile, setCreateFile] = useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const fileInputRef = React.useRef(null);
const handleDragOver = (event) => {
  event.preventDefault();
};
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
    console.log("update image ");
  const images = Array.from(files).map((file) => URL.createObjectURL(file));
  setDroppedImages(images);
  const profilePhoto= new FormData();
  profilePhoto.append('image', files[0]);
  async function getData() {
    try {
      await photoUploadRequestHandler(`https://marpapi.techanalyticaltd.com/admin/profile/uploadpicture`, profilePhoto)
     .then((response)=>setCreateFile(response.data.data.publicUrl))
     console.log("image updated response", createFile);
     setShow(false);
   } catch (error) {
     console.error(error);
   }}
  getData();
};

const handleBrowseClick = () => {
    console.log("handle Browse Click");
  fileInputRef.current.click();
};

const handleDeleteCategoryImage=async()=>{
    let parts;
    let fileNames;
    console.log("createFile category image __", createFile);
    if(createFile)
    {
      parts = createFile.split("profilePhotos/");
     fileNames = parts.pop();
    }
    try {
      const response = await deleteRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket/files`,{"bucketName": "profilePhotos", fileNames});
      // Handle the response data
      console.log("image delete response", response);
      setShow(false)
      setDroppedImages(false);
    } catch (error) {
      // Handle the error
      console.error(error);
      setDroppedImages(false);
    }
  }

// eslint-disable-next-line react-hooks/rules-of-hooks
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

  return(
    <>
    <Helmet>
    <title> Profile | admin dashboard </title>
  </Helmet>

        <Box sx={{ paddingX: "2%" }}>
            {
                show ?
<BackDrop show={show}/>
:
<>
   <Typography variant='h2' >User Profile</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems="center"
                        justifyContent={'center'}
                        margin='auto'
                        maxWidth={540}
                        marginTop={5}
                        //    padding={3}
                        borderRadius={2}
                        boxShadow={'5px 5px 10px #ccc'}
                        sx={{
                            ":hover": {
                                boxShadow: '10px 10px 20px #ccc'
                            }
                        }}
                    >
                    <Typography variant='h4'>Personal Details </Typography>
                        <Avatar sx={{width:160,height:160, marginTop:3}} alt="Travis Howard" src={"../../assets/images/avatars/tree-736885_1280.jpg"} />
                        {/* <Avatar sx={{width:160,height:160, marginTop:3}} alt="Travis Howard" src={"../../assets/images/avatars/tree-736885_1280.jpg"} /> */}
                        {/* <Box sx={{display:'flex',
              justifyContent:'center',
              alignContent:'center',
              marginY:5
              }}>
                  <Box sx={{ display: "flex" }}> 
                   {
                    droppedImages ?
                    <>
                    <Container sx={{ mx: ".5rem" }}>
                    <img src={droppedImages} alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                          <DeleteForeverIcon sx={{color:'red'}} onClick={handleDeleteSubImage}/>
                  </Container> 
                    </>
                  :
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", m: "1rem", mx:"1.5rem"}} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Box >
                    <FileDownloadIcon/>
                      <Typography>Drag and drop your file here<br/> or</Typography>
                      <div>
                        <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>SELECT FILE</Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileInputChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </Box>
                  </Container>
                   }
                </Box>
              </Box> */}
                        <Button
                        onClick={handleOpen}
                         variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, marginY:2, width:"80%"}}>UPDATE YOUR IMAGE</Button>
                        {/* <Box
                           alignItems="center"
                           justifyContent={'center'}
                          > */}
                   {/* <Typography>
                    Full Name
                   </Typography> */}
                   <TextField id="outlined-basic" label="Full Name" variant="filled" type="text"
                   defaultValue={role}
                   onChange={(e)=>setRole(e.target.value)}
                    sx={{width:"80%", marginX:"10%", marginY:"2%"}}/>
                   {/* <Typography>
                    Phone Number
                   </Typography> */}
                   <TextField id="outlined-basic" label="Phone Number" variant="filled" type="number"
                   defaultValue={phoneNumber}
                   sx={{width:"80%", marginX:"10%", marginY:"2%"}}
                   onChange={(e)=>setPhoneNumber(e.target.value)}/>
                   {/* <Typography>
                    Email 
                   </Typography> */}
                   <TextField id="outlined-basic" label="Email" variant="filled" type="email"
                   defaultValue={email}
                   sx={{width:"80%", marginX:"10%", marginY:"2%"}}
                   onChange={(e)=>setEmail(e.target.value)}
                   />
                   <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, marginY:2, width:"80%"}} onClick={handleUpdateProfile}>UPDATE</Button>
                        {/* </Box> */}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems="center"
                        justifyContent={'center'}
                        margin='auto'
                        maxWidth={480}
                        marginTop={5}
                        //    padding={3}
                        borderRadius={2}
                        boxShadow={'5px 5px 10px #ccc'}
                        sx={{
                            ":hover": {
                                boxShadow: '10px 10px 20px #ccc'
                            }
                        }}
                    >
                        <Typography variant='h4'>Change your password</Typography>
                        <img src="../../assets/confirm password.png" alt="Italian Trulli"/>
                        {/* <Box
                           alignItems="center"
                           justifyContent={'center'}
                          > */}
                   {/* <Typography>
                    New Password
                   </Typography> */}
                   <TextField id="outlined-basic" label="New Password" variant="filled" type="password" 
                   sx={{width:"80%", marginX:"10%", marginY:"2%"}}
                   onChange={(e)=>setPassword(e.target.value)}/>
                   {/* <Typography>
                    Confirm Password
                   </Typography> */}
                   <TextField id="outlined-basic" label="Confirm Password" variant="filled" type="password" 
                   sx={{width:"80%", marginX:"10%"}} onChange={(e)=>setConPassword(e.target.value)}/>
                   {
                    (password===ConPassword && true) ?
                    <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                      bgcolor: '#6EAB49'
                  }, marginY:2, width:"80%"}} 
                  onClick={handleSetPassword}
                  >SET PASSWORD</Button> :
                  <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                    bgcolor: '#6EAB49'
                }, marginY:2, width:"80%"}} 
                onClick={handleSetPassword}
                >DISABLE BUTTON</Button>
                   }
                   {/* <Button disabled variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, marginY:2, width:"80%"}} 
                            onClick={handleSetPassword}
                            >SET PASSWORD</Button> */}
                        </Box>
                    {/* </Box> */}
                </Grid>
            </Grid>
</>
            }
        </Box>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
              <Box>
              <Box sx={{display:'flex',
              justifyContent:'center',
              alignContent:'center',
              marginY:5
              }}>
                  <Box sx={{ display: "flex" }}> 
                   {
                    droppedImages ?
                    <>
                    <Container sx={{ mx: ".5rem" }}>
                    <img src={droppedImages} alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                          <DeleteForeverIcon sx={{color:'red'}} onClick={handleDeleteCategoryImage}/>
                  </Container> 
                    </>
                  :
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", m: "1rem", mx:"1.5rem"}} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Box >
                    <FileDownloadIcon/>
                      <Typography>Drag and drop your file here<br/> or</Typography>
                      <div>
                        <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>SELECT FILE</Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileInputChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </Box>
                  </Container>
                   }
                </Box>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
            
              }}>
              {/* <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>Choose Image</Button> */}
              <Button variant="contained" 
              sx={{
                bgcolor: "#6610F2", ":hover": {
                  bgcolor: '#6EAB49'
                }, width: "32%"}}
               onClick={handleUpdateProfile}>Save Photo</Button>
              </Box>
              {/* <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>Choose Image</Button>
              <Button variant="contained" sx={{
                bgcolor: "#6610F2", ":hover": {
                  bgcolor: '#6EAB49'
                }, width: "32%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                margin: 'auto'
              }} onClick={handleUpdateProfile}>Save Photo</Button> */}
            </Box>
          </Box>
      </Modal>

        </>
        )
};
export default userAccount;