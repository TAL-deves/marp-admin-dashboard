// import { Helmet } from 'react-helmet-async';
// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
// import { useState } from 'react';
// import Backdrop from "@mui/material/Backdrop";
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import TextField from '@mui/material/TextField';
// import CancelIcon from '@mui/icons-material/Cancel';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// // @mui
// import {
//   Card,
//   Table,
//   Stack,
//   Paper,
//   Avatar,
//   Button,
//   Popover,
//   Checkbox,
//   TableRow,
//   MenuItem,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   IconButton,
//   TableContainer,
//   TablePagination,
// } from '@mui/material';
// // components
// import Label from '../components/label';
// import Iconify from '../components/iconify';
// import Scrollbar from '../components/scrollbar';


// // sections
// import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// // import Backdrop from "@mui/material/Backdrop";
// // import Box from '@mui/material/Box';
// // import Modal from '@mui/material/Modal';
// // import Fade from '@mui/material/Fade';
// // mock
// import USERLIST from '../_mock/user';

// // import Button from '@mui/material/Button';
// // import Typography from '@mui/material/Typography';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: "60%",
//   bgcolor: 'background.paper',
//   // border: '2px solid #000',
//   borderRadius:3,
//   boxShadow: 24,
//   p: 4,
// };

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'company', label: 'Company', alignRight: false },
//   { id: 'role', label: 'Role', alignRight: false },
//   { id: 'isVerified', label: 'Verified', alignRight: false },
//   { id: 'status', label: 'Status', alignRight: false },
//   { id: '' },
// ];

// // ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

// export default function UserPage() {
//   const [open, setOpen] = useState(null);

//   const [page, setPage] = useState(0);

//   const [order, setOrder] = useState('asc');

//   const [selected, setSelected] = useState([]);

//   const [orderBy, setOrderBy] = useState('name');

//   const [filterName, setFilterName] = useState('');

//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [opens, setOpens] = useState(false);
//   const handleOpen = () => setOpens(true);
//   // const handleClose = () => setOpens(false);

//   const handleOpenMenu = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setOpen(null);
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = USERLIST.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const handleClickedUser=()=>{
//     handleOpen();
//   }

//   const handleClickUpdate=()=>{
//     setOpens(false)
//   }
//   const handleClickCancel=()=>{
//     setOpens(false)
//   }

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

//   const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

//   const isNotFound = !filteredUsers.length && !!filterName;

//   return (
//     <>
//       <Helmet>
//         <title> User | admin dashboard </title>
//       </Helmet>
//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//           <Box sx={{display:"flex"}}>
//           <PersonAddAltIcon sx={{height:36}}/>
//           <Typography variant="h4" gutterBottom>
//            User
//           </Typography>
//           </Box>

//           <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickedUser} sx={{bgcolor:"#6610F2", color:"white",":hover": {
//                                 bgcolor: '#6EAB49'
//                             }}}>
//             New User
//           </Button>
//         </Stack>

//         <Card>
//           <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

//           <Scrollbar>
//             <TableContainer sx={{ minWidth: 800 }}>
//               <Table>
//                 <UserListHead
//                   order={order}
//                   orderBy={orderBy}
//                   headLabel={TABLE_HEAD}
//                   rowCount={USERLIST.length}
//                   numSelected={selected.length}
//                   onRequestSort={handleRequestSort}
//                   onSelectAllClick={handleSelectAllClick}
//                 />
//                 <TableBody>
//                   {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                     const { id, name, role, status, company, avatarUrl, isVerified } = row;
//                     const selectedUser = selected.indexOf(name) !== -1;

//                     return (
//                       <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
//                         <TableCell padding="checkbox">
//                           <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
//                         </TableCell>

//                         <TableCell component="th" scope="row" padding="none">
//                           <Stack direction="row" alignItems="center" spacing={2}>
//                             {/* <Avatar alt={name} src={avatarUrl} /> */}
//                             <Typography variant="subtitle2" noWrap>
//                               {name}
//                             </Typography>
//                           </Stack>
//                         </TableCell>

//                         <TableCell align="left">{company}</TableCell>

//                         <TableCell align="left">{role}</TableCell>

//                         <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

//                         <TableCell align="left">
//                           <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
//                         </TableCell>

//                         <TableCell align="right">
//                           <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
//                             <Iconify icon={'eva:more-vertical-fill'} />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   }
//                   )}
//                   {emptyRows > 0 && (
//                     <TableRow style={{ height: 53 * emptyRows }}>
//                       <TableCell colSpan={6} />
//                     </TableRow>
//                   )}
//                 </TableBody>

//                 {isNotFound && (
//                   <TableBody>
//                     <TableRow>
//                       <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                         <Paper
//                           sx={{
//                             textAlign: 'center',
//                           }}
//                         >
//                           <Typography variant="h6" paragraph>
//                             Not found
//                           </Typography>

//                           <Typography variant="body2">
//                             No results found for &nbsp;
//                             <strong>&quot;{filterName}&quot;</strong>.
//                             <br /> Try checking for typos or using complete words.
//                           </Typography>
//                         </Paper>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 )}
//               </Table>
//             </TableContainer>
//           </Scrollbar>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={USERLIST.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Card>
//       </Container>

//       <Popover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: {
//             p: 1,
//             width: 140,
//             '& .MuiMenuItem-root': {
//               px: 1,
//               typography: 'body2',
//               borderRadius: 0.75,
//             },
//           },
//         }}
//       >
//         <MenuItem>
//           <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
//           Edit
//         </MenuItem>

//         <MenuItem sx={{ color: 'error.main' }}>
//           <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
//           Delete
//         </MenuItem>
//       </Popover>

//        {/* start modal from here */}
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={opens}
//         // onClose={handleClose}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             timeout: 500,
//           },
//         }}
//       >
//         <Fade in={opens}>
//           <Box sx={style}>
//             <Box
//                         display={'flex'}
//                         flexDirection={'column'}
//                         alignItems="center"
//                         justifyContent={'center'}
//                         margin='auto'
//                         maxWidth={540}
//                         // marginTop={5}
//                         //    padding={3}
//                         borderRadius={2}
//                         boxShadow={'5px 5px 10px #ccc'}
//                         sx={{
//                             ":hover": {
//                                 boxShadow: '10px 10px 20px #ccc'
//                             }
//                         }}
//                     >
//                         <Typography variant='h3'>Create New User </Typography>
//                         <Avatar sx={{width:100,height:100, marginTop:3}} alt="Travis Howard" src="../../assets/images/avatars/tree-736885_1280.jpg" />
//                         {/* <Button variant="contained" sx={{bgcolor:"#A084DD",":hover": {
//                                 bgcolor: '#A749FF'
//                             } , marginY:2, width:"72%"}}>UPDATE YOUR IMAGE</Button> */}
//                         <Box
//                         //    alignItems="center"
//                         //    justifyContent={'center'}
//                           >
//                    {/* <Typography>
//                     Name
//                    </Typography> */}
//                    <TextField id="outlined-basic" label="Name" variant="filled" type="text" sx={{width:"100%", marginY:2}}/>
//                    <TextField id="outlined-basic" label="Company" variant="filled" type="text" sx={{width:"100%", marginY:2}}/>

//                    <TextField id="outlined-basic" label="Role" variant="filled" type="text" sx={{width:"100%", marginY:2}}/>
//                    <TextField id="outlined-basic" label="Verified" variant="filled" type="text" sx={{width:"100%", marginY:2}}/>

//                    <TextField id="outlined-basic" label="Status" variant="filled" type="text" sx={{width:"100%", marginY:2}}/>
//                    {/* <TextField id="outlined-basic" label="Email" variant="filled" type="email" sx={{width:"100%", marginY:2}}/> */}
//                    <Button variant="contained" sx={{bgcolor:"#6610F2",":hover": {
//                                 bgcolor: '#6EAB49'
//                             } , marginY:2, width:"96%"}} onClick={handleClickUpdate}>UPDATE</Button>
//                    <Button variant="contained" sx={{bgcolor:"#6610F2",":hover": {
//                                 bgcolor: 'red'
//                             } , marginY:2, width:"96%"}} onClick={handleClickCancel}>
//                               {/* <CancelIcon/> */}
//                               CANCEL
//                               </Button>
//                         </Box>
//                     </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     </>
//   );
// }


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getRequestHandler } from '../apiHandler/customApiHandler';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function OrderList() {

  const [orderList, setOrderList] = React.useState()
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = React.useState('all');

  async function handleGetAllDataforUpdate() {
    try {
      const response = await getRequestHandler('https://marpapi.techanalyticaltd.com/admin/ordermanagement?page=1&items=10&deliveryStatus=queued');
      // Handle the response data
      setOrderList(response.data.orders)

    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  React.useEffect(() => {
    handleGetAllDataforUpdate()
  }, [])

  console.log("order response", orderList)

  return (
    <>
    {/* <Select
  value={selectedDeliveryStatus}
  onChange={(event) => setSelectedDeliveryStatus(event.target.value)}
>
  <MenuItem value="all">All</MenuItem>
  <MenuItem value="queued">Queued</MenuItem>
  <MenuItem value="in_progress">In Progress</MenuItem>
  <MenuItem value="completed">Completed</MenuItem>
</Select> */}
  <Box sx={{display:"flex", mb:"1rem"}}>
    
    <Box sx={{border:"1px solid #F4F6F8", backgroundColor:"#F4F6F8", borderRadius:1.1, p:".5rem", m:".5rem", cursor:"pointer", boxShadow: 3, '&:hover': { boxShadow: 4 }}} onClick={()=>{setSelectedDeliveryStatus("all")}}>Filter</Box>
    <Box sx={{border:"1px solid #F4F6F8", backgroundColor:"#F4F6F8", borderRadius:1.1, p:".5rem", m:".5rem", cursor:"pointer", boxShadow: 3, '&:hover': { boxShadow: 4 }}} onClick={()=>{setSelectedDeliveryStatus("queued")}}>Queued</Box>
    <Box sx={{border:"1px solid #F4F6F8", backgroundColor:"#F4F6F8", borderRadius:1.1, p:".5rem", m:".5rem", cursor:"pointer", boxShadow: 3, '&:hover': { boxShadow: 4 }}} onClick={()=>{setSelectedDeliveryStatus("in_progress")}}>In Progress</Box>
    <Box sx={{border:"1px solid #F4F6F8", backgroundColor:"#F4F6F8", borderRadius:1.1, p:".5rem", m:".5rem", cursor:"pointer", boxShadow: 3, '&:hover': { boxShadow: 4 }}} onClick={()=>{setSelectedDeliveryStatus("completed")}}>Completed</Box>
  </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Customer</TableCell>
            {/* <TableCell align="left">Vendor Name</TableCell> */}
            <TableCell align="left">Payment Status</TableCell>
            <TableCell align="left">Delivery Status</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {!orderList ?
            <></>
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
                    <Typography sx={{ display: 'flex',alignItems:"center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p:".2rem", bgcolor:"#F4F6F8" }}>
                    <span style={{ color: 'green', fontSize:"2rem", lineHeight: '0.35'}}>•</span>
                    {row.paymentStatus}
                  </Typography>
                  </TableCell>
                    :
                    <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p:".2rem", bgcolor:"#F4F6F8" }}><span style={{ color: 'red', fontSize:"2rem", lineHeight: '0.35'}}>•</span>{row.paymentStatus}</Typography></TableCell>
                  }
                   {row.deliveryStatus === "queued" ?
                  <TableCell align="left">
                    <Typography sx={{ display: 'flex',alignItems:"center", border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p:".2rem", bgcolor:"#F4F6F8",  }}>
                    <span style={{ color: 'red', fontSize:"2rem", lineHeight: '0.35'}}>•</span>
                    {row.deliveryStatus}
                  </Typography>
                  </TableCell>
                    :
                    <TableCell align="left"><Typography sx={{ display: 'inline-block', border: '1px solid #F4F6F8', borderRadius: 1, inlineSize: 'fit-content', p:".2rem", bgcolor:"#F4F6F8" }}><span style={{ color: 'red', fontSize:"2rem", lineHeight: '0.35'}}>•</span>{row.deliveryStatus}</Typography></TableCell>
                  }
                  {/* <TableCell align="left">{row.deliveryStatus}</TableCell> */}
                  <TableCell align="left">৳{row.totalAmount} BDT</TableCell>
                </TableRow>
              ))}
            </>}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}