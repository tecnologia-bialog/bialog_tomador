import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export const Confirm = (props)=> {

    let text_confirm = props.text_confirm || 'Confirmar ?';
    let text_confirm_title = props.text_confirm_title || 'Confirmação';
    let full_text_confirm = props.full_text_confirm;

    return (
          <div>
            <Dialog
              open={props.open}
              onClose={props.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{text_confirm_title}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                       {text_confirm}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    {full_text_confirm && full_text_confirm}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>props.handleClose(false)} color="primary">
                        Cancelar
                </Button>
                <Button onClick={()=>props.confirm()} color="primary" autoFocus>
                        Sim
                </Button>
              </DialogActions>
            </Dialog>
          </div>
    );

};



