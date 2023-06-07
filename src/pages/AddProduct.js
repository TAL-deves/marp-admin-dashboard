import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function AddProduct() {
  const [sku, setSku] = useState()
  const [productCode, setProductCode] = useState()
  const [productName, setProductName] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()
  const [newItem, setNewItem] = useState()
  const [saleCount, setSaleCount] = useState()
  const [stock, setStock] = useState()
  const [shortDescription, setShortDescription] = useState()
  const [fullDescription, setFullDescription] = useState()
  const [productImages, setProductImages] = useState()
  const [brand, setBrand] = useState()
  const [categoryName, setCategoryName] = useState()
  const [subCategoryName, setSubCategoryName] = useState()


  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Typography sx={{ borderBottom: "5px solid #6610F2", m: "1rem" }}>
          + Add Product
        </Typography>
        <Typography sx={{ m: "1rem" }}>
          Product Review
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography sx={{mt:"1rem"}}>Product Name</Typography>
            
            <TextField
              sx={{ width: "100%" }}
              
              label="Product Name"
              name="name"
              type="name"
              variant="outlined"
              onChange={(e) => setProductName(e.target.value)}
            />
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{mt:"1rem"}}>Category</Typography>
                <Select
                  sx={{ width: "13rem", mr:".7rem" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue={"Electronics"}
                  label="Electronics"
                  onChange={(e) => setCategoryName(e.target.value)}
                >
                  <MenuItem value={"Electronics"}>Electronics</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Clothings"}>Clothings</MenuItem>
                </Select>
              </Box>
              <Box>
                <Typography sx={{mt:"1rem"}}>Subcategory</Typography>
                <Select
                  sx={{ width: "13rem", mr:".7rem" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue={"Electronics"}
                  label="Electronics"
                  onChange={(e) => setSubCategoryName(e.target.value)}
                >
                  <MenuItem value={"Electronics"}>Electronics</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Clothings"}>Clothings</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{mt:"1rem"}}>Brand</Typography>
                <TextField
                  sx={{ width: "95%" }}
                  
                  label="Product Name"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Box>
              <Box>
                <Typography sx={{mt:"1rem"}}>Product Code</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  
                  label="Product Name"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setProductCode(e.target.value)}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{mt:"1rem"}}>Sku</Typography>
                <TextField
                  sx={{ width: "95%" }}
                  
                  label="Product Name"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setSku(e.target.value)}
                />
              </Box>
              <Box>
                <Typography sx={{mt:"1rem"}}>Sale Count</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  
                  label="Product Name"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setSaleCount(e.target.value)}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{mt:"1rem"}}>New Item</Typography>
                <Select
                  sx={{ width: "13rem", mr:".7rem" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                   defaultValue={"Electronics"}
                  // label="Electronics"
                  onChange={(e) => setNewItem(e.target.value)}
                >
                  <MenuItem value={"Electronics"}>Electronics</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Clothings"}>Clothings</MenuItem>
                </Select>
              </Box>
              <Box>
                <Typography sx={{mt:"1rem"}}>Stock</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  
                  label="Product Name"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setStock(e.target.value)}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{mt:"1rem"}}>Discount</Typography>
                <TextField
                  sx={{ width: "95%" }}
                  
                  label="Product Name"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </Box>
              <Box>
                <Typography sx={{mt:"1rem"}}>Price</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  
                  label="Product Name"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Box>
            </Box>

          </Grid>
          <Grid item xs={7}>
            <Typography sx={{mt:"1rem"}}>imagess</Typography>
            <Typography sx={{mt:"1rem"}}>Short Description</Typography>
            <TextField
              sx={{ width: "100%" }}
              multiline
              rows={4}
              
              label="Product Name"
              name="name"
              type="name"
              variant="outlined"
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "2rem" }}>
          <Typography sx={{mt:"1rem"}}>Full Description</Typography>
          <TextField
            multiline
            rows={6}
            sx={{ width: "100%" }}
            
            label="Product Name"
            name="name"
            type="name"
            variant="outlined"
            onChange={(e) => setFullDescription(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link state={{ name: productName, cat: categoryName, subCat: subCategoryName, brandname: brand, code: productCode, sKu: sku, salecount: saleCount, newitem: newItem, stoCk: stock, disCount: discount, priCe: price, shortdescription: shortDescription, fulldescription: fullDescription }} style={{ textDecoration: "none" }} to="/dashboard/add-product-review">
            <Box sx={{ border: "1px solid #6610F2", mb: "1rem", width: "120px", height: "34px", p: ".5rem", backgroundColor: "#6610F2", mt: "3rem" }}>
              {/* <AddCircleIcon/> */}

              <Typography sx={{ color: "white", fontSize: "12px", textDecoration: "none", textAlign: "center" }}>Next</Typography>

            </Box>
          </Link>
        </Box>



      </Box>
    </Box>
  )
}

export default AddProduct
