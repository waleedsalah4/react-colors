import React from 'react';
import classes from './DraggableColorBox.module.css';

const DraggableColorBox = (props) => {
    const {color,name} = props
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            {name}
        </div>
    )
}

export default DraggableColorBox