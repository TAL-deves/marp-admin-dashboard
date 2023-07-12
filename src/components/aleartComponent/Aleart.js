import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Aleart = (p) => {
// console.log("props ", p);
// const {open}=p;
// console.log("opens ", open);
    const [opens, setOpens] = React.useState(true);

    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
  
    const handleDisagree = () => {
      setOpens(false);
    };
    const handleAgree = () => {
      setOpens(false);
    };

    return (
        <div>
              {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={opens}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"If you want to delete category?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
      Then press Agree button other ways Disagree button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
};

export default Aleart;