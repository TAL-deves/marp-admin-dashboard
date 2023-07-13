import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Circles } from 'react-loader-spinner';

export default function SimpleBackdrop(show) {
  // const [open, setOpen] = React.useState(false);
  // const [show, setShow] = React.useState(true)
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <Box>
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
    </Box>
  );
}