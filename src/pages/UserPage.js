
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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import BackDrop from '../backDrop';
import Iconify from '../components/iconify';
import { getRequestHandler } from '../apiHandler/customApiHandler';

export default function OrderList() {
  const [userList, setUserList] = React.useState([])
  // const [id,setId]= React.useState()
  const [roleStatus, setRoleStatus] = React.useState('user');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [show, setShow] = React.useState(false)

  async function handleGetAllDataforUpdate() {
    setShow(true);
    try {
      const response = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/useraction?role=${roleStatus}&page=${currentPage}&items=10`);
      // Handle the response data
      setUserList(response.data.allData)
      
      setTotalPages(response.data.totalPages);
      // setId(response.data.allData.id)
      console.log("user response", response.data.allData)
      // setCurrentPage(response.data.currentPage);
      setShow(false)
    } catch (error) {
      setShow(false)
    }
  }

  React.useEffect(() => {
    handleGetAllDataforUpdate()
  }, [currentPage, roleStatus])

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // const handleCreateUser = () => {
  //   swal("Coming Soon!!!", "Please Wait!", "success");
  // };

  // console.log("orderList--------->",orderList, orderList.length);

  return (
    <>
      {show ?
       <BackDrop show={show}/>
       :
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h4' sx={{ml:2}}><PersonAddAltIcon sx={{}}/> All User List</Typography>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Box sx={{ display: "flex", mb: "1rem" }}>
                  {/* <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setRoleStatus("user") }}>Filter</Box> */}
                  <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setRoleStatus("admin") }}>Admin</Box>
                  <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setRoleStatus("user") }}>User</Box>
                  <Box sx={{ border: "1px solid #F4F6F8", backgroundColor: "#F4F6F8", borderRadius: 1.1, p: ".5rem", m: ".5rem", cursor: "pointer", boxShadow: 3, '&:hover': { boxShadow: 4 } }} onClick={() => { setRoleStatus("shipper") }}>Shipper</Box>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ display: "flex", mb: "1rem" }}>
                  <Link style={{ textDecoration: "none" }} to="/dashboard/add-user">
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} sx={{
                      bgcolor: "#6610F2", color: "white", ":hover": {
                        bgcolor: '#6EAB49'
                      }
                    }}>
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
                  <TableCell>Created at</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Role</TableCell>
                  {/* <TableCell align="left">Verified</TableCell> */}
                  <TableCell align="left">Status</TableCell>
                  {/* <TableCell align="left">Company</TableCell> */}
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!userList ?
                  <><Typography>Data Not Found</Typography></>
                  :
                  <>
                    {
                      userList.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {
                              new Date(row.createdAt).toLocaleDateString('en-GB')
                              }
                            </TableCell>
                            <TableCell align="left">{row.profile?.fullName}</TableCell>
                            <TableCell align="left">{row.role}</TableCell>
                            {row.locked === false ?
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
                            <TableCell align="left">

                              <Link to={`/dashboard/add-user/${row.id}`}>
                                <EditIcon sx={{ color: "#6EAB49" }} />
                              </Link>
                            </TableCell>
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