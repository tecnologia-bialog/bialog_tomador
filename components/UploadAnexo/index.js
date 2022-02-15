import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import {storage} from '../../helpers/firebase';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AttachFileOutlined from '@material-ui/icons/AttachFileOutlined';
import List from '@material-ui/core/List';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListFilesDownload from './ListFilesDownload';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";

//
// https://github.com/fris-fruitig/react-firebase-file-uploader
//


class index extends Component {

     constructor(props) {
         super(props);
         this.state = {
             ite:{},
             files: [],
             filename: "",
             isUploading: false,
             progress: 0,
             url: "",
             open: false,
         };
     }


  getFileExtension = (filename)=> {
         try{
             return filename.split('.').pop();
         }catch (e) {
             return '';
         }
    };


  handleChange = (value) => this.setState({ open: value});
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
  };

  handleUploadSuccess = filename => {

        const  {item} = this.props;
        const  storageDir = this.props.storageDir || 'anexos';
        const  item_slug = item.id;

        this.setState({ filename: filename, progress: 100, isUploading: false });

        storage.ref(storageDir+"/"+item_slug)
                .child(filename)
                .getDownloadURL()
                .then(url => {
                        this.setState({url: url});
                        let extension = this.getFileExtension(filename);
                        let file = {name: filename,
                                    alias:filename,
                                    url: url,
                                    extension:extension.toLowerCase()
                                    };

                        if (item.anexos){
                           item.anexos[file.name] = file;
                        }else{
                           item.anexos ={};
                           item.anexos[file.name] = file;
                        }

                        this.props.update(item);
                    }

                );
  };

  updateRemoteFile = (file) => {

        const  {item,model} = this.props;
        item.anexos[file.name] = file;

        try{
            this.props.update(item);
        }catch (e) {

        }

  };

  deleteRemoteFile=(file)=>{

      const {item} = this.props;
      const storageDir = this.props.storageDir || 'anexos';

      let anexos = item.anexos;
      delete anexos[file.name];
      item.anexos =anexos;

      const item_slug = item.id;
      const file_name = file.name;
      const ref = storageDir+'/'+item_slug+'/'+file_name;

      let fileRef = storage.ref(ref);
      this.props.update(item);

      fileRef.delete()
          .then(()=> {
           //  this.props.remove_anexo_action(model,item_id,file_id);
        }).catch(function(error) {

        });

  };

  rederItems = (list)=>{

         return list.map( (item,index )=>{

              return (
                        <ListFilesDownload key={index}
                                           item={item}
                                           index={index}
                                           admin={this.props.admin}
                                           updateRemoteFile={this.updateRemoteFile}
                                           deleteRemoteFile={this.deleteRemoteFile}/>
                      )

         });
  };

  ObjectToArray=(obj)=>{

        let array = [];
        try{
            array = Object.values(obj);
        }catch (e) {

        }
        return array;
  };

  render() {

       const  storageDir = this.props.storageDir || 'anexos';
       const  item = this.props.item || {};
       const  {isUploading,progress} = this.state;
       const disabled = this.props.disabled || false;
       const admin = this.props.admin || false;
       const  item_id = item.id || '';
       const  ref = storageDir+'/'+item_id;

       let anexos = this.ObjectToArray(item.anexos || {});

        return (
             <PopupState variant="popover"  popupId={item_id.toString()} key={item_id}>
                  {popupState => (
                    <React.Fragment>
                      <Button variant="outlined"
                              disabled={disabled}
                              size="small" style={{fontSize:12,height:40,marginTop:5,width:"100%"}}
                              {...bindTrigger(popupState)}>
                        <AttachFileOutlined/>
                          {!disabled &&
                          <React.Fragment>
                              <Typography variant="caption" align="left" color="primary">
                                    ({anexos.length}) Arquivos anexos
                              </Typography>
                          </React.Fragment>
                          }
                          {disabled &&
                            <div  style={{fontSize:10}}>
                                "Salve o projeto antes de fazer o upload"
                            </div>
                          }
                      </Button>

                      <Menu {...bindMenu(popupState)}>
                          <List style={{minHeight: 50}}>
                              {this.rederItems(anexos)}
                          </List>
                          {admin &&
                              <div style={{padding: 10, minWidth: 420, width: '100%', background: 'rgb(245,245,245)'}}>
                                  {isUploading === false &&
                                  <FileUploader
                                      accept="*/*"
                                      name="anexo"
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
                              </div>
                          }
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>

        );
  }
}

export default index;
