import React, { useContext, useEffect, useState } from 'react';
import './RegisterList.css'
import logo from '../../volunteer-network-main/logos/Group 1329.png'
import { userContext } from '../../App';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import deleteIcon from '../../volunteer-network-main/logos/trash-2 9.png'
import cloudIcon from '../../volunteer-network-main/logos/cloud-upload-outline 1.png'
import plusIcon from '../../volunteer-network-main/logos/plus 1.png'
import { Button } from '@material-ui/core';
import moment from 'moment';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 17,
  },
  body: {
    fontSize: 16,
    padding: 10,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const RegisterList = () => {
    const classes = useStyles();
    const {user} = useContext(userContext)
    const [loginUser] = user
    const [volunteers, setVolunteers] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:5000/volunteers?email='+loginUser.email)
        .then(res => res.json())
        .then(data => setVolunteers(data))
    },[loginUser.email])

    return (
        <div>
            <div className="reg-bar">
                <img src={logo} alt="" height="60"/>
                <h3>Volunteer register list</h3>
            </div>
            <div className="reg-area">
                <div className="reg-area-left">
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <img src={cloudIcon} alt="" height="25"/> 
                        <h4 style={{color:"#00a8ff",marginLeft:"5px"}}> Volunteer registration list</h4>
                    </div>
                    <Button><img src={plusIcon} alt="" height="20"/> Add event</Button>
                </div>
                <div className="reg-area-right">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Email Id</StyledTableCell>
                            <StyledTableCell align="right">Registating Date</StyledTableCell>
                            <StyledTableCell align="right">Volunteer List</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {volunteers.map( (row , index) => (
                            <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{moment(row.date).subtract(10,'days').calendar()}</StyledTableCell>
                            <StyledTableCell align="right">{row.event.name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <img src={deleteIcon} alt="" className="deleteIcon"/>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default RegisterList;