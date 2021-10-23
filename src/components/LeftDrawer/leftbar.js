import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import useStyles from './styles'; 
function LeftBar() {
    const classes = useStyles();
    
    return (
        <>
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
                
            <FormGroup>
                <Typography variant="h5" align="center"> Tablas </Typography>
                <FormControlLabel control={<Checkbox />} label="Clientes cuentas" />
                <FormControlLabel control={<Checkbox />} label="Valores" />
                <FormControlLabel control={<Checkbox />} label="Disabled" />
                <FormControlLabel control={<Checkbox />} label="Disabled" />
                <FormControlLabel control={<Checkbox />} label="Disabled" />
                <FormControlLabel control={<Checkbox />} label="Disabled" />
            </FormGroup>

            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Reflejar Cambios</Button>

            </form>
        </Paper>
        <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
            
        <FormGroup>
            <Typography variant="h5" align="center"> Tablas </Typography>
            <FormControlLabel control={<Checkbox />} label="Clientes cuentas" />
            <FormControlLabel control={<Checkbox />} label="Valores" />
            <FormControlLabel control={<Checkbox />} label="Disabled" />
            <FormControlLabel control={<Checkbox />} label="Disabled" />
            <FormControlLabel control={<Checkbox />} label="Disabled" />
            <FormControlLabel control={<Checkbox />} label="Disabled" />
        </FormGroup>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Reflejar Cambios</Button>

        </form>
    </Paper>
    </> 
    )
}

export default LeftBar;
