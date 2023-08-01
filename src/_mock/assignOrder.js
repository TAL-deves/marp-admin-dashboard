import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Select from '@mui/material/Select';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import TableCell from '@mui/material/TableCell';
import { Circles } from 'react-loader-spinner';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { getRequestHandler } from '../apiHandler/customApiHandler';


export default function OrderList() {

  const [orderList, setOrderList] = React.useState()
  const [filteredOrder, setFilteredOrder] = React.useState()
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [show, setShow] = React.useState(false)

  async function handleGetAllDataforUpdate() {
    setShow(true)
    try {
      const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/ordermanagement?page=${currentPage}&items=10&deliveryStatus=queued`);
      // Handle the response data
      setOrderList(response.data.orders)
      // console.log("order response", response.data)
      setTotalPages(response.data.totalPages)
      setShow(false)
    } catch (error) {
      // Handle the error
      console.error(error);
      setShow(false)
    }
  }

  // search order 
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  let filteredOrders = []
  if (orderList) {
    filteredOrders = orderList.filter((order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //  console.log("filteredOrders",filteredOrders)
  }
  // if(orderList){
  //   const searchedorder =orderList.filter((order) =>
  //   order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredOrder(searchedorder)
  // }

  React.useEffect(() => {
    handleGetAllDataforUpdate()
  }, [currentPage])

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };



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
        <>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography variant='h4'>Shipping Item</Typography>
          <Box>
          <Button sx={{
                bgcolor:
                '#03A550', color: "white", ":hover": {
                    bgcolor: "#6610F2"
                }
              }}>+ Add new shipment</Button>
            <Button variant="contained" sx={{
                bgcolor:
                '#FFFFFF',color: "black",":hover": {
                    bgcolor: "#6610F2", color:"white"
                }
              }}><FileUploadIcon/>Export orders</Button>
          </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", mb: "1rem" }}>

              <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("all") }}>Assign Order</Box>
              <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("queued") }}>Processing</Box>
              <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("in_progress") }}>Delivered</Box>
              {/* <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("completed") }}>Completed</Box> */}
            </Box>
            <TextField
              label="Search Order ID"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: "1rem" }}
            />
          </Box>
          <Box>
            <Typography variant='h4'>Assign Order</Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Customer</TableCell>
                  <TableCell align="left">Vendor Name</TableCell>
                  <TableCell align="left">Payment Status</TableCell>
                  <TableCell align="left">Delivery Status</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="left">Delivery Address</TableCell>
                  <TableCell align="left">Action</TableCell>
                  <TableCell align="left">Action status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {!orderList ?
                  <></>
                  :
                  <>

                    {filteredOrders ?
                      <>
                        {filteredOrders.filter((row) =>
                          selectedDeliveryStatus === 'all'
                            ? true
                            : row.deliveryStatus === selectedDeliveryStatus
                        ).map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              "#111827"
                            </TableCell>
                            <TableCell align="left">{row.createdAt}</TableCell>
                            <TableCell align="left">{row.userId}</TableCell>
                            <TableCell align="left">{row.orderNumber}</TableCell>
                            {/* <TableCell align="left">{row.vendor}</TableCell> */}
                            {row.paymentStatus === "pending" ?
                              <TableCell align="left">
                                <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}>
                                  <span style={{ color: 'green', fontSize: "2rem", lineHeight: '0.35' }}>•</span>
                                  {row.paymentStatus}
                                </Typography>
                              </TableCell>
                              :
                              <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}><span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>{row.paymentStatus}</Typography></TableCell>
                            }
                            {row.deliveryStatus === "queued" ?
                              <TableCell align="left">
                                <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8", }}>
                                  <span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>
                                  {row.deliveryStatus}
                                </Typography>
                              </TableCell>
                              :
                              <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}><span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>{row.deliveryStatus}</Typography></TableCell>
                            }
                            {/* <TableCell align="left">{row.deliveryStatus}</TableCell> */}
                            <TableCell align="left">৳{row.totalAmount}</TableCell>
                            <TableCell align="left"><AddLocationAltIcon /></TableCell>
                            <TableCell align="left"><EditIcon /></TableCell>
                            <TableCell align="left">Processing</TableCell>
                          </TableRow>
                        ))}
                      </>
                      :
                      <>
                        {orderList.filter((row) =>
                          selectedDeliveryStatus === 'all'
                            ? true
                            : row.deliveryStatus === selectedDeliveryStatus
                        ).map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.orderNumber}
                            </TableCell>
                            <TableCell align="left">{row.createdAt}</TableCell>
                            <TableCell align="left">{row.userId}</TableCell>
                            {/* <TableCell align="left">{row.vendor}</TableCell> */}
                            {row.paymentStatus === "pending" ?
                              <TableCell align="left">
                                <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}>
                                  <span style={{ color: 'green', fontSize: "2rem", lineHeight: '0.35' }}>•</span>
                                  {row.paymentStatus}
                                </Typography>
                              </TableCell>
                              :
                              <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}><span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>{row.paymentStatus}</Typography></TableCell>
                            }
                            {row.deliveryStatus === "queued" ?
                              <TableCell align="left">
                                <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8", }}>
                                  <span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>
                                  {row.deliveryStatus}
                                </Typography>
                              </TableCell>
                              :
                              <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}><span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>{row.deliveryStatus}</Typography></TableCell>
                            }
                            {/* <TableCell align="left">{row.deliveryStatus}</TableCell> */}
                            <TableCell align="left">৳{row.totalAmount}</TableCell>
                            {/* <TableCell align="left"><EditIcon /></TableCell>
                            <TableCell align="left"><AddLocationAltIcon /></TableCell> */}
                          </TableRow>
                        ))}
                      </>
                    }
                  </>}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Typography>Page: {currentPage}</Typography> */}
            <Stack spacing={2} sx={{ mt: "1rem" }}>
              <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
            </Stack>
          </Box>
        </>
      }
    </>
  );
}
