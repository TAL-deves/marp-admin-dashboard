import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import EditIcon from '@mui/icons-material/Edit';
import { Circles } from 'react-loader-spinner';
import Iconify from '../components/iconify';
import { getRequestHandler } from '../apiHandler/customApiHandler';

export default function OrderList() {

  const [orderList, setOrderList] = React.useState([])
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = React.useState('user');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [show, setShow] = React.useState(false)

  async function handleGetAllDataforUpdate() {
    setShow(true);
    // try {const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/useraction?role=user`);
    try {const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/useraction?role=${selectedDeliveryStatus}&page=${currentPage}&items=10`);
      // Handle the response data
      setOrderList(response.data.allData)
       console.log("user response", response.data.allData)
      setTotalPages(response.data.totalPages);
      // setCurrentPage(response.data.currentPage);
      setShow(false)
    } catch (error) {
      // Handle the error
      // console.error(error);
      setShow(false)
    }
  }

  React.useEffect(() => {
    handleGetAllDataforUpdate()
  }, [currentPage])

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCreateUser = () => {
    swal("Coming Soon!!!", "Please Wait!", "success");
  };

// console.log("orderList--------->",orderList, orderList.length);

  return (
    <>
      {show ?
        <>
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
        </>
        </> :
        <>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
        <Box sx={{ display: "flex", mb: "1rem" }}>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("user") }}>Filter</Box>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("admin") }}>Admin</Box>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("user") }}>User</Box>
            <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setSelectedDeliveryStatus("shipper") }}>Shipper</Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
        <Box sx={{ display: "flex", mb: "1rem" }}>
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-user">
           <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
            }}}>
            Create New User
          </Button>
          </Link>
          </Box>
      </Grid>
      </Grid>
    </Box>
        

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Role</TableCell>
                  {/* <TableCell align="left">Verified</TableCell> */}
                  <TableCell align="left">Status</TableCell>
                  {/* <TableCell align="left">Company</TableCell> */}
                  <TableCell align="left">Action</TableCell>
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
                        <TableCell align="left">{row.role}</TableCell>
                        {row.locked === true ?
                          <TableCell align="left">
                            <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8", }}>
                              <span style={{ color: '#6EAB49', fontSize: "2rem", lineHeight: '0.35' }}>•</span>Active
                              {row.locked}
                            </Typography>
                          </TableCell>
                          :
                          <TableCell align="left">
                          <Typography sx={{ display: 'flex', alignItems: "center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p: ".2rem", bgcolor: "#F4F6F8", }}>
                            <span style={{ color: 'red', fontSize: "2rem", lineHeight: '0.35' }}>•</span>Locked
                            {row.locked}
                          </Typography>
                        </TableCell>
                        }
                        <TableCell align="left"><EditIcon sx={{color:"#6EAB49"}}/></TableCell>
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