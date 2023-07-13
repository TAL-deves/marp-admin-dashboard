
import React, { useEffect, useState, useRef } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import { Circles } from 'react-loader-spinner';
import { getRequestHandler, patchRequestHandler, photoUploadRequestHandler } from '../apiHandler/customApiHandler';
// import ImageDragnDrop from '../components/ImageDragnDrop/ImageDragnDrop';

const Container = styled('div')({
  border: '2px dashed #aaa',
  height: "10rem",
  width: "10rem",
  textAlign: 'center',
  cursor: 'pointer',
});

function AddProduct() {
  const [sku, setSku] = useState()
  const [productCode, setProductCode] = useState()
  const [productName, setProductName] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()
  const [newItem, setNewItem] = useState(false)
  const [saleCount, setSaleCount] = useState()
  const [stock, setStock] = useState()
  const [shortDescription, setShortDescription] = useState()
  const [fullDescription, setFullDescription] = useState()
  const [productImages, setProductImages] = useState()
  const [brand, setBrand] = useState()
  const [categoryName, setCategoryName] = useState("Electronics")
  const [subCategoryName, setSubCategoryName] = useState("Smart Watch")
  const [categoryList, setCategoryList] = useState()
  const [subCategoryList, setSubCategoryList] = useState()
  const [existingProduct, setExistingProduct]= useState()
  const [show, setShow] = useState(false);
  const [showloader, setShowloader] = useState(false);
  const [droppedImages, setDroppedImages] = useState([]);
  const [stateDroppedImages, setStateDroppedImages] = useState([]);

  const { pathname } = useLocation();
  const { id } = useParams();
  // get all data for update
  async function handleGetAllDataforUpdate() {
    try {
      const response = await getRequestHandler('https://marpapi.techanalyticaltd.com/product/', id);
      // Handle the response data
      const matchedProduct = response.data.allProducts.find(product => product.id === id);
      console.log("main data", matchedProduct);
      setProductName(matchedProduct.name)
      setCategoryName(matchedProduct.Category.name)
      setSubCategoryName(matchedProduct.Subcategory.name)
      setBrand(matchedProduct.brand)
      setProductCode(matchedProduct.productCode)
      setSku(matchedProduct.sku)
      setSaleCount(matchedProduct.saleCount)
      setNewItem(matchedProduct.newItem)
      setStock(matchedProduct.stock)
      setDiscount(matchedProduct.discount)
      setPrice(matchedProduct.price)
      setShortDescription(matchedProduct.shortDescription)
      setFullDescription(matchedProduct.fullDescription)
      // setDroppedImages(productImages)
      // productImages.map((img)=>{return droppedImages.push(img)})
      // setDroppedImages(productImages.map((img) => img))
      // console.log("images", productImages)
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }


  // update data 
  async function handleUpdateProduct() {
    setShow(true);
    handleOpen();
    
    try {
      console.log("sku", sku)
      const response = await patchRequestHandler('https://marpapi.techanalyticaltd.com/product/',{
          sku: `${sku}`,
          productCode: `${productCode}`,
          name: `${productName}`,
           price,
          discount,
          newItem,
          saleCount,
          stock,
          shortDescription: `${shortDescription}`,
          productImages: `${droppedImages}`,
          brand: `${brand}`,
          categoryName: `${categoryName}`,
          subcategoryName: `${subCategoryName}`,
         id:`${id}`,
      });
      // Handle the response data
      setShow(false);
      if(response.success){
        navigate("/dashboard/products")
      }
       console.log("new update sku",response);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
  // get category 
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
      // console.log("subcategories", response);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  
  
  // const [file, setFiles]=useState([])
  const fileInputRef = useRef(null);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  // console.log("images list", droppedImages)
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    console.log('Selected File:', files);    
    handleFiles(files);
      handleAddPhoto(files[0]); // Pass convertedFile instead of files
    console.log("files", files);
  };

  const handleFiles = (files) => {
    const images = Array.from(files).map((file) => URL.createObjectURL(file));
     setStateDroppedImages((prevImages) => [...prevImages, ...images]);
  };
  console.log("droppedImages", droppedImages)

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  //  console.log("image", droppedImages)
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
  // console.log("dropped images", files)
  // async function handleAddPhoto(files) {
  //   setShow(true);  
    
   
  //   try {      
  //     const formData= new FormData();
  //     formData.append('image', files);

  //      const response=await photoUploadRequestHandler('https://marpapi.techanalyticaltd.com/admin/bucket/uploadsingleimage?uploadto=productPhotos', formData)
  //     // .then((res)=>{
  //       // });
  //         console.log("formData response", response);
    
  //     setShow(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



  async function handleAddPhoto(files) {
    setShowloader(true);
    const formData= new FormData();
    formData.append('image', files);
    try {
      const response = await photoUploadRequestHandler('https://marpapi.techanalyticaltd.com/admin/bucket/uploadsingleimage?uploadto=productPhotos',formData);
      // Handle the response data
      setShowloader(false);
    // if(response.success){
    //    navigate("/dashboard/bucket")
    // }
       console.log("formdata response",response.data.data.publicUrl);
       setDroppedImages((prevImages) => [...prevImages,response.data.data.publicUrl])
       
    } catch (error) {
      // Handle the error
      setShowloader(false);
      console.error(error);
    }
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  useEffect(() => {
    handleAuthCheck()
    handleGetAllDataforUpdate()
    handleGetCategories()
    handleGetSubCategoriesOnCategory()
  }, [categoryName])

  return (
    <>
     {show ?
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
    <Box container sx={{ maxWidth: "80rem" }}>
      
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Typography sx={{margingLeft:".2rem", borderBottom: "5px solid #6610F2", m: "1rem" }}>
          + Add Product
        </Typography>
        <Typography sx={{ m: "1rem" }}>
          Product Review
        </Typography>
      </Box>
      <Box sx={{ m: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item md={6} lg={6}>
            <Typography sx={{ mt: "1rem" }}>Product Name</Typography>

            <TextField
              // sx={{ width: "24.5rem" }}
              sx={{width:{xs:"21rem",sm:"24.5rem",md:"24.5rem"}}}
              // label="Product Name"
              name="name"
              type="name"
              value={productName}
              // focused
              variant="outlined"
              onChange={(e) => setProductName(e.target.value)}
            />
            <Box sx={{ display: "flex", flexDirection:{xs:"column", sm:"row"} }}>
              <Box sx={{ mr: ".5rem" }}>
                <Typography sx={{ mt: "1rem" }}>Category</Typography>

                {categoryList ?
                  <Select
                    // sx={{ width: '12rem' }}
                    sx={{width:{xs:"21rem",sm:"12rem"}}}
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
                    sx={{ width:{xs:"21rem",sm:"12rem"}, mr: '.7rem' }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={categoryName}
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
                    sx={{ width:{xs:"21rem",sm:"12rem"} }}
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
                    sx={{ width:{xs:"21rem",sm:"12rem"}, mr: '.7rem' }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  >
                    <MenuItem value="Phone">Phone</MenuItem>

                  </Select>
                }
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection:{xs:"column", sm:"row"} }}>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Brand</Typography>
                <TextField
                  sx={{ width:{xs:"21rem",sm:"12rem"}, mr: ".5rem" }}
                  // focused
                  value={brand}
                  // label="Brand"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Box>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Product Code</Typography>
                <TextField
                  sx={{ width:{xs:"21rem",sm:"12rem"} }}
                  // label="Product Code"
                  value={productCode}
                  name="name"
                  // focused
                  type="name"
                  variant="outlined"
                  onChange={(e) => setProductCode(e.target.value)}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection:{xs:"column", sm:"row"} }}>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Sku</Typography>
                <TextField
                  sx={{ width:{xs:"21rem",sm:"12rem"}, mr: ".5rem" }}
                  value={sku}
                  // focused
                  // label="SKU"
                  name="name"
                  type="name"
                  variant="outlined"
                  onChange={(e) => setSku(e.target.value)}
                />
              </Box>
              <Box>
                <Typography sx={{ width:{xs:"21rem",sm:"12rem"}, mt: "1rem" }}>Sale Count</Typography>
                <TextField
                  sx={{ width:{xs:"21rem",sm:"12rem"} }}
                  value={saleCount}
                  // label="Sale Count"
                  // focused
                  name="name"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setSaleCount(parseInt(e.target.value, 10))}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection:{xs:"column", sm:"row"} }}>
              <Box>
                <Typography sx={{ mt: "1rem" }}>New Item</Typography>
                <Select
                  sx={{ width:{xs:"21rem",sm:"12rem"}, mr: ".7rem" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue={false}
                  value={newItem}
                  // label="Electronics"
                  onChange={(e) => setNewItem(e.target.value)}
                >
                  <MenuItem value={!false}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </Box>
              <Box>
                <Typography sx={{ mt: "1rem", width:{xs:"21rem",sm:"12rem"} }}>Stock</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  value={stock}
                  // label="Stock"
                  // focused
                  name="name"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setStock(parseInt(e.target.value, 10))}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection:{xs:"column", sm:"row"} }}>
              <Box>
                <Typography sx={{ mt: "1rem", width:{xs:"21rem",sm:"12rem"}, mr: ".7rem" }}>Discount</Typography>
                <TextField
                  sx={{ width: "95%" }}
                   value={discount}
                  // label="Discount"
                  name="name"
                  // focused
                  type="number"
                  variant="outlined"
                  onChange={(e) => setDiscount(parseInt(e.target.value, 10))}
                />
              </Box>
              <Box>
                <Typography sx={{ mt: "1rem" }}>Price</Typography>
                <TextField
                  sx={{ width:{xs:"21rem",sm:"12rem"} }}
                   value={price}
                  // label="Price"
                  name="name"
                  // focused
                  type="number"
                  variant="outlined"
                  onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                />
              </Box>
            </Box>

          </Grid>
          <Grid item md={6} lg={6} >
            <Grid container spacing={2} sx={{justifyContent:"center", mt:"2rem"}}>
              
              <Box sx={{ display: "" }}>
                <Box sx={{ display: "flex" }}>
                  <Grid sx={{ justifyContent: "space-between" }} container spacing={2}>

                    {stateDroppedImages.map((image, index) => (
                      <Grid key={index} item xs={4}>
                        <Container sx={{ mx: ".5rem" }}>
                          <img src={image} alt={`Dropped ${index}`} style={{ width: "auto", maxHeight: '100%' }} />
                        </Container>
                      </Grid>
                    ))}
                    {stateDroppedImages.length===1
                    ?
                    <></>
                    :
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", m: "1rem", mx:"1.5rem" }} onDragOver={handleDragOver} onDrop={handleDrop}>
                      <Box >
                        <Typography>Drop your images here, or select</Typography>
                        <div>
                          <Typography onClick={handleBrowseClick} style={{ color: "#6610F2", cursor: 'pointer' }}>
                            Browse
                          </Typography>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                          />
                        </div>
                      </Box>
                    </Container>
                    }
                  </Grid>
                </Box>


              </Box>

            </Grid>
            <Box>
            <Typography sx={{ mt: "1rem" }}>Short Description</Typography>
            <TextField
              sx={{ width: {xs:"24rem",sm:"20rem", md:"100%", lg:"100%"}}}
              multiline
              rows={4}
              // focused
               value={shortDescription}
              // label="Short Description"
              name="name"
              type="name"
              variant="outlined"
              onChange={(e) => setShortDescription(e.target.value)}
            />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "2rem" }}>
          <Typography sx={{ mt: "1rem" }}>Full Description</Typography>
          <TextField
            multiline
            rows={6}
            // focused
            sx={{ width: "100%" }}
            value={fullDescription}
            // label="Full Description"
            name="name"
            type="name"
            variant="outlined"
            onChange={(e) => setFullDescription(e.target.value)}
          />
        </Box>
        {!id?
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {!showloader?
          <Link state={{ name: productName, cat: categoryName, subCat: subCategoryName, brandname: brand, code: productCode, sKu: sku, salecount: saleCount, newitem: newItem, stoCk: stock, disCount: discount, priCe: price, shortdescription: shortDescription, fulldescription: fullDescription, imagesList: droppedImages }} style={{ textDecoration: "none" }} to="/dashboard/add-product-review">
            <Box sx={{ border: "1px solid #6610F2", mb: "1rem", width: "120px", height: "auto", p: ".5rem", backgroundColor: "#6610F2", mt: "3rem" }}>
              {/* <AddCircleIcon/> */}
              
              <Typography sx={{ color: "white", fontSize: "12px", textDecoration: "none", textAlign: "center" }}>Next</Typography>
              </Box>
              </Link>
              :
              <Box sx={{ border: "1px solid #6610F2", mb: "1rem", width: "120px", height: "auto", p: ".5rem", backgroundColor: "#6610F2", mt: "3rem" }}>
              <Box sx={{display:"flex", justifyContent:"space-around"}}><CircularProgress style={{ color: 'white' }}/></Box>
              </Box>}

            </Box>
          // </Link>
        // </Box>
        :
        <Box sx={{ display: "flex", justifyContent: "flex-end",  }}>          
            {/* <Box onClick={()=>{handleUpdateProduct()}} sx={{cursor:"pointer", border: "1px solid #6610F2", mb: "1rem", width: "120px", height: "34px", p: ".5rem", backgroundColor: "#6610F2", mt: "3rem" }}> */}
            {!showloader?
            <Box onClick={()=>{handleUpdateProduct()}} sx={{cursor:"pointer", border: "1px solid #6610F2", mb: "1rem", width: "120px", height: "34px", p: ".5rem", backgroundColor: "#6610F2", mt: "3rem" }}>
              <Typography sx={{ color: "white", fontSize: "12px", textDecoration: "none", textAlign: "center" }}>Update</Typography>
              </Box>
              :
              <Box sx={{cursor:"pointer", border: "1px solid #6610F2", mb: "1rem", width: "120px", height: "auto", p: ".5rem", backgroundColor: "#6610F2", mt: "3rem" }}>
              <Box sx={{display:"flex", justifyContent:"space-around"}}><CircularProgress style={{ color: 'white' }}/>
              </Box>
              </Box>
              }

            {/* </Box> */}
        </Box>}



      </Box>
    </Box>}
    </>
  )
}

export default AddProduct