import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './DraggableColorBox.module.css';


const DraggableColorBox = SortableElement((props) => {
    const {handleClick,color,name} = props
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
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