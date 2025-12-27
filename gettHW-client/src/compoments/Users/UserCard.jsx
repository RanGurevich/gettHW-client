import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Email } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

const useStyles = makeStyles({
    cardRoot: {
        marginLeft: '15vw',
        marginBottom: '1%',
        width: '60vw'
        
    },
    cardInfo: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    userInfo:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});

const UserCard = ({userId, userName, email, refreshUsers}) => {

    const classes = useStyles();

    const USER_DELETE_CODE = Object.freeze({
    DELETED: 'DELETED',
    NOT_FOUND: 'NOT_FOUND',
    MISSED_PARAMETERS: 'MISSED_PARAMETERS'
});
    
const handleDeleteUser = () => {
    axios.delete(`http://localhost:3000/users/${userId}`)
        .then((response) => {
            if (response.data.returnCode === USER_DELETE_CODE.DELETED) {
                refreshUsers();
            }
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                const { returnCode } = error.response.data;

                switch (returnCode) {
                    case USER_DELETE_CODE.NOT_FOUND:
                        alert('Error: User ID not found.');
                        break;
                    case USER_DELETE_CODE.MISSED_PARAMETERS:
                        alert('Error: Missing ID parameter.');
                        break;
                    default:
                    alert('An unknown error occurred during deletion.');
                    console.log(error.data)

                }
            }
        });
};

    return (
        <div className={classes.cardRoot}>
        <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Typography component="span">{userName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.cardInfo}>
                        <div className={classes.userInfo}>
                            <div>
                                <PersonIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    user name: {userName}
                            </div>
                            <div>
                                <Email sx={{color: 'blue', marginRight: '10px'}}/>
                                    email: {email} 
                            </div>
                            <div>
                                <BadgeIcon sx={{color: 'blue', marginRight: '10px'}}/>
                                    user id: {userId}
                            </div>

                        </div>
                            <div>
                                <IconButton onClick={handleDeleteUser}>
                                    <DeleteIcon sx={{color: 'red'}}/>
                                </IconButton>
                            </div>
                    </div>
            
                </AccordionDetails>
        </Accordion>
        </div>
    )
}

export default UserCard;