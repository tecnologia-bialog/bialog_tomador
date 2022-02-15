import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";

const  DialogComment  = (props)=> {


    let {value,item,open,Confirm,handleClose,handleChange} = props;

    return (
           <div>
            <Dialog
                    style={{padding: 5}}
                    open={open}
                    onClose={props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Pausar Tarefa</DialogTitle>
                    <DialogContent>

                    <TextField autoFocus
                               onChange={handleChange}
                               multiline={true}
                               rows={5}
                               margin="dense"
                               label="observação"
                               value={value}
                               type="text" fullWidth
                    />

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => handleClose(false)} variant="raised" color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => Confirm(item)} variant="raised" color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
           </div>

    );

};

export default withStyles(styles)(DialogComment);