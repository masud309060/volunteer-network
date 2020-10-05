import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Events.css'
import { Button } from '@material-ui/core';
import { userContext } from '../../App';
import moment from 'moment';


const Events = () => {
    const [volunteer, setVolunteer] = useState([])
    const {user} = useContext(userContext)
    const [userLogin, setLoginUser] = user;

    const loadVolunteer = () => {
            fetch('http://localhost:5000/volunteer?email='+userLogin.email)
            .then(res => res.json())
            .then(data => {
                setVolunteer(data)
            })
    }

    useEffect(()=> {
        loadVolunteer()
    },[userLogin.email])

    const handlaDeleteVolunteer = (id) =>{
        fetch(`http://localhost:5000/deleteVolunteer/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                loadVolunteer()
            }
        })
    }
    return (
        <div>
            <Navbar></Navbar>

            <div style={{display:"flex",flexWrap:"wrap",margin:"10px", justifyContent:"center"}}>
            {
                volunteer.map(data =>
                    <div className="event-area" key={data._id} >
                        <div className="event-img">
                            <img src={data.event.img} alt=""/>
                        </div>
                        <div className="event-info">
                            <div>
                                <h2>{data.event.name}</h2>
                                <h3>{moment(data.date).format("MMM Do YYYY")}</h3>
                            </div>
                            <div style={{marginLeft: "150px"}}>
                                <Button onClick={() => handlaDeleteVolunteer(`${data._id}`)} 
                                        variant='contained' color="default">Cencel</Button>
                            </div>
                        </div>
                    </div>)
            }
            </div>
        </div>
    );
};

export default Events;