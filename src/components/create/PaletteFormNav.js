import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import classes from './PaletteFormNav.module.css';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const PaletteFormNav = (props) => {
    const {open, handleSubmitPalette, handleDrawerOpen, palettes} = props;
    const [newPaletteName, setNewPaletteName] = useState('')


    useEffect(()=>{
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
          return palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          )
        });
    
      })

    const handleChangePaletteName = (evt) => {
        setNewPaletteName(evt.target.value)
    }

 
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" color='default' open={open}>
              <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                  Create A Palette
                  </Typography>
              </Toolbar>
              <div className={classes.navBtns}>
                    <ValidatorForm onSubmit={()=> handleSubmitPalette(newPaletteName)}>
                      <TextValidator
                          name='newPaletteName'
                          label="Palette Name"
                          value={newPaletteName}
                          onChange={handleChangePaletteName} 
                          validators={["required", "isPaletteNameUnique"]}  
                          errorMessages={["Enter Palette name", "Name already used!"]}
                      />
                      <Button variant='contained' color='primary' type='submit'>
                          Save Palette
                      </Button>
                    </ValidatorForm>
                    <Link to='/'>
                        <Button variant='contained' color='secondary'>
                        Go Back
                        </Button>
                    </Link>
                  </div>
            </AppBar>
        </div>
    )
}

export default PaletteFormNav