import React, { useState } from 'react';
import './AddEvent.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, TextareaAutosize } from '@material-ui/core';
import cloudIcon from '../../volunteer-network-main/logos/cloud-upload-outline 1.png'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

const AddEvent = () => {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const handleAddEvent = () => {
        const newEvent= {name: title, description: description, date: selectedDate, img: image}
        fetch('http://localhost:5000/addEvent',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newEvent)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert("Event Upload succesfully")
            }
        })
    }

    return (
        <div>
            <div className="addEvent-area">
                <div className="form-area">
                <form className={classes.root} onSubmit={handleAddEvent}>     
                    <div>
                        <TextField 
                        id="standard-basic" 
                        label="Standard" 
                        onBlur={e => setTitle(e.target.value)}
                        />
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
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                        <TextareaAutosize 
                        aria-label="minimum height" 
                        rowsMin={5}  
                        onBlur={e => setDescription(e.target.value)}
                        placeholder="Add description..." />
                        <label  className="file-upload"> <img src={cloudIcon} alt="" height="20"/>
                         Upload Image<input type="file" onInput={e=> setImage(e.target.value)}/></label>
                    </div>
                    </form>
                </div>
                    <Button 
                        onClick={handleAddEvent}
                        variant="contained" 
                        style={{backgroundColor:"#0984e3", float:"right",margin:"20px"}}>Send
                    </Button>
            </div>
        </div>
    );
};

export default AddEvent;