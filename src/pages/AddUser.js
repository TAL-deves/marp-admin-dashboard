import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Circles } from 'react-loader-spinner';
import Backdrop from '@mui/material/Backdrop';
import { getRequestHandler, patchRequestHandler, postRequestHandler } from '../apiHandler/customApiHandler';

function AddUser() {
  const location = useLocation();
  const { id } = useParams();
  let currentrole;
  if(id){
    currentrole = location.state.role;
  }
  else{
    currentrole="user"
  }
  const [email, setEmail] = useState()
  const [phoneNumber, setphoneNumber] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState("")
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [existingUser, setExistingUser] = useState()
  const navigate = useNavigate();
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  
  async function handleCreateUser() {
    setShow(true);
    try {
      const response = await postRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}admin/useraction`, {
        phoneNumber, email, password, role
      });
      // Handle the response data
      setShow(false);
      if (response.success) {
        navigate("/dashboard/user")
      }
      console.log("create user response", response);
      console.log("role response", role);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

 
  
  // get all data 
  async function handleGetAllDataforUpdate() {
    try {
      const response = await getRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}admin/useraction?role=${currentrole}`);
      // Handle the response data
      const matchedUser = response.data.allData.find(user => user.id === id);
      // setProductName(matchedProduct.name)
      setEmail(matchedUser.email)
      setphoneNumber(matchedUser.phoneNumber)
      setRole(matchedUser.role)
      setExistingUser(true)
      // setPassword()
      console.log("main data", matchedUser.role);

    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
  // update data 
  async function handleUpdateProduct() {
    setShow(true);

    try {
      const response = await patchRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}admin/useraction`, {
        id, email, phoneNumber, role
      });
      // Handle the response data
      setShow(false);
      // if(response.success){
      //   navigate("/dashboard/user")
      // }
      console.log("update", response)
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  useEffect(() => {
    if(id){
      handleGetAllDataforUpdate()
    }

  }, [])

  return (
    <div>
      
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

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography sx={{ fontSize: "32px" }}>Create User</Typography>
          {existingUser ?
            <TextField
              // sx={{ width: "24.5rem" }}
              sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, m: ".5rem" }}
              label="Email"
              name="name"
              type="email"
              value={email}
              focused
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            /> :
            <TextField
              // sx={{ width: "24.5rem" }}
              sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, m: ".5rem" }}
              label="Email"
              name="name"
              type="email"
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />}
          {existingUser ?
            <TextField
              // sx={{ width: "24.5rem" }}
              sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, m: ".5rem" }}
              label="phoneNumber"
              name="name"
              type="phone"
              value={phoneNumber}
              focused
              variant="outlined"
              onChange={(e) => setphoneNumber(e.target.value)}
            /> :
            <TextField
              // sx={{ width: "24.5rem" }}
              sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, m: ".5rem" }}
              label="phoneNumber"
              name="name"
              type="phone"
              value={phoneNumber}
              // focused
              variant="outlined"
              onChange={(e) => setphoneNumber(e.target.value)}
            />}

          {/* <IconButton onClick={handleTogglePasswordVisibility}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton> */}
          <FormControl sx={{ m: ".5rem" }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, }}
              value={role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={"shipper"}>Shipper</MenuItem>
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
          {!existingUser ?
            <TextField
              // sx={{ width: "24.5rem" }}
              sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, m: ".5rem" }}
              label="Password"
              name="name"
              type={showPassword ? 'text' : 'password'}
              value={password}
              // focused
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            :
            <></>}
          {!existingUser ?
            <Box sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, textAlign: "center", backgroundColor: "#6EAB49", m: ".5rem", height: "51px", borderRadius: "4px", fontSize: "28px", color: "white", pt: "3px", cursor: "pointer" }} onClick={() => { handleCreateUser() }}>
              Create
            </Box>
            :
            <Box sx={{ width: { xs: "21rem", sm: "24.5rem", md: "24.5rem" }, textAlign: "center", backgroundColor: "#6EAB49", m: ".5rem", height: "51px", borderRadius: "4px", fontSize: "28px", color: "white", pt: "3px", cursor: "pointer" }} onClick={() => { handleUpdateProduct() }}>
              Update
            </Box>}
        </Box>
      }
    </div>
  )
}

export default AddUser
