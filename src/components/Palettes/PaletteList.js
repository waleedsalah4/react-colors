import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { blue, red } from '@mui/material/colors';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classes from './PaletteList.module.css';

const PaletteList = (props) => {
  const { palettes, deletePalette } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const nodeRef = React.useRef(null)
  const navigate = useNavigate()
  
  const goToPalette =(id) => {
    navigate(`/palette/${id}`)
  }

  const openDialog = (id) => {
    setOpenDeleteDialog(true)
    setDeletingId(id)
  }
  const closeDialog = () => {
    setOpenDeleteDialog(false)
    setDeletingId('id')
  }

  const handleDelete = () => {
    deletePalette(deletingId)
    closeDialog()
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to='/palette/new' className={classes.link}>Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition nodeRef={nodeRef} key={palette.id} classNames='fade' timeout={500}>
              <div ref={nodeRef}>
                <MiniPalette 
                    key={palette.id} 
                    id={palette.id}
                    palette={palette} 
                    handleClick={goToPalette}
                    // handleDelete={deletePalette}
                    openDialog={openDialog}
                />

              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
        <DialogTitle id="delete-dialog-title">
          Do you want to delete this Palette ?
        </DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>

          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>

        </List>
      </Dialog>
    </div>
  )
}

export default PaletteList