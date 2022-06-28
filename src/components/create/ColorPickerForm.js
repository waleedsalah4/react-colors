import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import classes from './ColorPickerForm.module.css'

const ColorPickerForm = (props) => {
    const {paletteIsFull, addNewColor, colors} = props;
    const [currColor, setCurrColor] = useState('teal');
    const [newColorName, setNewColorName] = useState('')



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

    const updateCurrColor = (newColor) => {
        setCurrColor(newColor.hex)
        // console.log(newColor)
    }
    const handleChange = (evt) => {
        setNewColorName(evt.target.value)
    }

    const handleSubmit = () => {
        const newColor = {
            color : currColor,
            name: newColorName,
        }
        addNewColor(newColor)
        setNewColorName('')
    }

    return (
        <>
            <ChromePicker 
                color={currColor} 
                onChangeComplete={updateCurrColor}
                className={classes.picker} 
            />
            <ValidatorForm onSubmit={handleSubmit} className={classes.colorNameForm}>
                <TextValidator 
                    name='newColorName'
                    variant='filled'
                    margin='normal'
                    placeholder='Color Name'
                    className={classes.colorNameInput}
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
                    className={classes.addColor}
                    style={{backgroundColor: paletteIsFull ? 'grey' : currColor}}
                >
                    {paletteIsFull ? 'Palette Full' : 'ADD COLOR'}
                </Button>
            </ValidatorForm>

        </>
    )
}

export default ColorPickerForm