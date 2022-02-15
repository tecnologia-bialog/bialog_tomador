import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";

const  DialogEdit  = (props)=> {


    let {item,open} = props;

    return (
           <div>
            <Dialog
                    style={{padding: 5}}
                    open={open}
                    onClose={props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Editar"}</DialogTitle>
                    <DialogContent>

                    <TextField autoFocus
                               onChange={props.handleChange}
                               margin="dense"
                               label="Item"
                               value={item}
                               type="text" fullWidth
                    />

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => props.handleClose(false)} variant="raised" color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => props.SaveItem(item)} variant="raised" color="primary" autoFocus>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
           </div>

    );

};

export default withStyles(styles)(DialogEdit);