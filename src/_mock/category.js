/* jshint sub:true */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import { getRequestHandler, patchRequestHandler,photoUploadRequestHandler, postRequestHandler, deleteRequestHandler } from "src/apiHandler/customApiHandler";
import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Backdrop from "@mui/material/Backdrop";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from '@emotion/styled';
import swal from 'sweetalert';
import BackDrop from "../backDrop";
import AleartComponent from "../components/aleartComponent/Aleart"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "52%",
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const Container = styled('div')({
  border: '2px dotted #03A550',
  borderRadius:"10px",
  height: "6rem",
  width: "100%",
  textAlign: 'center',
  // justifyContent:"center",
  // alignContent:"center"
  // cursor: 'pointer',
});

const Category = () => {
  const [data, setData] = useState([]);
  const [subCate, setSubCate] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [reload, setReload] = useState(false)
  const [show, setShow] = React.useState(false)
  const navigate = useNavigate();

  const [idUpdate, setIdUpdate] = useState("");
  const [UpCategory, setUpCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState("");


  // setIdUpdate(data?.id);
  // setUpCategory(data?.name);
  // setCategoryImage(data?.image);


  // category image section start from here
  const [droppedImages, setDroppedImages] = useState("");
  const [createFile, setCreateFile] = useState("");
  const fileInputRef = React.useRef(null);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };
  const handleFiles = (files) => {
    const images = Array.from(files).map((file) => URL.createObjectURL(file));
    setDroppedImages(images);
    const formData= new FormData();
    formData.append('image', files[0]);
    async function getData() {
      try {
        await photoUploadRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}admin/bucket/uploadsingleimage?uploadto=category`, formData)
       .then((response)=>setCreateFile(response.data.data.publicUrl))
       setShow(false);
     } catch (error) {
       console.error(error);
     }}
    getData();
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // subCategory image section start from here
  const [droppedImagesSub, setDroppedImagesSub] = useState("");
  const [createFileSub, setCreateFileSub] = useState("");
  // const [imageUrlStore, setImageUrlStore] = useState([]);
  const fileInputRefSub = React.useRef(null);
  const handleDragOverSub = (event) => {
    event.preventDefault();
  };

  const handleDropSub = (event) => {
    event.preventDefault();
    const files1 = event.dataTransfer.files;
    handleFilesSub(files1);
  };

  const handleFileInputChangeSub = (event) => {
    const files1 = event.target.files;
    handleFilesSub(files1);
  };
  const handleBrowseClickSub = () => {
    fileInputRefSub.current.click();
  };
  const handleFilesSub = (files1) => {
    const imagesSub = Array.from(files1).map((file) => URL.createObjectURL(file));
    setDroppedImagesSub(imagesSub);
    console.log("imagesSub-----", imagesSub);
    const formData= new FormData();
    formData.append('image', files1[0]);
    async function getData() {
      try {
        await photoUploadRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket/uploadsingleimage?uploadto=subcategory`, formData)
       .then((response)=>setCreateFileSub(response.data.data.publicUrl))
       console.log("image updated response",createFileSub)
       
       setShow(false);
     } catch (error) {
       console.error(error);
     }}
    getData();
  };

  // Data coming from backend
  useEffect(() => {
    setShow(true);
    async function getData() {
      const categoriesData = await getRequestHandler(`https://marpapi.techanalyticaltd.com/category/`);
      // console.log("categoriesData----", categoriesData.data.categoryList
      // );
      setData(categoriesData.data.categoryList);
      // setIdUpdate(categoriesData.data.categoryList?.id);
      // setUpCategory(categoriesData.data.categoryList?.name);
      // setCategoryImage(categoriesData.data.categoryList?.image);
      setShow(false)
    }
    getData();
  }, [reload]);


  // New category start from here 
  const [opens, setOpens] = useState(false);
  const handleOpen = () => setOpens(true);

  const handleNewCategory = () => {
    setShow(true);
    // console.log("createFile", createFile);
    setOpenUpdate(false);
    async function getData() {
      const NewResData = await postRequestHandler(`https://marpapi.techanalyticaltd.com/category/`, { category,categoryImage:createFile});
      // console.log("new category create", NewResData);
      setReload(!reload);
      setDroppedImages(false);
      handleClose();
    } 
    getData();
  }

  const handleClickedCategory = () => {
    handleOpen();
  }
  const handleClose = () => {
    setOpens(false);
    setDroppedImages(false);
    setDroppedImagesSub(false)
  }

  // New SubCategory start from here 
  const [open, setOpen] = useState(false);
  const handleClickedSubcategory = () => {
    setOpen(true);
  }

  const handleSubcategoryCreate = () => {
    setOpen(false);
    async function getData() {
      const NewResData = await postRequestHandler(`https://marpapi.techanalyticaltd.com/category/`, { category, subcategory, subcategoryImage:createFileSub});
      // console.log("NewResData of subcategory", NewResData);
      setReload(!reload);
      setDroppedImagesSub(false)
    }
    getData();
  }
  const handleSubcategory = () => {
    setOpen(false);
    setDroppedImagesSub(false)
    }

  // eslint-disable-next-line consistent-return
  const handleClickedEdit = (id) => {
    console.log("edit button", id);
      setHidden(true);
  }

  const handleCloseUpdate=()=>{
    setOpenUpdate(false);
    setUpCategory("")
    setShow(false);
  }


const [openUpdate, setOpenUpdate]=useState(false);
  async function handleUpdateCategory(id) {
    setShow(true);
    setOpenUpdate(true);
const filteredItem = data?.filter((user) => user.id === id);
setIdUpdate(filteredItem[0]?.id);
   setUpCategory(filteredItem[0]?.name);
   setCategoryImage(filteredItem[0]?.image);
  }

  const handleUpdatedCategory = async() => {
    setOpenUpdate(false);
    try {
      const response = await patchRequestHandler('https://marpapi.techanalyticaltd.com/category/', {
        "categoryId":`${idUpdate}`,
        "updatedCategoryName": `${UpCategory}`,
        "updatedCategoryImage":`${categoryImage}`,
    });
    console.log("response----",response);
      // Handle the response data
      
      if (response.success) {
        setReload(!reload)
        navigate("/dashboard/category")
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
    setShow(false);
    handleCloseUpdate();
  }



  const handleCategoryDelete = (id) => {
    let text = "Press a button! Are you sure you want to permanently delete Category";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(text) === true) {
      getData()
      // eslint-disable-next-line no-inner-declarations
      async function getData() {
        const responseData = await deleteRequestHandler(`https://marpapi.techanalyticaltd.com/category/`, { categoryId: id });
        // console.log("responseData", responseData);
        setReload(!reload)
      }
    } else {
      text =false;
    } 
  }
  const handleClickedDeleteSub = (id) => {
    // console.log("clicked handleClickedDeleteSub");
    async function getData() {
      const resSubCateData = await deleteRequestHandler(`https://marpapi.techanalyticaltd.com/category/`, { subcategoryId: id });
      console.log("resSubCateData", resSubCateData);
      // setReload(!reload)
    }
    getData();
  }


  const handleDeleteCategoryImage=async()=>{
    let parts;
    let fileNames;
    console.log("createFile category image __", categoryImage);
    if(categoryImage)
    {
      parts = categoryImage.split("category/");
     fileNames = parts.pop();
    }
    try {
      const response = await deleteRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket/files`,{"bucketName": "category", fileNames});
      // Handle the response data
      console.log("image delete response", response);
      setShow(false)
      setDroppedImages(false);
    } catch (error) {
      // Handle the error
      console.error(error);
      setDroppedImages(false);
    }
  }


  const handleDeleteSubImage=async()=>{
    let parts;
    let fileNames;
    if(createFileSub)
    {
      parts = createFileSub.split("subcategory/");
     fileNames = parts.pop();
    }
    try {
      const response = await deleteRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket/files`,{"bucketName": "subcategory", fileNames});
      // Handle the response data
      // console.log("image delete response", response);
      setShow(false)
      setDroppedImagesSub(false)
    } catch (error) {
      // Handle the error
      console.error(error);
      setDroppedImagesSub(false)
    }
  }
 
console.log("Category data categoryImage UpCategory",categoryImage, UpCategory);


  return (
    <>
      <Helmet>
        <title> Category | admin dashboard </title>
      </Helmet>
      {/* subCategory item start from here */}
      <Box sx={{ marginX: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Box sx={{ display: "flex" }}>
                <Typography variant='h4' sx={{ padding: 0 }}>Category</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: "end", alignSelf: "end" }}>
              <Button onClick={handleClickedCategory} sx={{
                bgcolor: "#6610F2", color: "white", ":hover": {
                  bgcolor: '#6EAB49'
                }
              }}><AddIcon />New Category</Button>
              <Button onClick={handleClickedSubcategory} sx={{
                bgcolor: "#6610F2", color: "white", ":hover": {
                  bgcolor: '#6EAB49'
                }, margin: 1
              }}><AddIcon />New Subcategory</Button>
            </Grid>
          </Grid>
        </Box>
<>
{
    show ?
    <BackDrop show={show}/>
    :
<Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}> {
                data.map((item) => (
                  <>
                  <Card sx={{ width: "100%", marginTop: 3 }} key={item.id}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={3}>
                            <CardMedia
                              component="img"
                              alt="green iguana"
                              height="full"
                              width="full"
                              // image=""
                              image={item.image}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <CardContent sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                            }}>
                              <Typography>
                                {item.name}
                                {/* Name */}
                              </Typography>
                            </CardContent>
                          </Grid>
                          <Grid item xs={6}>
                            <CardActions sx={{
                              display: 'flex',
                              justifyContent: 'end',
                              alignItems: 'center',
                              height: '100%',
                            }}>
                              <Button onClick={() => handleUpdateCategory(item.id)}><ModeEditIcon sx={{ color: "#6EAB49" }} /></Button>
                              <Button onClick={() => handleCategoryDelete(item.id)}><DeleteIcon sx={{ color: "#E53E3E" }} />
                              </Button>
                              <Button onClick={() => {
                                  setSubCate(item.subcategories)}}>
                                <KeyboardArrowDownIcon sx={{ color: "#6610F2"}}/>
                              </Button>
                            </CardActions>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </>
                ))
              }
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems="center"
                justifyContent={'center'}
                margin='auto'
                maxWidth={540}
                borderRadius={2}
                boxShadow={'5px 5px 10px #ccc'}
                sx={{
                  ":hover": {
                    boxShadow: '10px 10px 20px #ccc'
                  }
                }}
              >
                <Typography sx={{ my: 3 }} variant='h4'>SubCategory</Typography>

                {
                  subCate.length === 0 ?
                    <Typography>
                      No Subcategory here!!!
                    </Typography>
                    :
                    <>
                      {
                        subCate.map((subItem) => (
                          <>
                            <Card sx={{ width: "96%", height: { xs: 40, marginBottom: 8 } }}>
                              <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
                                    <CardMedia
                                      component="img"
                                      alt="green iguana"
                                      height='100%'
                                      width="100%"
                                      image={subItem.image}
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <CardContent sx={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      height: "40%",
                                    }}>
                                      <h6>
                                        {subItem.name}
                                      </h6>
                                    </CardContent>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <CardActions sx={{
                                      display: 'flex',
                                      justifyContent: 'end',
                                      alignItems: 'center',
                                      height: "30%",
                                    }}>
                                      <Button onClick={handleClickedEdit}><ModeEditIcon sx={{ color: "#6EAB49" }} /></Button>
                                      <Button onClick={()=>handleClickedDeleteSub(subItem.id)}><DeleteIcon sx={{ color: "#E53E3E" }} /></Button>
                                    </CardActions>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Card>
                          </>
                        ))
                      }
                    </>}
              </Box>
            </Grid>
          </Grid>
        </Box> 
}
</>
</Box>


{/* updated category start from here */}
<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUpdate}
        onClose={handleCloseUpdate}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openUpdate}>
          <Box sx={style}>
              <Box>
                <Box sx={{display:'flex',
              justifyContent:'center',
              alignContent:'center',
              marginY:5
              }}>
                  <Box sx={{ display: "flex" }}> 
                   {
                    categoryImage ?
                    <>
                    <Container sx={{ mx: ".5rem" }}>
                    <img src="https://oajxusxzqqhuwzvyniyc.supabase.co/storage/v1/object/public/category/MARP-category-1689247440708.jpeg" alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                    <Button onClick={handleDeleteCategoryImage}>
                    <DeleteForeverIcon sx={{color:'red'}}/>
                    </Button>
                
                  </Container> 
                  {/* <Container sx={{ mx: ".5rem" }}>
                    <img src={droppedImagesSub} alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                          <DeleteForeverIcon sx={{color:'red'}} onClick={handleDeleteSubImage}/>
                  </Container> */}
                    </>
                  :
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", m: "1rem", mx:"1.5rem" }} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Box >
                      <FileDownloadIcon/>
                      <Typography>Drag and drop your file<br/> or</Typography>
                      <div>
                        <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>SELECT FILE</Button>
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
                </Box>
                </Box>
                <Typography sx={{ marginY: 2 }}>
                Category
              </Typography>
              <TextField id="outlined-basic" label="Category" variant="outlined" defaultValue={UpCategory} type="text" sx={{ width: "100%", marginBottom: 2 }} onChange={(e) => setUpCategory(e.target.value)} />
              <Button variant="contained" sx={{
                bgcolor: "#6610F2", ":hover": {
                  bgcolor: '#6EAB49'
                }, width: "32%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                margin: 'auto'
              }} onClick={handleUpdatedCategory}>Updated</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>


      {/* New Category create start from here */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opens}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={opens}>
          <Box sx={style}>
              <Box>
                <Box sx={{display:'flex',
              justifyContent:'center',
              alignContent:'center',
              marginY:5
              }}>
                  <Box sx={{ display: "flex" }}> 
                   {
                    droppedImages ?
                    <>
                    <Container sx={{ mx: ".5rem" }}>
                    <img src={droppedImages} alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                    <Button onClick={handleDeleteCategoryImage}>
                    <DeleteForeverIcon sx={{color:'red'}}/>
                    </Button>
                
                  </Container> 
                  {/* <Container sx={{ mx: ".5rem" }}>
                    <img src={droppedImagesSub} alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                          <DeleteForeverIcon sx={{color:'red'}} onClick={handleDeleteSubImage}/>
                  </Container> */}
                    </>
                  :
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", m: "1rem", mx:"1.5rem" }} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Box >
                      <FileDownloadIcon/>
                      <Typography>Drag and drop your file here<br/> or</Typography>
                      <div>
                        <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>SELECT FILE</Button>
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
                </Box>
                </Box>
                <Typography sx={{ marginY: 2 }}>
                Category
              </Typography>
              <TextField id="outlined-basic" label="Category" variant="outlined" type="text" sx={{ width: "100%", marginBottom: 2 }} onChange={(e) => setCategory(e.target.value)} />
              <Button variant="contained" sx={{
                bgcolor: "#6610F2", ":hover": {
                  bgcolor: '#6EAB49'
                }, width: "32%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                margin: 'auto'
              }} onClick={handleNewCategory}>CREATE</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* New SubCategory create start from here */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleSubcategory}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box>
              <Box sx={{display:'flex',
              justifyContent:'center',
              alignContent:'center',
              marginY:5
              }}>
                  <Box sx={{ display: "flex" }}> 
                   {
                    droppedImagesSub ?
                    <>
                    <Container sx={{ mx: ".5rem" }}>
                    <img src={droppedImagesSub} alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                          <DeleteForeverIcon sx={{color:'red'}} onClick={handleDeleteSubImage}/>
                  </Container> 
                    </>
                  :
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", m: "1rem", mx:"1.5rem"}} onDragOver={handleDragOverSub} onDrop={handleDropSub}>
                    <Box >
                    <FileDownloadIcon/>
                      <Typography>Drag and drop your file here<br/> or</Typography>
                      <div>
                        <Button variant="contained" onClick={handleBrowseClickSub} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>SELECT FILE</Button>
                        <input
                          ref={fileInputRefSub}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileInputChangeSub}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </Box>
                  </Container>
                   }
                </Box>
              </Box>
              <Typography sx={{ marginY: 2 }}>
                Category
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}>
                  {data.map((opItem, index) => (
                    <MenuItem key={index} value={opItem.name}>{opItem.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography sx={{ marginY: 2 }}>
                SubCategory
              </Typography>
              <TextField id="outlined-basic" label="SubCategory" variant="outlined" type="text" sx={{ width: "100%", marginBottom: 2 }} onChange={(e) => setSubcategory(e.target.value)} />
              <Button variant="contained" sx={{
                bgcolor: "#6610F2", ":hover": {
                  bgcolor: '#6EAB49'
                }, width: "32%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                margin: 'auto',

              }} onClick={handleSubcategoryCreate}>CREATE</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Category;