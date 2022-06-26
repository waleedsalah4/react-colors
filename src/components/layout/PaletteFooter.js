import React from 'react'
import classes from './PaletteFooter.module.css'
function PaletteFooter(props) {
    const {paletteName, emoji} = props;
    return (
        <footer className={classes.PaletteFooter}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

export default PaletteFooter