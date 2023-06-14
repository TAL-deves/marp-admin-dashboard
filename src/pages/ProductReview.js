import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { getRequestHandler, postRequestHandler } from '../apiHandler/customApiHandler';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function ProductReview() {
    const location = useLocation();
    const name = location.state.name;
    const cat = location.state.cat;
    const subCat = location.state.subCat;
    const brandname = location.state.brandname;
    const code = location.state.code;
    const sKu = location.state.sKu;
    const salecount = location.state.salecount;
    const newitem = location.state.newitem;
    const stoCk = location.state.stoCk;
    const disCount = location.state.disCount;
    const priCe = location.state.priCe;
    const shortdescription = location.state.shortdescription;
    const fulldescription = location.state.fulldescription;
    const imagesList =location.state.imagesList;
  //   const productData= {
  //     "sku": {sKu},
  //     "productCode":{code}, 
  //     "name": {name},
  //     "price": {priCe},
  //     "discount": {disCount},
  //     "newItem": {newitem},
  //     "saleCount": {salecount},
  //     "stock": {stoCk},
  //     "shortDescription": {shortdescription},
  //     "fullDescription": {fulldescription},
  //     "productImages": "http://dummyimage.com/133x100.png/cc0000/ffffff",
  //     "brand": {brandname},
  //     "categoryName": {cat}, 
  //     "subcategoryName": {subCat} 
  // }


    async function handleAddProducts() {
      // const product = '{
      //   product: productData
      // };
      try {
        const response = await postRequestHandler('https://marpapi.techanalyticaltd.com/product',{
          product: {
            sku: `${sKu}`,
            productCode: `${code}`,
            name: `${name}`,
            price: `${priCe}`,
            discount: `${disCount}`,
            newItem: `${newitem}`,
            saleCount: `${salecount}`,
            stock: `${stoCk}`,
            shortDescription: `${shortdescription}`,
            fullDescription: `${fulldescription}`,
            productImages: `${imagesList}`,
            brand: `${brandname}`,
            categoryName: `${cat}`,
            subcategoryName: `${subCat}`,
          },
        });
        // Handle the response data
        
         console.log("new add product response",response);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }

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
  }, []);
   
    const settings = {
      dots: true,
      infinite: true, 
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrow:true
    };
    
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent:"flex-start" }}>
        <Typography sx={{  m: "1rem" }}>
          + Add Product
        </Typography>
        <Typography sx={{borderBottom: "5px solid #6610F2", m: "1rem" }}>
          Product Review
        </Typography>
      </Box>
      <Box sx={{display:"flex", justifyContent:"center"}}>
      <Box sx={{height:"15rem", width:"15rem", m:"2rem", textAlign:"center"}}>
      {imagesList[0]?

     <Slider {...settings}>
      {imagesList.map((image, index) => (
        // <div key={index}>
          <img height="auto" width="10rem" src={image} alt="" />
        // </div>
      ))}
    </Slider>
    
    :
    <>
    <Typography sx={{color:"red"}}>Please upload an image</Typography>
    </>}
    </Box>
    </Box>
    <Box container sx={{m:"5rem"}}>
     
      
      <Box>
        <Typography> Product Name:{name}</Typography>
        <Typography> Category:{cat}</Typography>
        <Typography> Product Code:{subCat}</Typography>
        <Typography> Skew:{sKu}</Typography>
        <Typography> Sale Count:{salecount}</Typography>
        <Typography> New Item
            :{newitem}</Typography>
        <Typography> Stock:{stoCk}</Typography>
        <Typography> Discount:{disCount}</Typography>
        <Typography> Price:{priCe}</Typography>
        <Typography> Short Description:{shortdescription}</Typography>
        <Typography> Full Description:{fulldescription}</Typography>
      </Box>

      <Box sx={{display:"flex", justifyContent:"flex-end"}}>
        <Link  style={{textDecoration:"none"}} to="/dashboard/product">
        <Box sx={{border:"1px solid #6610F2", mb:"1rem", width:"120px",height:"34px",  p:".5rem", backgroundColor:"#6610F2", mt:"3rem", mr:"1rem"}}>
          {/* <AddCircleIcon/> */}
       
          <Typography sx={{color:"white",fontSize:"12px", textDecoration:"none", textAlign:"center"}}>Previous</Typography>
          
        </Box>
        </Link>
        <Box onClick={()=>{handleAddProducts()}} sx={{border:"1px solid #6610F2", mb:"1rem", width:"120px",height:"34px",  p:".5rem", backgroundColor:"#6610F2", mt:"3rem", cursor:"pointer"}}>
          {/* <AddCircleIcon/> */}
       
          <Typography sx={{color:"white",fontSize:"12px", textDecoration:"none", textAlign:"center"}}>Publish</Typography>
          
        </Box>
        </Box>
        </Box>
    </Box>
  )
}

export default ProductReview
