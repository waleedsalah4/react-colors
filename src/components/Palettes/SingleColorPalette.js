import React, {useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import seedColors from "../Colors/seedColors";
import { generatePalette } from '../Colors/colorHelpers';
import NavBar from '../navbar/NavBar';
import PaletteFooter from '../layout/PaletteFooter';
import ColorBox from '../ColorBox';
import classes from './SingleColorPalette.module.css';

const findPalette = (id) => {
    return seedColors.find(function(palette){
      return palette.id === id;
    })
}

const SingleColorPalette = (props) => {
    const params = useParams();
    const thePallete = generatePalette(findPalette(params.paletteId))
    const {paletteName, emoji} = thePallete;

    const [format, setFormat] = useState("hex")
 
    const changeFormat = (format)=> {
        setFormat(format)
    }

    const gatherShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;
        
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        //return all shades of given color
        return shades.slice(1)
    }
    const shades = gatherShades(thePallete, params.colorId)
    const colorBoxes = shades.map(color => (
        <ColorBox 
            key={color.name} 
            name={color.name} 
            background={color[format]} 
            showingFullPalette={false} 
        />
    ))
    return (
        <div className={classes.Palette}>
            <NavBar changeFormat={changeFormat} showingAllcolors={false} />
            <div className={classes.PaletteColors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${params.paletteId}`} className={classes.backButton}>Go Back</Link>
                </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
}

export default SingleColorPalette