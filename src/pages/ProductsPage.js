import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import { getRequestHandler } from '../apiHandler/customApiHandler';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData]= useState([])
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    async function getData(){
      const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/product/?page=1&items=10");
       setData(categoriesData.data.allProducts)
    
      console.log("categoriesData -----",categoriesData.data.allProducts    
      );
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

        <ProductList products={data} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
