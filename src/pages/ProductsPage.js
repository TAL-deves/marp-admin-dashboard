import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Container, Stack, Typography, Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getRequestHandler } from '../apiHandler/customApiHandler';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData]= useState([])
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // async function handleRouteAddProduct(){
  //   try {
  //     Navigate("/dahsboard/product")
  //     console.log("navigate",)
  //   } catch (error) {
  //     // Handle the error
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    async function getData(){
      const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/product/?page=1&items=10");
       setData(categoriesData.data.allProducts)
    
      // console.log("categoriesData -----",categoriesData.data.allProducts    
      // );
    }
    
    
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Products | Admin dashboard </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <Box sx={{border:"1px solid #6610F2", mr:"2rem", mb:"1rem", width:"120px",height:"34px",  p:".5rem", backgroundColor:"#6610F2"}}>
          {/* <AddCircleIcon/> */}
          <Link style={{textDecoration:"none"}} to="/dashboard/product">
          <Typography sx={{color:"white",fontSize:"12px", textDecoration:"none", textAlign:"center"}}>+ Add Product </Typography>
          </Link>
        </Box>
       
        <ProductList products={data} />
        
        <ProductCartWidget />
      </Container>
    </>
  );
}
