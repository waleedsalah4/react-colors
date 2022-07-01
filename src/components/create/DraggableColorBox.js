import React from 'react';
import chroma from 'chroma-js';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './DraggableColorBox.module.css';


const DraggableColorBox = SortableElement((props) => {
    const {handleClick,color,name} = props;
    const isDarkColor = chroma(color).luminance() <= 0.08;
    
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={`${classes.boxContent} ${isDarkColor ? classes.light: classes.dark}`}>
            {/* <div className={classes.boxContent}> */}
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    )
})

// const DraggableColorBox = (props) => {
//     const {handleClick,color,name} = props
//     return (
//         <div className={classes.root} style={{backgroundColor: color}}>
//             <div className={classes.boxContent}>
//                 <span>{name}</span>
//                 <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
//             </div>
//         </div>
//     )
// }

export default DraggableColorBox