import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Close } from '@mui/icons-material';

const USER_VALIDATE_CODE = {
    SUCCESS: 'SUCCESS',
    BAD_EMAIL: 'BAD_EMAIL',
    ID_ALREADY_CREATED: 'ID_ALREADY_CREATED',
    MISSED_PARAMETERS: 'MISSED_PARAMETERS'
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
   formDiscription: {
    marginBottom: '5%'
   },

   textFieldLabel:{
    width: "80%",
    paddingBottom: '5%',
    top: 5
    },

    itemInForm: {
        marginBottom: '5%'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    
    openDisplayButton: {
        marginLeft: '40%',
        borderRadius: "100%",
        width: "60%",
        marginBottom: '1% !important'
    },

    closeButton: {
      width: '10%',
      top: '2%'
    }
  });

const CreateUser = ({refreshUsers}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmails] = useState('');
    const [formReady, setFormReady] = useState(false);

    useEffect(() => {
      setFormReady(userName != '' && email != ''  ? true : false);
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const addUser = () => {
        axios.post('http://localhost:3000/add', {
            name: userName,
            email: email
        })
        .then((response) => {
            if (response.data.returnCode === USER_VALIDATE_CODE.SUCCESS) {
                handleClose();
                refreshUsers();
            }
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                const { returnCode } = error.response.data;

                switch (returnCode) {
                    case USER_VALIDATE_CODE.BAD_EMAIL:
                        alert('Invalid Email Address');
                        break;
                    case USER_VALIDATE_CODE.ID_ALREADY_CREATED:
                        alert('User already exists');
                        break;
                    case USER_VALIDATE_CODE.MISSED_PARAMETERS:
                        alert('Missing parameters');
                        break;
                    default:
                        alert('An error occurred');
                }
            }
        });
    };

    const setTextStates = (e) => {
        switch (e.target.id) {
          case 'userName':
            setUserName(e.target.value);
            break;
          case 'email':
            setEmails(e.target.value);
            break;
          default:
            break; 
      }
    }
  
    return (
      <div>
        <Button  variant="contained"  onClick={handleClickOpen} className={classes.openDisplayButton}>
          <AddIcon />
        </Button>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">

          <IconButton className={classes.closeButton} onClick={handleClose}>
              <Close/>
          </IconButton>
          
            <DialogTitle>{"Create a new user"}</DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                  <div className={classes.formDiscription}>
                      To create a new user please fill the information below:
                  </div>     
            </DialogContentText>
              <div className={classes.form}>
                    <span className={classes.itemInForm}>
                <TextField id="userName"  variant="standard"
                  label="User name"
                  InputLabelProps={{style : {color : 'black', fontSize: '1.3em'} }}
                    className = {classes.textFieldLabel}
                    onChange={(e) => setTextStates(e)}
                />
                </span>

                <span className={classes.itemInForm}>
                <TextField id="email"  variant="standard"
                  label="email"
                  className = {classes.textFieldLabel}
                  defaultValue={email}
                  onChange={(e) => setTextStates(e)}
                  InputLabelProps={{style : {color : 'black', fontSize: '1.3em'} }}
                />
                </span>
              </div>
              
            </DialogContent>
            <DialogActions>
              <Button disabled = {!formReady} onClick={addUser}>Create</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default CreateUser;