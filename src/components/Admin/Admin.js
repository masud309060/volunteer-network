import React, { useState } from 'react';
import './Admin.css'
import logo from '../../volunteer-network-main/logos/Group 1329.png'
import cloudIcon from '../../volunteer-network-main/logos/cloud-upload-outline 1.png'
import plusIcon from '../../volunteer-network-main/logos/plus 1.png'
import { Button } from '@material-ui/core';
import RegisterList from '../RegisterList/RegisterList';
import AddEvent from '../AddEvent/AddEvent';

const Admin = () => {
  const [addEvent, setAddEvent] = useState(false)
    
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
                        <h4 style={{color:"#333",marginLeft:"5px"}}> Volunteer registration list</h4>
                    </div>
                    <Button onClick={() => setAddEvent(!addEvent)} style={{color:"#00a8ff",border:"1px solid #00a8ff"}}>
                      <img src={plusIcon} alt="" height="20"/> Add event</Button>
                </div>
                <div className="reg-area-right">
                    {
                      addEvent? <AddEvent></AddEvent> : 
                                <RegisterList></RegisterList>
                    }
                </div>
            </div>
        </div>
    );
};

export default Admin;