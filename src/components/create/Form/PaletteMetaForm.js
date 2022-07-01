import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import data from '@emoji-mart/data';
import { Picker } from 'emoji-mart';

function EmojiPicker(props) {
    const ref = useRef(true)
  
    useEffect(() => {
        if(ref.current) {
            new Picker({ ...props, data, ref })
            ref.current = false
        } else{
            return
        }
        
        /*
        //----> this  make emoji-mart rendering duplicate emoji pickers
        //---> because the React Strict mood
        const ref = useRef()
      
        useEffect(() => {
          new Picker({ ...props, data, ref })
        }, [props])
      
        return <div ref={ref} />
        */

    }, [props])
  
    return <div ref={ref} />
}

const PaletteMetaForm = (props) => {
    const { handleSubmitPalette, palettes, hideForm } = props
    const [stage, setStage] = useState('form');
    const [newPaletteName, setNewPaletteName] = useState('')

    useEffect(()=>{
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
          return palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          )
        });
    
    })

    const handleChangePaletteName = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    const showEmojiPicker = ()=>{
        setStage('emoji')
    }
    const savePalette = (emoji) => {
        // console.log(emoji)
        const newPalette = {
            paletteName: newPaletteName,
            emoji: emoji.native
        }
        handleSubmitPalette(newPalette)
        
    }

    return (
        <>
            <Dialog open={stage === 'emoji'} onClose={hideForm}>
            <DialogTitle>Choose a Palette Emoji</DialogTitle>
                <EmojiPicker 
                    onEmojiSelect={savePalette}
                    title='Pick a Palette Emoji'
                    style={{backgroundColor: 'white'}}
                 />
            </Dialog>
            <Dialog open={stage === 'form'} onClose={hideForm}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                           Please enter a name for your new beautiful palette. Make sure it's unique!
                        </DialogContentText>
                        <TextValidator
                            name='newPaletteName'
                            label="Palette Name"
                            variant='filled'
                            margin='normal'
                            fullWidth
                            value={newPaletteName}
                            onChange={handleChangePaletteName} 
                            validators={["required", "isPaletteNameUnique"]}  
                            errorMessages={["Enter Palette name", "Name already used!"]}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm}>Cancel</Button>
                        <Button variant='contained' color='primary' type='submit'>
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </>
    )
}

export default PaletteMetaForm