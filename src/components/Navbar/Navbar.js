import React, { useContext } from 'react';
import logo from '../../volunteer-network-main/logos/Group 1329.png'
import './Navbar.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const useStyles = makeStyles({
    btn1: {
    background: 'linear-gradient(45deg, #2980b9 30%, #0984e3 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 40,
    padding: '0 20px',
    marginLeft: '10px',
    textDecoration: "none",
  },
    btn2: {
    background: 'linear-gradient(45deg, #34495e 30%, #2c3e50 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 40,
    padding: '0 20px',
    marginLeft: '10px',
  },
});

const Navbar = () => {
    const classes = useStyles();
    const {user} = useContext(userContext)
    const [loginUser, setLoginUser] = user;


    return (
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt=""  height="50px"/>
                </div>
                <div className="navbar-nav">
                    <ul>
                        <li><Link to="/home" style={{textDecoration:"none"}}>Home</Link></li>
                        <li><Link to="/donation" style={{textDecoration:"none"}}>Donation</Link></li>
                        <li><Link to="/events" style={{textDecoration:"none"}}>Events</Link></li>
                        <li><Link to="/blogs" style={{textDecoration:"none"}}>Blog</Link></li>
                    </ul>
                        {
                            (window.location.pathname === "/events") && loginUser.isSignIn ?
                            <h4>{loginUser.name}</h4> :
                            <>
                            <Link to="/register" style={{textDecoration:"none"}}>
                                <Button className={classes.btn1}>Register</Button></Link>
                            
                            <Link to="/admin" style={{textDecoration:"none"}}>
                                <Button className={classes.btn2}>Admin</Button></Link>
                            </>
                        }
                </div>
            </div>
        </div>
    );
};

export default Navbar;