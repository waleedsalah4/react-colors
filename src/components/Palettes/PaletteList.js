import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import classes from './PaletteList.module.css';

const PaletteList = (props) => {
  const { palettes } = props;
  const navigate = useNavigate()
  
  const goToPalette =(id) => {
    navigate(`/palette/${id}`)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to='/palette/new' className={classes.link}>Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette palette={palette} key={palette.id} handleClick={()=> goToPalette(palette.id)} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default PaletteList