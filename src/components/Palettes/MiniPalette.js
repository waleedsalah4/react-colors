import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './MiniPalette.module.css';

function MiniPalette(props) {
  const { palette, handleClick, openDialog } = props;

  const deletePalette = (e) => {
    e.stopPropagation();
    openDialog(props.id)
  }


  const minColorsBoxes = palette.colors.map(color => (
    <div 
      key={color.name}
      className={classes.miniColor} 
      style={{backgroundColor: color.color}}
      ></div>
  ))
  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon 
        className={classes.deleteIcon} 
        sx={{ fontSize: 33 }} 
        style={{transition: 'all 0.3s ease-in-out'}}
        onClick={deletePalette}
      />

      <div className={classes.colors}>
        {minColorsBoxes}
      </div>
      <h5 className={classes.title}>
        {palette.paletteName}
        <span className={classes.emoji}>{palette.emoji}</span>
      </h5>
    </div>
  )
}

export default MiniPalette