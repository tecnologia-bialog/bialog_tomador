import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import UploadImage from './UploadImage';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import {storage} from '../../helpers/firebase';

//
// https://github.com/fris-fruitig/react-firebase-file-uploader
//

class index extends Component {

  state = {
        avatar: "",
        isUploading: false,
        progress: 0,
        url: ""
  };

   deleteRemoteFile=(file,key)=>{

          const {obj,updateImages} = this.props;
          const obj_slug = obj.slug;
          const file_name = file.name;
          const ref = 'images/'+obj_slug+'/'+file_name;
          let imgs = obj['images'] || [];
          imgs.splice(key, 1);

          let fileRef = storage.ref(ref);
          fileRef.delete()
              .then(()=> {
            }).catch(function(error) {

            });
          this.props.updateImages(obj);
  };


  render() {

    const {obj,updateImages} = this.props;

    let imgs = obj['images'] || [];

    return (
      <div>
         <Grid container justifyContent="flex-start" alignItems="center" style={{padding: 10, background: 'rgb(245,245,245)'}}>
          <Grid item xs={2}>
             <UploadImage obj={obj}  updateImages={updateImages} />
          </Grid>
          <Grid item xs={10}>
               <Grid container  alignItems="center">
                {imgs.map((value,key) => (
                  <Grid key={value.name} item xs={2}>
                         <div style={{ height:25 , direction:"rtl",marginBottom:-25}}>
                            <IconButton onClick={()=> this.deleteRemoteFile(value,key)} color="primary" style={{padding:0}}>
                                <Close />
                            </IconButton>
                        </div>
                        <Paper style={{ height: 100,padding:5,overflow: 'hidden'}}>
                              <img alt="img" src={value.url} style={{maxHeight:90}} />
                        </Paper>
                  </Grid>
                ))}
               </Grid>
          </Grid>
         </Grid>
      </div>
    );
  }
}

export default index;
