import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

export default function DialogBox() {
  const [open, setOpen] = React.useState(false);
  const [ num, setNum ] = React.useState(0);
    const navigate = useNavigate();

    const handleSubmit = ()=>{
        navigate(`/create/?questions=${num}`)
    }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Quiz
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How many MCQ's do you want
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="qustions"
            label="Questions"
            type="number"
            fullWidth
            variant="standard"
            value={num}
            onChange={(event) => {
                setNum(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}