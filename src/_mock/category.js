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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


// const bull = (
//     <Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//       •
//     </Box>
//   );


const Category = () => {
  const [data, setData] = useState([]);

// useEffect(()=>{
//   fetch('https://dummyjson.com/products/categories')
//   .then(res => res.json())
//   .then(console.log);
// },[])

useEffect(() => {
  async function getData(){
    const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/category/");
    setData(categoriesData.data.categoryList)
  
    console.log("categoriesData -----",typeof(categoriesData.data.categoryList[0]), categoriesData.data.categoryList[0]
    );
  }
  
  getData();
}, []);

// async function getData(){
//   const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/category/");
//   setData(categoriesData.data.categoryList)

//   console.log("categoriesData -----",typeof(categoriesData.data.categoryList[0]), categoriesData.data.categoryList[0]

//   );
// }


// getData();


    return (
      <>
      <Helmet>
      <title> Category | admin dashboard </title>
    </Helmet>
    <Box sx={{marginX:5}}> 


       {/* <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}> */}
        <Typography variant='h2' sx={{padding:0}}>Category</Typography>
        {
data.map((item)=>(
  <>
     <Card sx={{ width: "64%" }}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="96"
        width="200"
        image="./../../assets/electronicesProduct.jpeg"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
       
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Button><ModeEditIcon/></Button>
        <Button><DeleteIcon/></Button>
        <Button><ArrowForwardIosIcon/></Button>
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
  </>
))
}
  
        {/* <Grid item xs={5}>
        <Typography variant='h3' sx={{padding:0}}>All Subcategory Here:</Typography> 
        {
  <ul>
  {data.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
}
        </Grid> */}

    </Box>
    {/* </Box> */}
    </>
    );
};

export default Category;