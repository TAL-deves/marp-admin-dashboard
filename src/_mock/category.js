import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// eslint-disable-next-line import/no-unresolved
import { getRequestHandler } from "src/apiHandler/customApiHandler";
import { useState, useEffect } from 'react';


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

    <Box sx={{marginX:5}}> 
       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
        <Typography variant='h2' sx={{padding:0}}>All Category Here:</Typography>
        {
data.map((item)=>(
  <>
  <h1>{item.name}</h1>
  {/* <h1>{item.subcategories}</h1> */}
 {/* console.log(item) */}
  </>
))
}
        </Grid>
        <Grid item xs={5}>
        <Typography variant='h3' sx={{padding:0}}>All Subcategory Here:</Typography> 
        {/* {
  <ul>
  {data.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
} */}
        </Grid>
      </Grid>
    </Box>
    </Box>
    );
};

export default Category;