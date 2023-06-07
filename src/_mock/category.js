import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import { getRequestHandler } from "src/apiHandler/customApiHandler";
import CardMedia from '@mui/material/CardMedia';
import ButtonGroup from '@mui/material/ButtonGroup';
// import picture from "../../assets/transparent.png"
import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from "@mui/material/Backdrop";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "52%",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius:3,
  boxShadow: 24,
  p: 4,
};


const Category = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState(false);
  // New category start from here 
  const [opens, setOpens] = useState(false);
  const handleOpen = () => setOpens(true);
  const handleClickUpdate=()=>{
    setOpens(false)
  }
  // const handleClickCancel=()=>{
  //   setOpens(false)
  // }
  const handleClickedCategory=()=>{
    handleOpen();
  }
  const handleClose = () => setOpens(false);

// New category start from here 
const [open, setOpen] = useState(false);
const handleClickedSubcategory=()=>{
  setOpen(true);
}
 
const handleClickCreate=()=>{
  setOpen(false)
}
const handleSubcategory = () => setOpen(false);

useEffect(() => {
  async function getData(){
    const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/category/");
    setData(categoriesData.data.categoryList)
  
    // console.log("categoriesData -----",typeof(categoriesData.data.categoryList[0]), categoriesData.data.categoryList[0]
    // );
  }
  getData();
}, []);


const handleClickedEdit=()=>{
  console.log("edit button");
}
const handleClickedDelete=()=>{
  console.log("Delete button");
}
const handleClickedSubmenu=()=>{
  console.log("Menu button");
  setMenu(!menu);
}


    return (
      <>
      <Helmet>
      <title> Category | admin dashboard </title>
    </Helmet>
    <Box sx={{marginX:5}}> 
    <Box sx={{ flexGrow: 1  }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Typography variant='h3' sx={{padding:0}}>Category</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{justifyContent:"end"}}>
        <Button onClick={handleClickedCategory} sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, marginX:2}}>NEW CATEGORY</Button>
      <Button onClick={handleClickedSubcategory} sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }}}>NEW SUBCATEGORY</Button>
        </Grid>
      
      </Grid>
    </Box>
        {
data.map((item)=>(
  <>
     <Card sx={{ width: "72%",  marginTop:3}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100%"
        width="200"
        image="./../../assets/Rectangle 181.png"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
   }}>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height:'100%',
   }}>
       <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>
      <Button onClick={handleClickedSubmenu}>{ menu ? <ArrowForwardIosIcon sx={{color:"#6610F2"}}/> : <KeyboardArrowDownIcon  sx={{color:"#6610F2"}}/>}</Button>
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
     <Card sx={{ width: "72%",  marginTop:3}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100%"
        width="200"
        image="./../../assets/Rectangle 181.png"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
   }}>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height:'100%',
   }}>
       <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>
      <Button onClick={handleClickedSubmenu}>{ menu ? <ArrowForwardIosIcon sx={{color:"#6610F2"}}/> : <KeyboardArrowDownIcon  sx={{color:"#6610F2"}}/>}</Button>
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
     <Card sx={{ width: "72%",  marginTop:3}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100%"
        width="200"
        image="./../../assets/Rectangle 181.png"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
   }}>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height:'100%',
   }}>
       <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>
      <Button onClick={handleClickedSubmenu}>{ menu ? <ArrowForwardIosIcon sx={{color:"#6610F2"}}/> : <KeyboardArrowDownIcon  sx={{color:"#6610F2"}}/>}</Button>
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
  </>
))
}
  </Box>

  {/* New Category start from here */}
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opens}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={opens}>
          <Box sx={style}>
            {/* <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems="center"
                        justifyContent={'center'}
                        margin='auto'
                        maxWidth={540}
                        // marginTop={5}
                        //    padding={3}
                        borderRadius={2}
                        boxShadow={'5px 5px 10px #ccc'}
                        sx={{
                            ":hover": {
                                boxShadow: '10px 10px 20px #ccc'
                            }
                        }}
                    > */}
                        {/* <Typography variant='h3'> New CATEGORY </Typography> */}
                        {/* <Avatar sx={{width:100,height:100, marginTop:3}} alt="Travis Howard" src="../../assets/images/avatars/tree-736885_1280.jpg" /> */}
                        {/* <Button variant="contained" sx={{bgcolor:"#A084DD",":hover": {
                                bgcolor: '#A749FF'
                            } , marginY:2, width:"72%"}}>UPDATE YOUR IMAGE</Button> */}
                        <Box
                        //    alignItems="center"
                        //    justifyContent={'center'}
                          >
                   <Typography>
                    Category 
                   </Typography>
                   <TextField id="outlined-basic" label="Category" variant="outlined" type="text" sx={{width:"100%", marginY:2}}/>
                   <Button variant="contained" sx={{bgcolor:"#6610F2",":hover": {
                                bgcolor: '#6EAB49'
                            } , width:"32%",
                            display:'flex',
                            flexDirection:'column',
                            alignItems:"center",
                            justifyContent:'center',
                            margin:'auto'
                            }} onClick={handleClickUpdate}>CREATE</Button>
                        </Box>
                    </Box>
          {/* </Box> */}
        </Fade>
  </Modal>

{/* New SubCategory start from here */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleSubcategory}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems="center"
                        justifyContent={'center'}
                        margin='auto'
                        maxWidth={540}
                        // marginTop={5}
                        //    padding={3}
                        borderRadius={2}
                        boxShadow={'5px 5px 10px #ccc'}
                        sx={{
                            ":hover": {
                                boxShadow: '10px 10px 20px #ccc'
                            }
                        }}
                    > */}
                        <Box
                        //    alignItems="center"
                        //    justifyContent={'center'}
                          >
                   <Typography>
                    Category 
                   </Typography>
                   <TextField id="outlined-basic" label="Category" variant="outlined" type="text" sx={{width:"100%", marginY:2}}/>
                   <Typography>
                    SubCategory 
                   </Typography>
                   <TextField id="outlined-basic" label="SubCategory" variant="outlined" type="text" sx={{width:"100%", marginY:2}}/>
                   <Button variant="contained" sx={{bgcolor:"#6610F2",":hover": {
                                bgcolor: '#6EAB49'
                            } , width:"32%",
                            display:'flex',
                            flexDirection:'column',
                            alignItems:"center",
                            justifyContent:'center',
                            margin:'auto',
              
                            }} onClick={handleClickCreate}>CREATE</Button>
                        </Box>
                    </Box>
          {/* </Box> */}
        </Fade>
      </Modal>


    </>
    );
};

export default Category;