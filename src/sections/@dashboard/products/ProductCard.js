import PropTypes from 'prop-types';
// @mui
import { Box, Card,Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
// utils
import { deleteRequestHandler } from '../../../apiHandler/customApiHandler';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
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
  const { id, name, productImages, price, status, priceSale } = product;
  // const { name, cover, price, colors, status, priceSale } = product;
    // delete product
    async function deleteData() {
      try {
        const response = await deleteRequestHandler('https://marpapi.techanalyticaltd.com/product/?page=1&items=10', {id});
        // Handle the response data      
        console.log("delete data", response);
  
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    } 
  return (
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
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
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
  );
}
