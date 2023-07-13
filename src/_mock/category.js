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
import { getRequestHandler, putRequestHandler,photoUploadRequestHandler, postRequestHandler, deleteRequestHandler } from "src/apiHandler/customApiHandler";
import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    console.log("response button clicked", files);
    const images = Array.from(files).map((file) => URL.createObjectURL(file));
    setDroppedImages(images);
// console.log("images -------.", images);
    const formData= new FormData();
    formData.append('image', files[0]);
    async function getData() {
      try {
        await photoUploadRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}admin/bucket/uploadsingleimage?uploadto=category`, {formData})
       .then((res)=>res.json())
       .then(()=>console.log("res"))
       setShow(false);
     } catch (error) {
       console.error(error);
     }}
    getData();
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };


  // const handleFileInputChange = (event) => {
  //   const files = event.target.files[0];
  //   setCreateFile(event.target.files[0])
  //   console.log('Selected File:', event);
  //   const blobUrl = URL.createObjectURL(files);
  //   const convertedFile = new File([files], files.name, {
  //     type: files.type,
  //   });
  //   handleFiles(files);
  //   URL.revokeObjectURL(blobUrl);
  //   handleAddPhoto(files);
  //   console.log("files", event.target.files[0]);
  // };


// async function handleAddPhoto(files) {
//     setShow(true);  
//     // console.log("files response", createFile);
//     const formData= new FormData();
//     formData.append('image', files);
//     // const image=formData.getAll('image')
//     try {
//        await photoUploadRequestHandler('https://marpapi.techanalyticaltd.com/admin/bucket/uploadsingleimage?uploadto=productPhotos', formData)
//       .then((res)=>{
//         console.log("formData response", res);
//       });
//       setShow(false);
//     } catch (error) {
//       console.error(error);
//     }
//   }













  // subCategory image section start from here
  const [droppedImagesSub, setDroppedImagesSub] = useState("");
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
    console.log("Browser click button");
    fileInputRefSub.current.click();
    // async function getData() {
    //   const categoriesData = await putRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}admin/bucket/uploadsingleimage?uploadto=category`);
    //   setData(categoriesData);
    // }
    // getData();
  };
  const handleFilesSub = (files1) => {
    const imagesSub = Array.from(files1).map((file) => URL.createObjectURL(file));
    setDroppedImagesSub(imagesSub);
  };

  // Data coming from backend
  useEffect(() => {
    setShow(true);
    async function getData() {
      const categoriesData = await getRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}category/`);
      setData(categoriesData.data.categoryList);
      setShow(false)
    }
    getData();
  }, [reload]);


  // New category start from here 
  const [opens, setOpens] = useState(false);
  const handleOpen = () => setOpens(true);

  const handleNewCategory = () => {
    setOpens(false);
    async function getData() {
      const NewResData = await postRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}category/`, { category,categoryImage:droppedImages.toString() });
      setReload(!reload);
      setDroppedImages(false);
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
      const NewResData = await postRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}category/`, { category, subcategory, subcategoryImage:droppedImagesSub.toString() });
      console.log("NewResData of subcategory", NewResData);
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
    // swal("Logged out!", "Your have successfully logged out!", "success");
  }


  const handleCategoryDelete = (id) => {
    // alert("Hello! I am an alert box!");
    async function getData() {
      const responseData = await deleteRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}category/`, { categoryId: id });
      console.log("responseData", responseData);
      setReload(!reload)
    }
    getData();
  }
  const handleClickedDeleteSub = (id) => {
    // console.log("clicked handleClickedDeleteSub");
    async function getData() {
      const resSubCateData = await deleteRequestHandler(`${process.env.REACT_APP_PUBLIC_APIPOINT}category/`, { subcategoryId: id });
      console.log("resSubCateData", resSubCateData);
      // setReload(!reload)
    }
    getData();
  }

  // if(hidden){

  // }
// console.log("image photo", droppedImages);


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
                              image="./../../assets/Rectangle 181.png"
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
                              <Button onClick={() => handleClickedEdit(item.id)}><ModeEditIcon sx={{ color: "#6EAB49" }} /></Button>
                              <Button onClick={() => handleCategoryDelete(item.id)}><DeleteIcon sx={{ color: "#E53E3E" }} />
                              </Button>
                              <Button onClick={() => {
                                  setSubCate(item.subcategories)}}>
                                <KeyboardArrowDownIcon sx={{ color: "#6610F2" }} onClick={() => {
                                  setSubCate(item.subcategories)}} />
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
                <Typography sx={{ my: 3 }} variant='h4'>SubCategory of {subCate.name}
                
                </Typography>

                {
                  subCate.length === 0 ?
                    <Typography>
                      No Subcategory here
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
                                      height="full"
                                      width="full"
                                      image="./../../assets/Rectangle 181.png"
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

    {hidden ?
  <AleartComponent open={hidden}/>
      :
      <> </>
      }

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
                  </Container> 
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