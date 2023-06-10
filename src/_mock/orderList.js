import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton,Tooltip, } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TuneIcon from '@mui/icons-material/Tune';
// eslint-disable-next-line import/no-unresolved
import { ExportToCsv } from 'export-to-csv'; 
// eslint-disable-next-line import/no-unresolved
// import Typography from 'src/theme/overrides/Typography';
import data from './dummyData';

// defining columns outside of the component is fine, is stable
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
    size: 120,
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    size: 120,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 300,
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },

];

const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const Example = () => {
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

//   const handleExportData = () => {
//     csvExporter.generateCsv(data);
//   };
  const handleApprove = () => {
    console.log("handleApprove");
  };
  const handleApprovedAll = () => {
    console.log("handleApprovedAll");
  };

  return (
  
    // <MaterialReactTable
    //   columns={columns}
    //   data={data}
    //   enableRowSelection
    //   positionToolbarAlertBanner="bottom"
    //   renderTopToolbarCustomActions={({ table }) => (
    //     <Box
    //       sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
    //     >
    //       <Button
    //         color="primary"
    //         // export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
    //         onClick={handleExportData}
    //         startIcon={<FileDownloadIcon />}
    //         variant="contained"
    //       >
    //         Export All Data
    //       </Button>
    //       <Button
    //         disabled={table.getPrePaginationRowModel().rows.length === 0}
    //         // export all rows, including from the next page, (still respects filtering and sorting)
    //         onClick={() =>
    //           handleExportRows(table.getPrePaginationRowModel().rows)
    //         }
    //         startIcon={<FileDownloadIcon />}
    //         variant="contained"
    //       >
    //         Export All Rows
    //       </Button>
    //       <Button
    //         disabled={table.getRowModel().rows.length === 0}
    //         // export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
    //         onClick={() => handleExportRows(table.getRowModel().rows)}
    //         startIcon={<FileDownloadIcon />}
    //         variant="contained"
    //       >
    //         Export Page Rows
    //       </Button>
    //       <Button
    //         disabled={
    //           !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
    //         }
    //         // only export selected rows
    //         onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
    //         startIcon={<FileDownloadIcon />}
    //         variant="contained"
    //       >
    //         Export Selected Rows
    //       </Button>
    //     </Box>
    //   )}
    // />
    <Box>
        {/* <Typography>Orders Drafts</Typography> */}
  <MaterialReactTable
  displayColumnDefOptions={{
    'mrt-row-actions': {
      muiTableHeadCellProps: {
        align: 'center',
      },
      size: 100,
    },
  }}
  columns={columns}
  data={data}
  initialState={{ density: 'compact',
  sorting: [
    {
      id: 'si',
      desc: true,
    }] }}
  // defaultSortBy={{ field: 'si', order: 'desc' }}
  // defaultSortOrder="ase"
  enableRowSelection={false}
  enableEditing
  positionToolbarAlertBanner="bottom"
  renderRowActions={({ row, table }) => (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      {/* <Tooltip arrow placement="right" title="Edit">
        <IconButton >
          <Edit />
          Edit
        </IconButton>
      </Tooltip> */}
      {/* <Button variant='contained' sx={{bgcolor:'primary.dark', color:'white'}} onClick={()=>{
        handleApprove(row)
      }}>Approved</Button> */}
    </Box>
  )}
  renderTopToolbarCustomActions={({ table }) => (
    <>
      <Box
        sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
      >
        <Button
         disabled={table.getPrePaginationRowModel().rows.length === 0}
          sx={{bgcolor:'white',":hover": {
            bgcolor: '#D8D8D8',
            color:"black"
        }, color:'gray'}}
          onClick={()=>handleApprovedAll(table.getPrePaginationRowModel().rows)}
          variant="contained">
            <TuneIcon/>
          filter
        </Button>
        <Button
         disabled={table.getPrePaginationRowModel().rows.length === 0}
         sx={{bgcolor:'white',":hover": {
            bgcolor: '#1E91CF',
            color:"white"
        }, color:'black'}}
          onClick={()=>handleApprovedAll(table.getPrePaginationRowModel().rows)}
          variant="contained">
          Shipped
        </Button>
        <Button
         disabled={table.getPrePaginationRowModel().rows.length === 0}
         sx={{bgcolor:'white',":hover": {
            bgcolor: '#F3A638',
            color:"white"
        }, color:'black'}}
          onClick={()=>handleApprovedAll(table.getPrePaginationRowModel().rows)}
          variant="contained">
          Pending
        </Button>
        <Button
         disabled={table.getPrePaginationRowModel().rows.length === 0}
         sx={{bgcolor:'white',":hover": {
            bgcolor: '#54B7D3',
            color:"white"
        }, color:'gray'}}
          onClick={()=>handleApprovedAll(table.getPrePaginationRowModel().rows)}
          variant="contained">
          Processing
        </Button>
      </Box>
    </>
  )}
/>
</Box>
  );
};

export default Example;
