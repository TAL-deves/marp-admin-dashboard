import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   },
// }));

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: 480,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: theme.palette.background.default,
// }));

// const StyledContent = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0),
// }));

// ----------------------------------------------------------------------

export default function LoginPage() {
  // const AccessToken=localStorage.getItem("accessToken")
  // const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | Admin Dashboard </title>
      </Helmet>
<Box sx={{display:"flex",
      justifyContent:"start",
      alignItems:"start",
      // height:"80vh"
      }}>
      <Logo/>
</Box>
      <Grid container>
  <Grid item xs={12} sm={5}>
    <Box sx={{display:"flex",
      justifyContent:"center",
      alignItems:"center"}}>
<Box>
<Typography variant="h3" sx={{ px:5, mt:4, margin:"auto" }}>
              Hi, Welcome admin
            </Typography>
            <Box sx={{width:{xs:"70%", sm:"90%", lg:"100%"}, margin:"auto"}}>
            <img src="/assets/devias-kit-pro.png" alt="login" />
            </Box>
</Box>
    </Box>
  </Grid>
  <Grid item xs={12} sm={7}>

  <Box sx={{display:"flex",
      justifyContent:"center",
      alignItems:"center",
      mb:3
      }}>
<Box>
<Typography variant="h3">
                    Sign in to Admin Dashboard
            </Typography>
            <Box sx={{width:"100%"}}>
            <LoginForm />
            </Box>
{/* <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Admin Dashboard
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container> */}
</Box>
    </Box>
  </Grid>
</Grid>
    </>
  );
}
