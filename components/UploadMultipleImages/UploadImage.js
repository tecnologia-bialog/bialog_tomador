import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import {storage} from '../../helpers/firebase';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

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

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
  };
  handleUploadSuccess = filename => {

        const {obj} = this.props;
        let obj_slug = obj.slug;
        let ref = 'images/'+obj_slug;

        this.setState({ avatar: filename, progress: 100, isUploading: false });
            storage.ref(ref)
                    .child(filename)
                    .getDownloadURL()
                    .then(url => {
                            this.setState({url: url});
                            let file = {name: filename, url: url};
                            try{
                                 obj['images'].push(file);
                            }catch (e) {
                                 obj['images'] = [];
                                 obj['images'].push(file);
                            }

                            this.props.updateImages(obj);
                        }

                    );
  };

   deleteRemoteFile=(file)=>{

          const {obj} = this.props;
          const obj_slug = obj.slug;
          const file_name = file.name;
          const ref = 'images/'+obj_slug+'/'+file_name;
          let fileRef = storage.ref(ref);

          fileRef.delete()
              .then(()=> {
                // this.props.remove_anexo_action(item_id,file_id);
            }).catch(function(error) {

            });
  };


  render() {

    const {obj} = this.props;
    const {maxHeight,maxWidth} = this.props || {maxHeight:200,maxWidth:800};
    const {isUploading,progress,url} = this.state;

    let slug = obj.slug;
    let ref = 'images/'+slug;

    return (
      <div>
         <Grid container space="8" alignItems="center" style={{padding: 10, background: 'rgb(245,245,245)'}}>
          <Grid item xs={12}>
              {isUploading === false &&
              <FileUploader
                  accept="image/*"
                  name="avatar"
                  maxHeight={maxHeight}
                  maxWidth={maxWidth}
                  //filename={file => 'image_' + file.name.split('.')[1]}
                  randomizeFilename
                  storageRef={storage.ref(ref)}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
              />
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
      </div>
    );
  }
}

export default index;