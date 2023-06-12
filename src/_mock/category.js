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
// import picture from "../../assets/transparent.png"
import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from "@mui/material/Backdrop";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';




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

// select menu item start from here
const [age, setAge] = React.useState('');
const handleChange = (event) => {
  setAge(event.target.value);
};

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


// subcategory item start from here

const [anchorEl, setAnchorEl] = React.useState(null);
const openSubCategory = Boolean(anchorEl);
const handleClickSC = (event) => {
  setAnchorEl(event.currentTarget);
};
// console.log("button clicked", menu);
const handleCloseSC = () => {
  setAnchorEl(null);
};



// subCategory item end from here

    return (
      <>
      <Helmet>
      <title> Category | admin dashboard </title>
    </Helmet>


       {/* subCategory item start from here */}

       {/* <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClickSC}
            size="small"
            sx={{ ml: 3 }}
            aria-controls={openSubCategory ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openSubCategory ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openSubCategory}
        onClose={handleCloseSC}
        onClick={handleCloseSC}
        maxWidth={"30%"}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 6,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 20,
              width: 20,
              height: 20,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
            <Box sx={{ flexGrow: 1, margin:2}}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Typography variant='p'>SubCategory</Typography>
        </Grid>
        <Grid item xs={4}>
       <Button><Typography sx={{color:"red"}}>X</Typography></Button>
        </Grid>
      </Grid>
    </Box>
        <MenuItem onClick={handleClose}>
        <CardMedia
        component="img"
        alt="green iguana"
        Width="117px"
        Height="80px"
        image="./../../assets/Rectangle 181.png"
      />
          Mobile
          <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <CardMedia
        component="img"
        alt="green iguana"
        Width="117px"
        Height="80px"
        image="./../../assets/Rectangle 181.png"
      />
          Television
          
          <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <CardMedia
        component="img"
        alt="green iguana"
        Width="117px"
        Height="80px"
        image="./../../assets/Rectangle 181.png"
      />
          Computer
          <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>
        </MenuItem>
      </Menu>
    </> */}

    <Box sx={{marginX:2}}> 
    <Box sx={{ flexGrow: 1  }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
        <Box sx={{display:"flex"}}>
          <CategoryIcon sx={{height:36}}/>
          <Typography variant='h4' sx={{padding:0}}>Category</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} sx={{textAlign:"end", alignSelf:"end"}}>
        <Button onClick={handleClickedCategory} sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }}}><AddIcon/>New Category</Button>
      <Button onClick={handleClickedSubcategory} sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, margin:1}}><AddIcon/>New Subcategory</Button>
        </Grid>
      
      </Grid>
    </Box>


    <Box sx={{ flexGrow: 1, padding:3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>  
        {
data.map((item)=>(
  <>
     <Card sx={{ width: "100%",  marginTop:3}}>
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


      <Button   onClick={handleClickSC}
            size="small"
            sx={{ ml: 6 }}
            aria-controls={openSubCategory ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openSubCategory ? 'true' : undefined}>
              { menu ?
              <KeyboardArrowRightIcon  sx={{color:"#6610F2"}} onClick={()=>setMenu(!menu)}/>
              :
              <KeyboardArrowDownIcon  sx={{color:"#6610F2"}} onClick={()=>setMenu(!menu)}/>
              }</Button>
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
  </>
))
}
        </Grid>
        <Grid item xs={12} md={4} sx={{marginTop:3}}>
          <Box 
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
                    >
       <Typography variant='h4'>SubCategory</Typography>
          <Card sx={{ width: "96%",  marginTop:3}}>
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
        <Typography gutterBottom variant="p" component="div">
         Name
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

      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
          <Card sx={{ width: "96%",  marginTop:3}}>
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
        <Typography gutterBottom variant="p" component="div">
         Name
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
{/* 


      <Button   onClick={handleClickSC}
            size="small"
            sx={{ ml: 6 }}
            aria-controls={openSubCategory ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openSubCategory ? 'true' : undefined}>{ <KeyboardArrowDownIcon  sx={{color:"#6610F2"}}/>}</Button> */}
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
          <Card sx={{ width: "96%",  marginTop:3}}>
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
        <Typography gutterBottom variant="p" component="div">
         Name
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
{/* 


      <Button   onClick={handleClickSC}
            size="small"
            sx={{ ml: 6 }}
            aria-controls={openSubCategory ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openSubCategory ? 'true' : undefined}>{ <KeyboardArrowDownIcon  sx={{color:"#6610F2"}}/>}</Button> */}
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
    </Box>
        </Grid>
      </Grid>
    </Box>
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
                   <Typography sx={{margin:2}}>
                    Category 
                   </Typography>
                   {/* <TextField id="outlined-basic" label="Category" variant="outlined" type="text" sx={{width:"100%", marginY:2}}/> */}
                    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={10}>Electronics</MenuItem>
          <MenuItem value={20}>Daily Products</MenuItem>
          <MenuItem value={30}>ABCDE</MenuItem>
        </Select>
      </FormControl>
                   <Typography sx={{margin:2}}>
                    SubCategory 
                   </Typography>
                   <TextField id="outlined-basic" label="SubCategory" variant="outlined" type="text" sx={{width:"100%", marginBottom:2}}/>
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