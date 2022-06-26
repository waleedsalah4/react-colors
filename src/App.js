import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PaletteList from "./components/Palettes/PaletteList";
import Palette from "./components/Palette";
import seedColors from "./components/Colors/seedColors";
import SingleColorPalette from "./components/Palettes/SingleColorPalette";
import NewPaletteForm from "./components/create/NewPaletteForm";
// import { generatePalette } from './components/Colors/colorHelpers';


const App = () => {
  const [palettes, setPalettes] = useState(seedColors)
  // const findPaltte = (id) => {
  //   return seedColors.find(function(palette){
  //     return palette.id === id;
  //   })
  // }
  const savePalette = (newPalette) => {
    // console.log(newPalette)
    setPalettes([...palettes, newPalette])
  }

  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={palettes} />} />
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
