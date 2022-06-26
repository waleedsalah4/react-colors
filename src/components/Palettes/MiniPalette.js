import React from 'react';
import classes from './MiniPalette.module.css';

function MiniPalette(props) {
  const { palette, handleClick } = props;
  const minColorsBoxes = palette.colors.map(color => (
    <div 
      key={color.name}
      className={classes.miniColor} 
      style={{backgroundColor: color.color}}
      ></div>
  ))
  return (
    <div className={classes.root} onClick={handleClick}>
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