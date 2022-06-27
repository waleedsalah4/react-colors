import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import { styled, useTheme } from '@mui/material/styles';
import { ChromePicker } from 'react-color';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {arrayMoveImmutable} from 'array-move';

const drawerWidth = 290;

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
  const [currColor, setCurrColor] = useState('teal');
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = useState('')
  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;

  useEffect(()=>{
    // console.log('run')
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
    
      return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
    });

    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return colors.every(
        ({color}) => color !== currColor
      )
    });

    

    // return function cleanUp() {
    //   ValidatorForm.removeValidationRule("isColorNameUnique");
    //   ValidatorForm.removeValidationRule("isColorUnique");
    // };

  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrColor = (newColor) => {
    setCurrColor(newColor.hex)
    // console.log(newColor)
  }

  const addNewColor = () => {
    const newColor = {
      color : currColor,
      name: newColorName,
    }
    setColors([...colors, newColor])
    setNewColorName('')
  }

  const handleChange = (evt) => {
    setNewColorName(evt.target.value)
  }

  const handleSubmitPalette = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-") ,
      colors: colors
    }
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
        <Typography variant='h5'>
            Design Your Palette
        </Typography>
        <div>
            <Button 
              variant='contained'
              color='secondary'
              onClick={clearColors}>Clear Palette</Button>
            <Button 
              variant='contained' 
              color='primary'
              onClick={addRondomColor}
              disabled={paletteIsFull}
            >
              Rondom Color
            </Button>
        </div>
        <ChromePicker 
            color={currColor} 
            onChangeComplete={updateCurrColor} 
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator 
            name='newColorName'
            onChange={handleChange} 
            validators={["required","isColorNameUnique", "isColorUnique"]}
            errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
            value={newColorName} 
          />
          <Button 
              variant='contained' 
              type='submit'
              color='primary' 
              disabled={paletteIsFull}
              style={{backgroundColor: paletteIsFull ? 'grey' : currColor}}
          >
              {paletteIsFull ? 'Palette Full' : 'ADD COLOR'}
          </Button>
        </ValidatorForm>

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
