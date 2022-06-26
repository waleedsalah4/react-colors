import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import classes from "./Navbar.module.css";


const NavBar = (props) => {
    const {level, changeLevel, changeFormat, showingAllColors} = props;
    const [format, setFormat] = useState("hex")
    const [open, setOpen] = useState(false)

    const closeSnackbar = () => {
        setOpen(false)
    }

    const handleChangeFormat = async(e)=>{
        setFormat(e.target.value)
        changeFormat(e.target.value)
        setOpen(true)
    }
  return (
    <header className={classes.Navbar}>
        <div className={classes.logo}>
            <Link to='/'>reactcolorpicker</Link>
        </div>
        {showingAllColors && (
            <div>
                <span>Level: {level}</span>
                <div className={classes.slider}>
                    <Slider 
                        defaultValue={level} 
                        min={100} max={900} 
                        step={100} 
                        onAfterChange={changeLevel} 
                    />
                </div>
            </div>
        )}
        <div className={classes.selectContainer}>
            <Select value={format} onChange={handleChangeFormat}>
                <MenuItem value="hex">HEX - #ffffff</MenuItem>
                <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
            </Select>
        </div>

        <Snackbar 
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={open} 
            autoHideDuration={3000} 
            message={<span id='message-id'>Format Changed To {format.toUpperCase()}</span>}
            ContentProps={{
                "aria-describedby": "message-id"
            }} 
            onClose={closeSnackbar}
            action={[
                <IconButton onClick={closeSnackbar} color='inherit' key='close' aria-label='close'>
                    <CloseIcon />
                </IconButton>
            ]}
        />
    </header>
  )
}

export default NavBar