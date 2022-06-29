import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PaletteList from "./components/Palettes/PaletteList";
import Palette from "./components/Palette";
import seedColors from "./components/Colors/seedColors";
import SingleColorPalette from "./components/Palettes/SingleColorPalette";
import NewPaletteForm from "./components/create/NewPaletteForm";
// import { generatePalette } from './components/Colors/colorHelpers';


const App = () => {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
  const [palettes, setPalettes] = useState(savedPalettes || seedColors)


  const deletePalette = (id) => {
    const updatedPalettes = palettes.filter(palette => palette.id !== id)
    setPalettes(updatedPalettes);
    syncLocalStorage(updatedPalettes)
  }

  const savePalette = (newPalette) => {

    let newPalettes = [...palettes, newPalette] 
    /* this variable is made in case syncLocalStorage has executed before the state has changed and for avoiding that , i created this variable with latest palattes array and pass it to syncLocalStorage*/

    setPalettes([...palettes, newPalette])
    syncLocalStorage(newPalettes)
  }

  const syncLocalStorage = (palettes) => {
    //save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }



  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={palettes} deletePalette={deletePalette} />} />
      <Route path="/palette/new" element={<NewPaletteForm savePalette={savePalette} palettes={palettes} />} />
      <Route path="/palette/:id" element={<Palette palettes={palettes} />} />
      <Route path="/palette/:paletteId/:colorId" element={<SingleColorPalette palettes={palettes} />} />
    </Routes>
    // <div>
    //   <Palette  palette={generatePalette(seedColors[4])}/>
    // </div>
  );
}

export default App;
