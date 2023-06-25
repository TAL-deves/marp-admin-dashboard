import Backdrop from '@mui/material/Backdrop';
import { Circles } from 'react-loader-spinner'
import { useState } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
const [show, setShow] = useState(false);
const spinner = ({data}) => (
        <div>
            <h1>Spinner section</h1>
            setShow({!data})
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // eslint-disable-next-line no-restricted-globals
        open={open}
        // eslint-disable-next-line no-undef
        onClick={handleClose}>
      <Circles
  height="80"
  width="80"
  color="#c7eed8"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={show}
/></Backdrop>
        </div>
    );

export default spinner;