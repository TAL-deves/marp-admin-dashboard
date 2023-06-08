import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getRequestHandler } from '../apiHandler/customApiHandler';

function AddProduct() {
  const [sku, setSku] = useState()
  const [productCode, setProductCode] = useState()
  const [productName, setProductName] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState(0)
  const [newItem, setNewItem] = useState(false)
  const [saleCount, setSaleCount] = useState(0)
  const [stock, setStock] = useState(0)
  const [shortDescription, setShortDescription] = useState()
  const [fullDescription, setFullDescription] = useState()
  const [productImages, setProductImages] = useState()
  const [brand, setBrand] = useState()
  const [categoryName, setCategoryName] = useState("Electronics")
  const [subCategoryName, setSubCategoryName] = useState("Smart Watch")
  const [categoryList, setCategoryList] = useState()
  const [subCategoryList, setSubCategoryList] = useState()


  async function handleGetCategories() {
    try {
      const response = await getRequestHandler('https://marpapi.techanalyticaltd.com/category/allcategories');
      // Handle the response data      
      setCategoryList(response.data.categoryList)
      console.log("categories", response.data.categoryList);

    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }


  async function handleGetSubCategoriesOnCategory() {
    try {
      const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/category/subcategories?categoryName=${categoryName}`);
      // Handle the response data      
      setSubCategoryList(response.data.categoryList.subcategories)
      console.log("subcategories", response);

    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetCategories()
    handleGetSubCategoriesOnCategory()
  }, [categoryName])

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
            <Typography sx={{ mt: "1rem" }}>Product Name</Typography>

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
                <Typography sx={{ mt: "1rem" }}>Category</Typography>
               
                {categoryList ?
                  <Select
                    sx={{ width: '100%', mr: '.7rem' }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    {categoryList.map((option, index) => (
                      <MenuItem key={index} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}

                  </Select>
                  :
                  <Select
                    sx={{ width: '12rem', mr: '.7rem' }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={"Electronics"}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>

                  </Select>
                }
              </Box>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Subcategory</Typography>
                {subCategoryList ?
                  <Select
                    sx={{ width: '100%', mr: '.7rem' }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  >
                    {subCategoryList.map((option, index) => (
                      <MenuItem key={index} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}

                  </Select>
                  :
                  <Select
                    sx={{ width: '13rem', mr: '.7rem' }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={"Phone"}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  >
                    <MenuItem value="Phone">Phone</MenuItem>

                  </Select>
                }
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Brand</Typography>
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
                <Typography sx={{ mt: "1rem" }}>Product Code</Typography>
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
                <Typography sx={{ mt: "1rem" }}>Sku</Typography>
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
                <Typography sx={{ mt: "1rem" }}>Sale Count</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  
                  label="Product Name"
                  name="name"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setSaleCount(parseInt(e.target.value, 10))}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{ mt: "1rem" }}>New Item</Typography>
                <Select
                  sx={{ width: "12rem", mr: ".7rem" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue={false}
                  // label="Electronics"
                  onChange={(e) => setNewItem(e.target.value)}
                >
                  <MenuItem value={!false}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </Box>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Stock</Typography>
                <TextField
                  sx={{ width: "100%" }}

                  label="Stock"
                  name="name"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setStock(parseInt(e.target.value, 10))}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Discount</Typography>
                <TextField
                  sx={{ width: "95%" }}

                  label="Discount"
                  name="name"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setDiscount(parseInt(e.target.value, 10))}
                />
              </Box>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Price</Typography>
                <TextField
                  sx={{ width: "100%" }}

                  label="Price"
                  name="name"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                />
              </Box>
            </Box>

          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ mt: "1rem" }}>imagess</Typography>
            <Typography sx={{ mt: "1rem" }}>Short Description</Typography>
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
          <Typography sx={{ mt: "1rem" }}>Full Description</Typography>
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
