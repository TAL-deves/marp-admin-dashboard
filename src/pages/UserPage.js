
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import { Circles } from 'react-loader-spinner';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getRequestHandler } from '../apiHandler/customApiHandler';


export default function OrderList() {

  const [orderList, setOrderList] = React.useState([])
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = React.useState('user');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [show, setShow] = React.useState(false)

  async function handleGetAllDataforUpdate() {
    setShow(true)
    try {
      // const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/ordermanagement?page=${currentPage}&items=10&deliveryStatus=queued`);
      const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/useraction?role=${selectedDeliveryStatus}&page=${currentPage}&items=10`);
      // Handle the response data
      setOrderList(response.data.allData)
      console.log("user response", response.data.allData)
      setTotalPages(response.data.totalPages);
      // setCurrentPage(response.data.currentPage);
      setShow(false)
    } catch (error) {
      // Handle the error
      console.error(error);
      setShow(false)
    }
  }

  React.useEffect(() => {
    handleGetAllDataforUpdate()
  }, [currentPage])

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

// console.log("orderList--------->", orderList.length);

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
          <Box sx={{ display: "flex", mb: "1rem" }}>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("user") }}>Filter</Box>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("admin") }}>Admin</Box>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("user") }}>User</Box>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("shipper") }}>Shipper</Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
             {!orderList ?
                  <><Typography>Data Not Found</Typography></>
                  :
                  <>
                    {
                    orderList.filter((row) =>
                      selectedDeliveryStatus === 'user'? 
                         true
                        : row.role === selectedDeliveryStatus)
                   .map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.createdAt}
                        </TableCell>
                        <TableCell align="left">{row.profile?.fullName}</TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell> 
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.profile?.gender}</TableCell>
                        {/* {row.paymentStatus === "pending" ?
                          <TableCell align="left">
                            <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}>
                              <span style={{ color: 'green', fontSize: "2rem", lineHeight: '0.35' }}>•</span>
                              {row.paymentStatus}
                            </Typography>
                          </TableCell>
                          :
                          <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}><span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>{row.paymentStatus}</Typography></TableCell>} */}
                        {/* {row.deliveryStatus === "queued" ?
                          <TableCell align="left">
                            <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8", }}>
                              <span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>
                              {row.deliveryStatus}
                            </Typography>
                          </TableCell>
                          :
                          <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8" }}><span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>{row.deliveryStatus}</Typography></TableCell>
                        } */}
                        <TableCell align="left">{row.profile?.address}</TableCell>
                      </TableRow>
                    ))}
                  </>}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2} sx={{ mt: "1rem" }}>
              <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
            </Stack>
          </Box>
        </>
      }
    </>
  );
}