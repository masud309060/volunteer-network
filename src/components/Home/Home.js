import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Album from '../Album/Album';
import SearchBox from '../SearchBox/SearchBox';
import Navbar from '../Navbar/Navbar';
import { userContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: "-150px"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


const Home = () => {
    const classes = useStyles()
    const {allEvents} = useContext(userContext)
    const [events, setEvents] = allEvents
    // console.log(events)

    const colorSheet = ["#d35400","#8e44ad", "#9b59b6","#2ecc71", "#8c7ae6","#273c75","#d35400","#8e44ad", "#9b59b6","#2ecc71", "#8c7ae6","#273c75","#d35400","#8e44ad", "#9b59b6","#2ecc71", "#8c7ae6","#273c75","#8c7ae6","#d35400","#273c75","#8c7ae6","#273c75","#8c7ae6","#273c75"]
    
    return (
        <div>
            <Navbar></Navbar>
            <SearchBox></SearchBox>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    item xs={12}>
                        {
                            events.map((data, index) => 
                                <Album events={data} color={colorSheet[index]} key={index}>
                                </Album>)          
                        }
                    </Grid>
                </Grid>
            </div> 
        </div>
    );
};

export default Home;