import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { ChromePicker } from 'react-color';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
  const [colors, setColors] = useState([{name: 'blue', color: '#1611D7'}]);
  const [newColorName, setNewColorName] = useState('')
  const [newPaletteName, setNewPaletteName] = useState('')

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

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
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

  const handleChangePaletteName = (evt) => {
    setNewPaletteName(evt.target.value)
  }

  const handleSubmitPalette = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-") ,
      colors: colors
    }
    props.savePalette(newPalette)
    navigate('/')
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
      <CssBaseline />
      <AppBar position="fixed" color='default' open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
          <ValidatorForm onSubmit={handleSubmitPalette} style={{display: 'flex'}}>
            <TextValidator
              name='newPaletteName'
              label="Palette Name"
              value={newPaletteName}
              onChange={handleChangePaletteName} 
              validators={["required", "isPaletteNameUnique"]}  
              errorMessages={["Enter Palette name", "Name already used!"]}
            />
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </ValidatorForm>

        </Toolbar>
      </AppBar>
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
            <Button variant='contained' color='secondary'>Clear Palette</Button>
            <Button variant='contained' color='primary'>Rondom Color</Button>
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
              style={{backgroundColor: currColor}}
              // onClick={addNewColor}
          >
              ADD COLOR
          </Button>
        </ValidatorForm>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
       {/* body contebt */}
         <DraggableColorList 
          colors={colors} 
          removeColor={removeColor} 
          // axis='xy'
          // onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
}
