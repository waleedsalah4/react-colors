import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import {arrayMoveImmutable} from 'array-move';
import classes from './NewPaletteForm.module.css'

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NewPaletteForm(props) {
  const theme = useTheme();
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(props.palettes[0].colors);
  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  

  const addNewColor = (newColor) => {
    setColors([...colors, newColor])
    
  }

  

  const handleSubmitPalette = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-") 
    newPalette.colors = colors
    // const newPalette = {
    //   paletteName: newPaletteName,
    //   id: newPaletteName.toLowerCase().replace(/ /g, "-") ,
    //   colors: colors
    // }
    props.savePalette(newPalette)
    navigate('/')
}

  const clearColors = () => {
    setColors([])
  }
  const addRondomColor = () => {
    //pick rondom color from existing palettes
    const allColors = props.palettes.map(p => p.colors).flat()
    //flat=> put all colors arrays in one array
    var rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    setColors([...colors, randomColor])
  }



  const removeColor =(colorName) =>{
    console.log('delet')
    let filterColors = colors.filter(color => color.name !== colorName)
    setColors(filterColors)
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    let newColorsIndex = arrayMoveImmutable(colors, oldIndex, newIndex)
    setColors(newColorsIndex)
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav 
        open={open}
        palettes={props.palettes}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmitPalette={handleSubmitPalette}
      />
      <Drawer
        className={classes.drawerPaper}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
       {/* sidebar content */}
       <div className={classes.container}>
          <Typography variant='h5' gutterBottom>
              Design Your Palette
          </Typography>
          <div className={classes.buttons}>
              <Button 
                variant='contained'
                color='secondary'
                className={classes.button}
                onClick={clearColors}
                >Clear Palette</Button>
              <Button 
                variant='contained' 
                color='primary'
                className={classes.button}
                onClick={addRondomColor}
                disabled={paletteIsFull}
              >
                Rondom Color
              </Button>
          </div>
          {/* color picker form */}
          <ColorPickerForm 
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          /> 
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
       {/* body contebt */}
         <DraggableColorList 
          colors={colors} 
          removeColor={removeColor} 
          axis='xy'
          onSortEnd={onSortEnd}
          distance={20}
        />
      </Main>
    </Box>
  );
}
