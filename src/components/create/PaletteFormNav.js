import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import PaletteMetaForm from './Form/PaletteMetaForm';
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
    alignItems: 'center',
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
  const [formShowing, setFormShowing] = useState(false)
  
  const showForm = () => {
    setFormShowing(true)
  }
  const hideForm = () => {
    setFormShowing(false)
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
                <Link to='/' className={classes.link}>
                  <Button variant='contained' color='secondary' className={classes.button}>
                    Go Back
                  </Button>
                </Link>
                <Button variant="contained" color='primary' onClick={showForm} className={classes.button}>
                  Save
                </Button>
              </div>
            </AppBar>
            {formShowing && <PaletteMetaForm palettes={palettes} handleSubmitPalette={handleSubmitPalette} hideForm={hideForm} />}
        </div>
    )
}

export default PaletteFormNav