import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Container, Stack, Typography, Box, Card, CardContent } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { deleteRequestHandler, getRequestHandler } from '../apiHandler/customApiHandler';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([])
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

  // get products 
  async function getData() {
    const categoriesData = await getRequestHandler("https://marpapi.techanalyticaltd.com/product/?page=1&items=10");
    setData(categoriesData.data.allProducts)

  }

  // search product 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCards = data.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();
  async function handleAuthCheck() {

    try {
      const data = await getRequestHandler('https://marpapi.techanalyticaltd.com/auth/authcheck');
      // Handle the response data
      console.log("auth check response", data);
      if(data.error.code===401){
        localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      navigate("/")
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }



  useEffect(() => {
    handleAuthCheck()
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
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{mb:"1rem"}}
        />
        <Box sx={{ border: "1px solid #6610F2", mb: "1rem", width: "120px", height: "34px", p: ".5rem", backgroundColor: "#6610F2" }}>
          {/* <AddCircleIcon/> */}
        
          <Link style={{ textDecoration: "none" }} to="/dashboard/product">
            <Typography sx={{ color: "white", fontSize: "12px", textDecoration: "none", textAlign: "center" }}>+ Add Product </Typography>
          </Link>
        </Box>
        </Box>

        {filteredCards ?
          <ProductList products={filteredCards} />
          :
          <ProductList products={data} />
        }

        <ProductCartWidget />
      </Container>
    </>
  );
}
