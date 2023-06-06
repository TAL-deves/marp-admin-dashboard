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



const Category = () => {
  const [data, setData] = useState([]);

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
}


    return (
      <>
      <Helmet>
      <title> Category | admin dashboard </title>
    </Helmet>
    <Box sx={{marginX:5}}> 

        <Typography variant='h2' sx={{padding:0}}>Category</Typography>
        {
data.map((item)=>(
  <>
     {/* <Card sx={{ width: "64%" }}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="80"
        width="200"
        image="./../../assets/electronicesProduct.jpeg"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions>
        <Button><ModeEditIcon/></Button>
        <Button><DeleteIcon/></Button>
        <Button><ArrowForwardIosIcon/></Button>
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card> */}
     <Card sx={{ width: "64%",  marginTop:3}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100"
        width="200"
        image="./../../assets/electronicesProduct.jpeg"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'16vh',
   }}>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'10vh',
   }}>
       <Button onClick={handleClickedEdit}><ModeEditIcon/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon/></Button>
      <Button onClick={handleClickedSubmenu}><ArrowForwardIosIcon/></Button>
      </CardActions>
 {/* <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'10vh',
   }}>
      <Button onClick={handleClickedEdit}><ModeEditIcon/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon/></Button>
      <Button onClick={handleClickedSubmenu}><ArrowForwardIosIcon/></Button>
    </ButtonGroup> */}

      </Grid>
      </Grid>
      </Box>
    </Card>
  </>
))
}
  </Box>
    </>
    );
};

export default Category;