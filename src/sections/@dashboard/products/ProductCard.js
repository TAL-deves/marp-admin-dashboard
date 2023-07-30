import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Card,Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
// import Backdrop from 'src/theme/overrides/Backdrop';
import Backdrop from '@mui/material/Backdrop';
import { Circles } from 'react-loader-spinner';
import Swal from 'sweetalert2';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import { deleteRequestHandler } from '../../../apiHandler/customApiHandler';
// import {delete} from "../../../../public/assets/delete.png"
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const [show, setShow] = useState(false)
  const { id, name, productImages, price, status, priceSale } = product;
  // const { name, cover, price, colors, status, priceSale } = product;
    // delete product
    const navigate = useNavigate();
    async function deleteData() {
      setShow(true)
      try {
        const response = await deleteRequestHandler('https://marpapi.techanalyticaltd.com/product/', {id});
        // Handle the response data      
        // console.log("delete data", response.data.encoded.success);
        console.log("delete id", id);
        setShow(false)
        if(response.data.encoded.success){
          // navigate("/dashboard/products")
          Swal.fire('Product Deleted').then((result) => {
            if (result.isConfirmed) {
              window.location.reload(); // Reload the page
            }
          })
        }
  
      } catch (error) {
        // Handle the error
        setShow(false)
        console.error(error);
      }
    } 
  return (
    <>{show ?
      <>
        <Backdrop
          sx={{ color: '#808080', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          // eslint-disable-next-line no-restricted-globals
          open={open}
        >
          <Circles
            height="80"
            width="80"
            color="#c7eed8"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={show}
          /> 
        </Backdrop>
      </> :
      <>
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={productImages} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link color="inherit" underline="hover"> */}
          <Typography sx={{textDecoration:"none"}} variant="subtitle2" noWrap>
            {name}
          </Typography>
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography> */}
            {/* &nbsp; */}
            {fCurrency(price)}
          </Typography>
          <Box sx={{display:"flex", alignItems:"center"}}>
          {/* edit product  */}
          <Link to={`/dashboard/product/${id}`}>
            <img src="/assets/Vector.png" alt='' />
          </Link>
          {/* delete product */}
          <Box sx={{cursor:"pointer", ml:"1rem"}} onClick={()=>deleteData()}>
            <img src="/assets/delete.png" alt='' />
          </Box>
          </Box>
        </Stack>
      </Stack>
    </Card>
    </>}</>
  );
}
