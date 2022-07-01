import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ColorBox from './ColorBox';
import NavBar from '../navbar/NavBar';
// import seedColors from "./Colors/seedColors";
import { generatePalette } from '../Colors/colorHelpers';
import PaletteFooter from './PaletteFooter';
// import './Palette.css';
import classes from './Palette.module.css';


const Palette = (props)=> {
    const paramId = useParams();

    const findPaltte = (id) => {
        return props.palettes.find(function(palette){
          return palette.id === id;
        })
    }
    const thePallete = generatePalette(findPaltte(paramId.id))

    const {colors, paletteName, emoji, id} = thePallete;
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState('hex')

    const changeLevel = (newLevel) => {
        setLevel(newLevel)
        // console.log(newLevel)
    }

    const changeFormat = (format)=> {
        setFormat(format)
    }

    const colorBoxes = colors[level].map((color) => (
        <ColorBox 
            key={color.id} 
            background={color[format]} 
            name={color.name} 
            moreUrl={`/palette/${id}/${color.id}`}
            showingFullPalette={true}
        />
    ) )

    return (
        <div className={classes.Palette}>
            <NavBar 
                level={level} 
                changeLevel={changeLevel} 
                changeFormat={changeFormat} 
                showingAllColors={true}
            />
            <div className={classes.PaletteColors}>
                {colorBoxes}
            </div>
           <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
}
export default Palette;