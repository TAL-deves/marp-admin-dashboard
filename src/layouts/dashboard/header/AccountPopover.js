import { useState, useEffect  } from 'react';
// @mui
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { Circles } from 'react-loader-spinner'
// mocks_
import { useNavigate, useLocation} from 'react-router-dom';
import swal from 'sweetalert';
import BounceLoader from "react-spinners/BounceLoader";
// eslint-disable-next-line import/no-unresolved
import {getRequestHandler, logoutHandler } from 'src/apiHandler/customApiHandler';
import Link from "@mui/material/Link";
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import account from '../../../_mock/account';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {id:1,
    label: 'Home',
    icon: 'eva:home-fill',
    path:'/dashboard/app'
  },
  {
    id:2,
    label: 'Profile',
    icon: 'eva:person-fill',
    path:'/dashboard/profile'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(null);
  const [loader, setLoader] = useState(false);
  const [role, setRole] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose=()=>{
    // navigate('/dashboard/profile', { replace: true });
    setOpen(null);
  }
  const handleChange=(path)=>{
    if(path==="Home"){
      navigate('/dashboard/app', { replace: true });
    }else{
      navigate('/dashboard/profile', { replace: true }); 
    }
    handleClose();
    console.log("path ---", path);
  }

  // eslint-disable-next-line no-undef
  useEffect(() => {
    async function getData() {
      const adminProfile = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/profile`);
      setUrl(adminProfile.data.profile.profilePhotoBucketURL);
      setRole(adminProfile.data.role);
      setEmail(adminProfile.data.profile.fullName);
    }
    getData();
  }, [])


  const handleLogout =async() => {
    console.log("Log out button");
    // setOpen(null);
    setLoader(true);
    const data=await logoutHandler("https://marpapi.techanalyticaltd.com/admin/logout");
if(data.success){
  swal("Logged out!", "Your have successfully logged out!", "success");
  navigate('/login', { replace: true });
  setLoader(false);
}
  };

  return (
    <>
    {
      loader ?
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, height:"100vh" }}
      open={open}
      onClick={handleClose}
    >
      {/* <BounceLoader
color='#c7eed8'
        load={loader}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
            <Circles
  height="80"
  width="80"
  color="#c7eed8"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={loader}
/>
    </Backdrop> 
    :
 <>
     <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={url} alt="photoURL" />
      </IconButton>
     

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {role}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.id}
            onClick={()=>handleChange(option.label)}
            ><Typography>
               {option.label}
          </Typography>
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
<Box>
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
        </Box>
      </Popover> 
 </>
    }
    </>
  );
}
