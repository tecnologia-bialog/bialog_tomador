import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const DeleteConfirm = (props)=> {

    return (
          <div>
            <Dialog
              open={props.open}
              onClose={props.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">

              <DialogTitle id="alert-dialog-title">{"Remover Item"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                        Deseja remover o item selecionado ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>props.handleClose(false)} color="primary">
                        Cancelar
                </Button>
                <Button onClick={()=>props.removeItemSave()} color="primary" autoFocus>
                        Sim
                </Button>
              </DialogActions>
            </Dialog>
          </div>
    );

};



