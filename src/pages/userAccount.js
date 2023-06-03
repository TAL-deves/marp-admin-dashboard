// import { useState, useEffect } from "react";
// import * as React from "react";
// // prop-types is a library for typechecking of props.
// import PropTypes from "prop-types";

// // @mui material components
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Avatar from "@mui/material/Avatar";
// import { Button, TextField } from "@mui/material";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
// // import AppBar from "@mui/material/AppBar";
// // import Tabs from "@mui/material/Tabs";
// // import Tab from "@mui/material/Tab";
// // import Icon from "@mui/material/Icon";
// // import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

// // Material Dashboard 2 React components
// // import Box from "components/Box";
// // import MDTypography from "components/MDTypography";
// // import Avatar from "components/Avatar";

// // Material Dashboard 2 React base styles
// // eslint-disable-next-line import/no-unresolved
// import breakpoints from "../../../public/assets/devias-kit-pro.png";
// import vision2 from "../../public/assets/transparent.png"

// // Images
// // import burceMars from "assets/images/user2.png";
// // import backgroundImage from "assets/images/bg-image2.jpg";
// // import vision2 from "../../../../assets/images/confirm password.png";

// // const style = {
// //   position: "absolute",
// //   top: "50%",
// //   left: "50%",
// //   transform: "translate(-50%, -50%)",
// //   width: 400,
// //   bgcolor: "background.paper",
// //   border: "2px solid #000",
// //   boxShadow: 24,
// //   p: 4,
// // };

// function Header({ children }) {
//   // eslint-disable-next-line no-undef
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [tabsOrientation, setTabsOrientation] = useState("horizontal");
//   // const [tabValue, setTabValue] = useState(0);

//   useEffect(() => {
//     // A function that sets the orientation state of the tabs.
//     function handleTabsOrientation() {
//       return window.innerWidth < breakpoints.values.sm
//         ? setTabsOrientation("vertical")
//         : setTabsOrientation("horizontal");
//     }
//     // eslint-disable-next-line no-unused-vars
//     // const handleClickUpload = () => setOpen(false);
//     // const handleOpen2 = () => {
//     //   console.log("Upload image");
//     //   const url = `${process.env.REACT_APP_API_URL}/api/uploadimage`
//     //   if (image) {
//     //     let webimage = image
//     //     api.post(url,
//     //       JSON.stringify({ username, webimage }),
//     //       {
//     //         headers: { 'Content-Type': 'application/json' },
//     //         'Access-Control-Allow-Credentials': true,
//     //       }).then((e) => {
//     //         // //// console.log(e.data.data.result.status)
//     //         swal("Profile Photo Uploaded!", "", "success")
//     //         window.reload("/")
//     //       })
//     //   }
//     //   else {
//     //     api.post(url,
//     //       JSON.stringify({ username, webimage }),
//     //       {
//     //         headers: { 'Content-Type': 'application/json' },
//     //         'Access-Control-Allow-Credentials': true,
//     //       }).then((e) => {
//     //         // console.log(e, 'photo up')
//     //         swal("Profile Photo Uploaded!", "", "success")
//     //         handleGetUserImage();
//     //       })
//     //   }
//     //   setOpen(false);
//     // };
//     /** 
//      The event listener that's calling the handleTabsOrientation function when resizing the window.
//     */
//     window.addEventListener("resize", handleTabsOrientation);

//     // Call the handleTabsOrientation function to set the state with the initial value.
//     handleTabsOrientation();

//     // Remove event listener on cleanup
//     return () => window.removeEventListener("resize", handleTabsOrientation);
//   }, [tabsOrientation]);

//   // const handleSetTabValue = (event, newValue) => setTabValue(newValue);

//   return (
//     <Box position="relative" mb={5}>
//       <Box
//         display="flex"
//         alignItems="center"
//         position="relative"
//         minHeight="18.75rem"
//         borderRadius="xl"
//         sx={{
//           backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
//             `${linearGradient(
//               rgba(gradients.info.main, 0.6),
//               rgba(gradients.info.state, 0.6)
//             )}, url(${breakpoints})`,
//           backgroundSize: "cover",
//           backgroundPosition: "50%",
//           overflow: "hidden",
//         }}
//       />
//       <Card
//         sx={{
//           position: "relative",
//           mt: -8,
//           mx: 3,
//           py: 2,
//           px: 2,
//         }}
//       >
//         <Grid container spacing={3} alignItems="center">
//           <Grid item>
//             <Avatar src={vision2} alt="profile-image" size="xl" shadow="sm" />
//           </Grid>
//           <Grid item>
//             <Box height="100%" mt={0.5} lineHeight={1}>
//               <Typography variant="h5" fontWeight="medium">
//                 Mr.X
//               </Typography>
//               <Typography variant="button" color="text" fontWeight="regular">
//                 CEO / Co-Founder
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//         <Box sx={{ marginTop: 4 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <form>
//                 <Box
//                   display="flex"
//                   flexDirection="column"
//                   alignItems="center"
//                   justifyContent="center"
//                   margin="auto"
//                   minWidth={240}
//                   marginTop={5}
//                   padding={3}
//                   borderRadius={5}
//                   boxShadow="5px 5px 10px #ccc"
//                   sx={{
//                     ":hover": {
//                       boxShadow: "10px 10px 20px #ccc",
//                     },
//                   }}
//                 >
//                   <Typography sx={{}} variant="h4" fontWeight="medium">
//                     PERSONAL DETAILS
//                   </Typography>
//                   <Avatar
//                     sx={{ width: 160, height: 160, margin: 2 }}
//                     alt="Remy Sharp"
//                     src="/static/media/user2.3660912b9f1a827bed6c.png"
//                   />
//                   <Button
//                     sx={{
//                       backgroundColor: "#D4E6F1  ",
//                       color: "#2C3E50 ",
//                       "&:hover": {
//                         backgroundColor: "#A9CCE3  ",
//                       },
//                     }}
//                     variant="outlined"
//                     onClick={handleOpen}
//                   >
//                     UPLOAD YOUR IMAGE
//                   </Button>
//                   {/* <input name="myFile" accept="image/*" type="file" /> */}
//                   <TextField
//                     sx={{ width: 260 }}
//                     margin="normal"
//                     label="Name"
//                     name="name"
//                     type="name"
//                     defaultValue="Defaul Value"
//                     variant="outlined"
//                     // onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <TextField
//                     sx={{ width: 260 }}
//                     margin="normal"
//                     label="Phone Number"
//                     name="phone"
//                     type="phone"
//                     defaultValue="Defaul Value"
//                     variant="outlined"
//                     // onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <TextField
//                     sx={{ width: 260 }}
//                     margin="normal"
//                     label="Email"
//                     name="email"
//                     type="text"
//                     defaultValue="Defaul Value"
//                     // onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <Button
//                     sx={{
//                       width: 260,
//                       backgroundColor: "#A9CCE3  ",
//                       "&:hover": {
//                         backgroundColor: "#7FB3D5  ",
//                       },
//                     }}
//                     // variant="contained"
//                   >
//                     Update Now
//                   </Button>
//                 </Box>
//               </form>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <form>
//                 <Box
//                   display="flex"
//                   flexDirection="column"
//                   alignItems="center"
//                   justifyContent="center"
//                   margin="auto"
//                   minWidth={240}
//                   marginTop={5}
//                   padding={3}
//                   borderRadius={5}
//                   boxShadow="5px 5px 10px #ccc"
//                   sx={{
//                     ":hover": {
//                       boxShadow: "10px 10px 20px #ccc",
//                     },
//                   }}
//                 >
//                   <Typography sx={{}} variant="h5" fontWeight="medium">
//                     CHANGE YOUR PASSWORD
//                   </Typography>
//                   {/* <Avatar
//                     sx={{ width: 160, height: 160 }}
//                     alt="Remy Sharp"
//                     src="../../../../assets/images/confirm password.png"
//                   /> */}
//                   <img width={260} src={breakpoints} alt="confirm" />
//                   <TextField
//                     sx={{ width: 260, color: "primary.main" }}
//                     margin="normal"
//                     label="New Password"
//                     name="new password"
//                     type="text"
//                     variant="outlined"
//                     // onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <TextField
//                     sx={{ width: 260, color: "primary.main" }}
//                     margin="normal"
//                     label="Confirm Password"
//                     name="confirm password"
//                     type="text"
//                     variant="outlined"
//                     // onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <Button
//                     sx={{
//                       width: 260,
//                       backgroundColor: "#A9CCE3 ",
//                       "&:hover": {
//                         backgroundColor: "#7FB3D5  ",
//                       },
//                     }}
//                     // variant="contained"
//                   >
//                     Set Password
//                   </Button>
//                 </Box>
//               </form>
//             </Grid>
//           </Grid>
//         </Box>
//         {/* <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}> */}
//         {/* <AppBar position="static">
//               <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
//                 <Tab
//                   label="Home"
//                   icon={
//                     <Icon fontSize="small" sx={{ mt: -0.25 }}>
//                       home
//                     </Icon>
//                   }
//                 />
//                 <Tab
//                   label="Message"
//                   icon={
//                     <Icon fontSize="small" sx={{ mt: -0.25 }}>
//                       email
//                     </Icon>
//                   }
//                 />
//                 <Tab
//                   label="Settings"
//                   icon={
//                     <Icon fontSize="small" sx={{ mt: -0.25 }}>
//                       settings
//                     </Icon>
//                   }
//                 />
//               </Tabs>
//             </AppBar> */}
//         {/* </Grid> */}
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: { md: "50%", xs: "80%", sm: "80%" },
//               bgcolor: "#3f51b5",
//               border: "2px solid #000",
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <Typography
//               id="modal-modal-title"
//               sx={{
//                 fontSize: "1.5rem",
//                 fontWeight: "800",
//                 color: "primary.main",
//                 textAlign: "center",
//               }}
//             >
//               Please upload your image
//             </Typography>
//             <Box>
//               <Box>
//                 <input name="myFile" accept="image/*" type="file" />
//               </Box>
//               {/* <Typography sx={{ fontSize: "1.5rem", fontWeight: "800", color: "primary.main", textAlign: "center" }}>
//                   Or
//                 </Typography> */}
//               <Box>
//                 {/* <Grid
//                   sx={{
//                     display: "flex",
//                     flexDirection: { md: "row", lg: "row", sm: "column", xs: "column" },
//                   }}
//                 >
//                   <Grid xs={4} md={4}>
//                     {hasCameraPermission ?
//                       <Webcam
//                         audio={false}
//                         height={200}
//                         ref={webcamRef}
//                         mirrored={true}
//                         screenshotFormat="image/webp"
//                         width={220}
//                         videoConstraints={videoConstraints}
//                         sx={{ margin: "1rem" }}
//                       /> :
//                       <>
//                         {/* <Container sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             marginTop: "5rem"
//                           }}>
//                             <CircularProgress sx={{
//                               color: "primary.main"
//                             }} />
//                           </Container> */}
//                 {/* </>
//                   </Grid>
//                   <Grid xs={8} md={8} sx={{ marginLeft: { xs: "0rem", md: "8rem", lg: "8rem" } }}>
//                     {webimage ?
//                       <>
//                         {webimage.length < 2048000 ?
//                           <img src={webimage} alt=""
//                             style={{
//                               //  width: {md:"200",lg:"200", sm:"100" ,xs:"100"}, 
//                               //  height: {md:"200",lg:"200", sm:"100" ,xs:"100"},
//                               height: "200px",
//                               width: "200px",
//                               objectFit: "contain"
//                             }} /> : <Typography sx={{ color: "red" }}>Image is too big, try an image smaller than 2MB</Typography>}

//                       </> :
//                       <>{image ? <img src={(image)} alt=""
//                       // style={{maxWidth: "100%", height:"auto"
//                       //  }}
//                       /> :
//                         <Avatar
//                           alt="ss"
//                           sx={{ width: 200, height: 200, objectFit: "cover" }}
//                         />}</>
//                     }
//                   </Grid>
//                 </Grid>  */}

//                 <br />
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Button variant="outlined" onClick={handleClose}>
//                     Upload
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </Modal>
//         {children}
//       </Card>
//     </Box>
//   );
// }

// // Setting default props for the Header
// Header.defaultProps = {
//   children: "",
// };

// // Typechecking props for the Header
// Header.propTypes = {
//   children: PropTypes.node,
// };

// export default Header;
