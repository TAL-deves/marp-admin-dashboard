import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';
import {getRequestHandler, postRequestHandler, patchRequestHandler} from "../apiHandler/customApiHandler"
import BackDrop from "../backDrop"



const userAccount = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [reloader, setReloader]=React.useState(true);
// eslint-disable-next-line react-hooks/rules-of-hooks
const [data, setData]=useState([])
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
          setData(adminProfile.data);
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
// const phoneNumber="01234567891";
const password="100200300";


const handleUpdateProfile=()=>{
    // console.log("update button clicked phn eml pwd", phoneNumber, email, password );
    async function getData() {
        const adminProfileRes = await patchRequestHandler(`https://marpapi.techanalyticaltd.com/admin/updateaccountinfo`, {phoneNumber, email, password});
        // setData(categoriesData.data);
        console.log("admin Profile update Res", adminProfileRes);
        setReloader(!reloader);
      }
      getData();
}
const handleSetPassword=()=>{
    const userId=data.id;
    console.log("Set Password button", userId);
    async function getData() {
        const categoriesData = await postRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}auth/resetpassword`, {userId});
        // setData(categoriesData.data);
        console.log("categoriesData", categoriesData);
        // setShow(false);
      }
      getData();
}

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
                        <Avatar sx={{width:160,height:160, marginTop:3}} alt="Travis Howard" src="../../assets/images/avatars/tree-736885_1280.jpg" />
                        <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
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
                   sx={{width:"80%", marginX:"10%", marginY:"2%"}}/>
                   {/* <Typography>
                    Confirm Password
                   </Typography> */}
                   <TextField id="outlined-basic" label="Confirm Password" variant="filled" type="password" 
                   sx={{width:"80%", marginX:"10%"}}/>
                   <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, marginY:2, width:"80%"}} 
                            onClick={handleSetPassword}
                            >SET PASSWORD</Button>
                        </Box>
                    {/* </Box> */}
                </Grid>
            </Grid>
</>
            }
        </Box>
        </>
        )
};
export default userAccount;