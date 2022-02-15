import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Send from '@material-ui/icons/Send';
let relativeTime = require('dayjs/plugin/relativeTime')
import ScrollableFeed from 'react-scrollable-feed';
import dayjs from "dayjs";
dayjs.extend(relativeTime);
//
// https://github.com/dizco/react-scrollable-feed
//


const styles = theme => ({
      button: {
        margin: theme.spacing(1),
      },
      leftIcon: {
        marginRight:5,
      },
      rightIcon: {
        marginLeft: 5,
        fontSize:16 ,

      },
      iconSmall: {
        fontSize: 12,
      },
});



class ChatView extends React.PureComponent {

        constructor(props) {
            super(props);
            this.chats_div = React.createRef();
        }



       msg_format =(user,msg,createdAt)=>{

                return(
                        <div key={createdAt}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    <AccountCircle/>
                                    </Avatar>
                                </ListItemAvatar>
                             <ListItemText primary={user} secondary={dayjs(createdAt).fromNow()}/>
                             </ListItem>
                             <List component="div" disablePadding style={{marginTop:-20}}>
                                    <ListItem>
                                        <ListItemText inset primary={msg} />
                                    </ListItem>
                             </List>
                            <Divider/>
                       </div>
                )

        };

      list_chat = (chats)=>{

            return( chats.map((msg) =>  this.msg_format(
                msg.user,msg.msg,msg.createdAt))
            )

      };

      render(){

            return(
               <div style={{width: 400, height: 300, overflow: 'auto'}}  ref={this.chats_div} >
                <ScrollableFeed>
                        {this.list_chat(this.props.chats)}
                </ScrollableFeed>
               </div>
            )
      }

}



const DialogChat =(props)=> {

            let {open, handleClose, SendMsgChat, handleChange, item, text, chats,classes } = props;

            const _handleKeyPress = (e) => {
                    if (e.key === 'Enter') {
                            SendMsgChat(text)
                    }
              };


            return (
                <div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle id="alert-dialog-title" style={{background: 'rgb(245,245,245)', height: 80}}>
                            <IconButton style={{
                                height: 30,
                                width: 30,
                                background: 'white',
                                margin: 1,
                                position: 'relative',
                                top: -20,
                                right: -340
                            }}
                            onClick={() => handleClose(false)}><Close/>
                            </IconButton>
                            <div style={{position: 'relative', top: -40, right: 1}}>
                                <div>{item.id}</div>
                                <div style={{fontSize: 15}}>{item.tipo.label} || {dayjs(item.createdAt).fromNow()}</div>
                            </div>
                        </DialogTitle>
                        <ChatView  chats={chats}/>
                        <DialogActions style={{background: 'rgb(245,245,245)', margin: 0}}>
                            <TextField autoFocus onChange={handleChange} onKeyPress={_handleKeyPress}  margin="dense" label="mensagem" value={text}
                                       type="text" fullWidth/>
                            <Button onClick={() => SendMsgChat(text)} variant="contained" color="primary"
                                    className={classes.button}>
                                <Send/>
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );


}

export default withStyles(styles)(DialogChat);
