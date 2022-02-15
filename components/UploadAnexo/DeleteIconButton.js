import React, { Component } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';


class DeleteIconButton extends Component {


    deleteOpen_ =(value, item)=>{
         this.props.deleteOpen(true, item);
    };

    render(){

         const {item,isDeleting,admin} = this.props;

         if (isDeleting) {
             return (
                 <div style={{padding:10}}>
                     <CircularProgress disableShrink style={{color:'red'}} size={30}/>
                 </div>
             )
         }else{
              return (
                  <IconButton aria-label="Delete" onClick={() => this.deleteOpen_(true, item)} disabled={admin === false} >
                      <DeleteIcon/>
                  </IconButton>

              )
          }

    }
}

export default DeleteIconButton;