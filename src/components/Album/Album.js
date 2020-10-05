import { Card, CardActionArea, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";


const useStyles = makeStyles({
    root: {
      maxWidth: 300,
      margin: "10px",
      textAlign: "center",
      color: "white",
    },
    media: {
      height: 250,
      width: 300,
    },
  });

const Album = (props) => {
    const classes = useStyles();
    const color = props.color || green;
    const {name, img, _id} = props.events

    const {join} = useContext(userContext)
    const [joinEvent, setJoinEvent] = join

    const handleJoinEvent = (id) => {
      fetch('https://enigmatic-meadow-20556.herokuapp.com/getEvent/'+id)
      .then(res => res.json())
      .then(data => {
        setJoinEvent(data)
      })
      
    }
    
  return (
    <div className="album">
      <Link to={`/Register/${_id}`} onClick={() => handleJoinEvent(`${_id}`)} style={{textDecoration:"none"}} >
        <Card className={classes.root} style={{backgroundColor:`${color}`}}>
          <CardActionArea> 
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
            <CardContent>
              <p style={{fontSize: "16px"}}>{name}</p>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default Album;
