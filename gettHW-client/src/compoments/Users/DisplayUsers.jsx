import React, { useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import CreateUser from './CreateUser';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        fontFamily: 'cursive',
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '90vh',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        minWidth: '90vw',
    }, 
  });

const DisplayUsers = () => {
    const classes = useStyles();
    const [users, setUsers] = useState(<CircularProgress sx={{marginRight: '5.5%'}}/>);


const setUsersList = () => {
    axios.get(`http://localhost:3000/users`)
        .then(res => {
            const usersInCards = res.data.map(user => (
                <UserCard 
                    userName={user.name} 
                    email={user.email} 
                    userId={user.id} 
                    refreshUsers={setUsersList}
                />
            ));
            setUsers(usersInCards);
        });
}

    useEffect(() => {
        setUsersList();
      },[]);

    return(
        <div className={classes.root}>
            <h1>
                Your users:
            </h1>
            <h2>
                Please select the user you would like to work on:
            </h2>
            <CreateUser refreshUsers={setUsersList}/>
            {users}
        </div>
    )
}

export default DisplayUsers;