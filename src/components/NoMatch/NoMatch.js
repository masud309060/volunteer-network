import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div>
            <div style={{textAlign:"center", margin:"auto auto"}}>
                <h2>No Match Data Found</h2>
                <h1 style={{color:"red"}}>Error 404!!! </h1>
                <Link to="/home" style={{textDecoration:"none"}}>
                    <Button variant="outlined" color="primary">Go to home page ?</Button>
                </Link>
            </div>
        </div>
    );
};

export default NoMatch;