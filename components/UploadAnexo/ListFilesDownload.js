import React, { Component } from "react";
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import DeleteIconButton from './DeleteIconButton';
import saveAs from 'file-saver';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import * as dayjs from "dayjs";
let relativeTime = require('dayjs/plugin/relativeTime');
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');
dayjs.extend(relativeTime);

//
// https://www.npmjs.com/package/file-saver
//

class ListFilesDownload extends Component {

     constructor(props) {
         super(props);
         this.state = {
             mode:'LIST',
             alias:'',
             error:false,
             loading:false,
             isDeleting:false,
             isUpdating:false,
             item:{}
         };
     }

    deleteOpen_ = (value, item)=>{
         this.setState({ item:item,mode: value ? 'DELETE':'LIST'});
         //this.props.deleteOpen(true, item);
    };

    editOpen_ = (value, item)=>{
        this.setState({ item:item,alias:item.alias,mode: value ? 'EDIT':'LIST',error:false});
         //console.log('editOpen :',item)
    };

    editConfirm_ = (item) =>{

         if (this.state.alias.length > 3){
             item.alias = this.state.alias;
             this.setState({ isUpdating:true,mode:'LIST' });
             this.props.updateRemoteFile(item);
             setTimeout(() => {this.setState({ isUpdating:false });}, 5000)
         }else{
             this.setState({ error:true});
         }
    };

    deleteConfirm_ = (item) =>{
         this.setState({ isDeleting:true,mode:'LIST' });
         this.props.deleteRemoteFile(item);
         setTimeout(() => {this.setState({ isDeleting:false });}, 5000)
    };

    fileDownload =(item)=>{

      // const item_slug = item.slug;
      // const file_name = item.name;
      //
      // const ref = 'anexos/'+item_slug+'/'+file_name;
      // let fileRef = storage.ref(ref);

        try{
           saveAs(item.url, item.name);
        }catch (e) {
            console.log('erro download anexo',e)
        }
    };

    handleChange=(event)=> {
        this.setState({alias:event.target.value});
    };

    render(){

         const {isDeleting,mode,alias,error} = this.state;
         const {item,index,admin} = this.props;

             if (mode === 'DELETE'){
                  return (
                         <ListItem key={item.id}>
                                     <ListItemText secondary={'Deseja apagar este ítem ?'}  color="secondary" />
                                     <ListItemSecondaryAction >
                                         <IconButton style={{color:'red'}}
                                                     aria-label="Cancelar" onClick={() => this.deleteOpen_(false, item)}>
                                          <Clear/>
                                         </IconButton>
                                         <IconButton  style={{color:'green'}}
                                                      aria-label="Confirmar" onClick={() => this.deleteConfirm_(item)}>
                                          <Done/>
                                         </IconButton>
                                    </ListItemSecondaryAction>
                          </ListItem>
                     )
             }

            if (mode === 'LIST'){
                  return (
                        <div style={{padding:5,marginBottom:2}}>
                             <FormGroup row key={index.id} style={{marginBottom:2}}>
                                 <FormControl style={{width:'60%',marginRight:5}}>
                                     <Typography variant="subtitle1" style={{fontSize:12 }}>
                                                           {item.alias}
                                     </Typography>
                                     <div style={{color: '#ff6f00',fontSize:10 }}>
                                        {dayjs.unix(item.createdAt).format('DD/MM/YYYY hh:mm:ss')}
                                     </div>
                                 </FormControl>
                                 {admin &&
                                 <FormControl
                                     style={{background: 'rgb(245,245,245)', width: 50, height: 50, marginRight: 2}}>
                                     <IconButton aria-label="Editar"
                                                 onClick={() => this.editOpen_(true, item)}>
                                         <EditIcon/>
                                     </IconButton>
                                 </FormControl>
                                 }
                                 {admin &&
                                 <FormControl
                                     style={{background: 'rgb(245,245,245)', width: 50, height: 50, marginRight: 2}}>
                                     <DeleteIconButton item={item}
                                                       deleteOpen={this.deleteOpen_}
                                                       isDeleting={isDeleting}
                                                       admin={admin}/>
                                 </FormControl>
                                 }
                                 <FormControl style={{background: 'rgb(245,245,245)', width: 50,height:50, marginRight: 2}}>
                                      <IconButton aria-label="Download"  onClick={() => this.fileDownload(item)}>
                                      <CloudDownload />
                                      </IconButton>
                                  </FormControl>
                             </FormGroup>
                          <Divider/>
                        </div>
                          )
             }
             if (mode === 'EDIT'){
                  return (
                         <ListItem key={item.id}>
                                    <FormControl margin="none" style={{padding:0,height:25,width:250,background:'rgb(245,245,245)'}}>
                                    <TextField error={error} name="alias" value={alias}  onChange={this.handleChange} />
                                    </FormControl>
                                    <ListItemSecondaryAction>
                                      <IconButton style={{color:'red'}}
                                                  aria-label="Cancelar"  onClick={() => this.editOpen_(false,item)}>
                                      <Clear/>
                                      </IconButton>
                                      <IconButton style={{color:'green'}}
                                                  aria-label="Confirmar" disabled={error}  onClick={() => this.editConfirm_(item)}>
                                      <Done/>
                                      </IconButton>
                                    </ListItemSecondaryAction>
                          </ListItem>
                     )
             }

    }
}

export default ListFilesDownload;
