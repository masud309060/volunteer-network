import React, { useContext, useEffect, useState } from 'react';
import './RegisterList.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import deleteIcon from '../../volunteer-network-main/logos/trash-2 9.png'
import moment from 'moment';
import { userContext } from '../../App';

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
    // dataLoad 
    const {user} = useContext(userContext)
    const [loginUser] = user
    const [volunteers, setVolunteers] = useState([])
    
    const loadAllVolunteers = () =>{
      fetch('https://enigmatic-meadow-20556.herokuapp.com/volunteers?email='+loginUser.email)
      .then(res => res.json())
      .then(data => setVolunteers(data))
    }

    useEffect(() => {
        loadAllVolunteers()
    },[volunteers.length])

    const handleDeleteVolunteers = (id) => {
      fetch(`https://enigmatic-meadow-20556.herokuapp.com/deleteVolunteers/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data){
            loadAllVolunteers()
          }
        })
    }

    return (
        <div>
            <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>SL</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Email Id</StyledTableCell>
                            <StyledTableCell align="left">Registating Date</StyledTableCell>
                            <StyledTableCell align="left">Volunteer List</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {volunteers.map( (row , index) => (
                            <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.email}</StyledTableCell>
                            <StyledTableCell align="left">{moment(row.date).subtract(10,'days').calendar()}</StyledTableCell>
                            <StyledTableCell align="left">{row.event.name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <span onClick={()=>handleDeleteVolunteers(`${row._id}`)}>
                                  <img src={deleteIcon} alt="" className="deleteIcon"/>
                                </span>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
        </div>
    );
};

export default RegisterList;