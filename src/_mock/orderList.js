import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { useTable } from 'react-table';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IosShareIcon from '@mui/icons-material/IosShare';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { isPlainObject } from 'lodash';
import OrderSearch from "../components/orderSearch/orderSearch";

const handleSearch=()=>{
  console.log("Search button");
  // <OrderSearch/>
}
function MyTable() {

  
  const data = [
    { order: '12165e58', date: "11-06-2023", customer: 'Hasan',vendorName:"default sales channels", paymentStatus:"cash on delivery",delivoryStatus:"shipped", total: 1000},
    { order: '12165e58', date: "11-06-2023", customer: 'AR Rahman',vendorName:"default sales channels", paymentStatus:"cash on delivery",delivoryStatus:"shipped", total: 1000},
    { order: '12165e58', date: "11-06-2023", customer: 'Orasur',vendorName:"default sales channels", paymentStatus:"cash on delivery",delivoryStatus:"shipped", total: 1000},
    { order: '12165e58', date: "11-06-2023", customer: 'Md Orasur Rahman',vendorName:"default sales channels", paymentStatus:"cash on delivery",delivoryStatus:"shipped", total: 1000}
  ];

  const columns = [
    { Header: 'Order', accessor: 'order' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Customer', accessor: 'customer' },
    { Header: 'Vendor name', accessor: 'vendorName' },
    { Header: 'Payment status', accessor: 'paymentStatus' },
    { Header: 'Delivory status', accessor: 'delivoryStatus' },
    { Header: 'Total', accessor: 'total' },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });



  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ padding: '2rem',}}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ padding: '2rem' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <div>
      <h1><FormatAlignLeftIcon/>Order List</h1>
      <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
        <Button
          sx={{bgcolor:'white',":hover": {
            bgcolor: '#D8D8D8',
            color:"black"
        }, color:'gray', margin:2}}
          variant="contained">
            <TuneIcon/>
          filter
        </Button>
        <Button
         sx={{bgcolor:'white',":hover": {
            bgcolor: '#1E91CF',
            color:"white"
        }, color:'black', margin:2}}
          variant="contained">
          Shipped
        </Button>
        <Button
         sx={{bgcolor:'white',":hover": {
            bgcolor: '#F3A638',
            color:"white"
        }, color:'black', margin:2}}
          variant="contained">
          Pending
        </Button>
        <Button
         sx={{bgcolor:'white',":hover": {
          bgcolor: '#1E91CF',
          color:"white"
      }, color:'black', margin:2}}
          variant="contained">
          Processing
        </Button>
        </Grid>
        <Grid item xs={12} sm={4} sx={{textAlign:"end", alignSelf:"end", padding:3}}>
        <Button
          sx={{bgcolor:'#6610F2',":hover": {
            bgcolor: '#6EAB49',
            color:"black"
        }, color:'white',margin:1}}
          variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button
         sx={{bgcolor:'#6610F2',":hover": {
            bgcolor: '#6EAB49',
            color:"black"
        }, color:'white'}}
          variant="contained">
            <IosShareIcon/>
          Export Order
        </Button>
        </Grid>
      </Grid>
      </Box>
      <MyTable />
    </div>
  );
}

export default App;
