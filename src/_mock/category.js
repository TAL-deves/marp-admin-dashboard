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
import { getRequestHandler, postRequestHandler, deleteRequestHandler } from "src/apiHandler/customApiHandler";
import CardMedia from '@mui/material/CardMedia';
// import picture from "../../assets/transparent.png"
import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from "@mui/material/Backdrop";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';

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


const Category = () => {
  const [data, setData] = useState([]);
  const [subCate, setSubCate] = useState([]);
  // const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [reload, setReload] = useState(false)

  // Data coming from backend
  useEffect(() => {
    async function getData() {
      const categoriesData = await getRequestHandler("https://marpapi.techanalyticaltd.com/category/");
      setData(categoriesData.data.categoryList);
      // console.log("categoriesData", categoriesData);
    }
    getData();
    console.log("useEffect------");
  }, [reload]);


  // New category start from here 
  const [opens, setOpens] = useState(false);
  const handleOpen = () => setOpens(true);

  const handleNewCategory = () => {
    setOpens(false);
    async function getData() {
      const NewResData = await postRequestHandler(`https://marpapi.techanalyticaltd.com/category/`, { category });
      console.log("NewResData ", NewResData);
      setReload(!reload);
    }
    getData();
  }

  const handleClickedCategory = () => {
    handleOpen();
  }
  const handleClose = () => setOpens(false);

  // New category start from here 
  const [open, setOpen] = useState(false);
  const handleClickedSubcategory = () => {
    setOpen(true);
  }

  const handleSubcategoryCreate = () => {
    setOpen(false);
    async function getData() {
      const NewResData = await postRequestHandler('https://marpapi.techanalyticaltd.com/category/', { category, subcategory });
      console.log("NewResData ", NewResData);
      setReload(!reload);
    }
    getData();
  }
  const handleSubcategory = () => setOpen(false);

  // select menu item start from here
  // const [age, setAge] = React.useState('');
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  // console.log("age------", age);


  const handleClickedEdit = (id) => {
    console.log("edit button", id);
  }


  const handleCategoryDelete = (id) => {
    async function getData() {
      const responseData = await deleteRequestHandler("https://marpapi.techanalyticaltd.com/category/", { categoryId: id });
      console.log("responseData", responseData);
      setReload(!reload)
    }
    getData();
  }
  const handleClickedDeleteSub = (id) => {
    console.log("clicked handleClickedDeleteSub");
    async function getData() {
      const resSubCateData = await deleteRequestHandler("https://marpapi.techanalyticaltd.com/category/", { subcategoryId: id });
      console.log("resSubCateData", resSubCateData);
      // setReload(!reload)
    }
    getData();
  }

  // const handleOpenSubCategory = (name) => {
  //   setMenu(!menu);
  //   async function getData() {
  //     const responseData = await getRequestHandler(`https://marpapi.techanalyticaltd.com/category/subcategories?categoryName=${name}`);
  //     setSubCate(responseData.data.categoryList);
  //     console.log("subcategory responseData", responseData);
  //   }
  //   getData();
  // }


  // subcategory item start from here

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const openSubCategory = Boolean(anchorEl);
  // const handleClickSC = (event) => {
  //   console.log("toggle button--");
  //   setAnchorEl(event.currentTarget);
  // };

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


                              <Button 
                              // onClick={handleClickSC}
                              //   size="small"
                              //   sx={{ ml: 6 }}
                              //   aria-controls={openSubCategory ? 'account-menu' : undefined}
                              //   aria-haspopup="true"
                              //   aria-expanded={openSubCategory ? 'true' : undefined}
                                >
                                <KeyboardArrowDownIcon sx={{ color: "#6610F2" }} onClick={() => {
                                  console.log("item ----->", item)
                                  setSubCate(item.subcategories)
                                }
                                } />
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
      </Box>

      {/* New Category start from here */}
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
              <Typography>
                Category
              </Typography>
              <TextField id="outlined-basic" label="Category" variant="outlined" type="text" sx={{ width: "100%", marginY: 2 }} onChange={(e) => setCategory(e.target.value)} />
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

      {/* New SubCategory start from here */}
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
              <Typography sx={{ margin: 2 }}>
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
              <Typography sx={{ margin: 2 }}>
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