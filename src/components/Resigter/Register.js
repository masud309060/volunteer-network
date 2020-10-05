import React from 'react';
import './Register.css'
import logo from '../../volunteer-network-main/logos/Group 1329.png';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { userContext } from '../../App';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));


const Register = () => {
    const classes = useStyles();
    const {user, join} = React.useContext(userContext)
    const [loginUser, setLoginUser] = user;
    const [joinEvent, setJoinEvent] = join;

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleRegSubmit = () => {
        const description = document.getElementById('description').value;
        const UsersAllData = {...loginUser, date: selectedDate, description:description , event:joinEvent}
        fetch('https://enigmatic-meadow-20556.herokuapp.com/addVolunteer', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(UsersAllData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    return (
        <div>
            <div className="register-logo">
                <img src={logo} alt="" height="100"/>
            </div>
            <div className="form-area">
                <h2>Register as a volunteer</h2>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField required id="full-name" label="Full Name" value={loginUser.name}/>
                    <TextField required id="email" label="Username or Email" value={loginUser.email}/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </MuiPickersUtilsProvider>
                    <TextField required id="description" label="Description"/>
                    <TextField required id="event-name" label="Event Name" value={joinEvent.name} />
                    {
                        loginUser.isSignIn && 
                        <Link to="/events" style={{textDecoration:"none"}}>
                            <Button onClick={handleRegSubmit} style={{width: "432px"}} color="primary" variant="contained"> Register</Button>
                        </Link>
                    }
                </form>
            </div>
        </div>
    );
};

export default Register;