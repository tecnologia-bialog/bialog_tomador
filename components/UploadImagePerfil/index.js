import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import {storage} from '../../helpers/firebase';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';
import get from 'lodash/get';
import head from 'lodash/head';

//
// https://github.com/fris-fruitig/react-firebase-file-uploader
//

class index extends Component {

  state = {
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: ""
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
  };
  handleUploadSuccess = filename => {

    const {user} = this.props;

    let user_slug = get(user,'uid','');
    let ref = 'profiles/'+user_slug;

    this.setState({ avatar: filename, progress: 100, isUploading: false });
        storage.ref(ref)
                .child(filename)
                .getDownloadURL()
                .then(url => {
                        this.setState({url: url});
                        let file = {name: filename, url: url};
                        this.props.UpdateImageProfile(user,file);
                    }

                );
  };

   deleteRemoteFile=(file)=>{

      const {user}      = this.props;
      let user_slug     = get(user,'uid','');
      const file_name   = file.name;
      const ref         = 'profiles/'+user_slug+'/'+file_name;
      let fileRef       = storage.ref(ref);

      fileRef.delete()
          .then(()=> {
            // this.props.remove_anexo_action(item_id,file_id);
        }).catch(function(error) {

        });

  };

  render() {

    const {user} = this.props;
    const {avatarURL,isUploading,progress} = this.state;

    let slug    = get(user,'uid','');
    let image_profile = get(user,'image_profile',false);
    let size    = get(this.props,'size',35)
    let color   = get(this.props,'color','steelblue')
    let ref     = 'profiles/'+slug;

    return (
      <div>
         <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
               <Grid container
                      alignItems="center" justifyContent={"center"} spacing={0}>
              {image_profile &&
              <Avatar style={{width: size, height: size,alignSelf:"center"}}
                      alt="Perfil" src={user.image_profile}/>
              }
              {!image_profile &&
              <Avatar alt="Perfil" style={{width: size, height: size,alignSelf:"center"}}>
                  <AccountCircle />
              </Avatar>
              }
             </Grid>
          </Grid>
          <Grid item xs={12}>
               <Grid container
                     style={{marginTop:10}}
                     alignItems="center"
                     justifyContent={"center"}
                     spacing={0}>
               {isUploading === false &&
                      <label style={{ backgroundColor: color,
                                      color: 'white',
                                      fontStyle:"bold",
                                      fontSize:13,
                                      padding: 5,
                                      borderRadius: 4,
                                      cursor: 'pointer'}}>
                      ENVIAR FOTO
                      <FileUploader
                          hidden
                          accept="image/*"
                          name="avatar"
                          maxHeight="100"
                          maxWidth="100"
                          filename={file => 'avatar' + file.name.split('.')[1]}
                          storageRef={storage.ref(ref)}
                          onUploadStart={this.handleUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleUploadSuccess}
                          onProgress={this.handleProgress}
                      />
                      </label>
              }
              {isUploading === true &&
                  <div>
                        <LinearProgress color="primary"
                                        value={progress}
                                        valueBuffer={progress}
                        />
                  </div>
              }
             </Grid>
          </Grid>
         </Grid>
      </div>
    );
  }
}

export default index;
