import React, {useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import SaveIcon from '@material-ui/icons/Save';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import Switch from '@material-ui/core/Switch';
import {useStyles} from '../../../theme/site/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {ObjectToArrayComplex} from '../../../utils/Utils'
import Email from '@material-ui/icons/Email';
import Typography from "@material-ui/core/Typography";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";


//
// https://libraries.io/npm/formik-material-ui
// https://github.com/stackworx/formik-material-ui
//



const settings_ = {

      email_news:true,
      email_new_job:true,
      email_new_msg:true,
      notification_new_msg:true,
      notification_new_job:true,
      sms_new_job:true,
      sms_new_msg:true,
      show_profile_to_business:true,
};


 const index = (props)=> {

            const {
                user,
                error,
                submit,
            } = props;

            const classes       = useStyles();
            const [checked,
                  setChecked]  = useState([]);
            let settings_obj    = {};
            let settings_list   = [ "email_news",
                                    "email_new_jobs",
                                    "notification_new_jobs",
                                    "notification_msg",
                                    "show_profile_to_business"];

            let settings        = get(user,'settings',settings_)

            const Save=()=>{
                let user_       = cloneDeep(user);
                user_.settings  = settings_obj
                submit(user_)
            }

            useEffect(() => {
                 let list = ObjectToArrayComplex(settings);
                 let list_out = [];
                 for (let value of list) {
                        if(value.value === true){
                        list_out.push(value.key);
                    }
                 }
                setChecked(list_out);
            }, [])

            const handleToggle = (value) => () => {
                const currentIndex = checked.indexOf(value);
                const newChecked = [...checked];
                if (currentIndex === -1) {
                    newChecked.push(value);
                } else {
                    newChecked.splice(currentIndex, 1);
                }
                setChecked(newChecked);
            };

            for(let i=0; i< settings_list.length; i++){
                settings_obj[settings_list[i]] = checked.indexOf(settings_list[i]) !== -1;
            }

            return (
                   <Card style={{marginTop:10,padding:15}} className={classes.form_white}>
                              <Typography variant="caption" align="left" gutterBottom>
                                          Configurações
                               </Typography>
                               <Typography variant="subtitle2"
                                                  color="textSecondary"
                                                  align="left" gutterBottom>
                                         Use as opções abaixo para configurar os tipos de
                                  mensagens que deseja receber.
                               </Typography>
                              <List>
                                <ListItem>
                                        <ListItemIcon>
                                          <Email />
                                        </ListItemIcon>
                                        <ListItemText
                                            id="switch-list-label-email-news"
                                            primary="Novidades/Promoções" />
                                          <ListItemSecondaryAction>
                                          <Switch
                                            edge="end"
                                            onChange={handleToggle('email_news')}
                                            checked={checked.indexOf('email_news') !== -1}
                                            inputProps={{ 'aria-labelledby': 'switch-list-label-email-news' }}
                                          />
                                        </ListItemSecondaryAction>
                                 </ListItem>
                                 <Divider variant="inset" component="li" />
                                 <ListItem>
                                        <ListItemIcon>
                                          <Email />
                                        </ListItemIcon>
                                        <ListItemText
                                            id="switch-list-label-email-jobs"
                                            primary="Novos Jobs" />
                                          <ListItemSecondaryAction>
                                          <Switch
                                            edge="end"
                                            onChange={handleToggle('email_new_jobs')}
                                            checked={checked.indexOf('email_new_jobs') !== -1}
                                            inputProps={{ 'aria-labelledby': 'switch-list-label-email-jobs' }}
                                          />
                                        </ListItemSecondaryAction>
                                 </ListItem>
                                 <Divider variant="inset" component="li" />
                                 <ListItem>
                                        <ListItemIcon>
                                          <Email />
                                        </ListItemIcon>
                                        <ListItemText
                                            id="switch-list-label-email-business"
                                            primary="Receber propostas de Emprego/Trabalhos" />
                                          <ListItemSecondaryAction>
                                          <Switch
                                            edge="end"
                                            onChange={handleToggle('show_profile_to_business')}
                                            checked={checked.indexOf('show_profile_to_business') !== -1}
                                            inputProps={{ 'aria-labelledby': 'switch-list-label-email-business' }}
                                          />
                                        </ListItemSecondaryAction>
                                 </ListItem>
                                  <Divider variant="inset" component="li" />
                                 <ListItem>
                                        <ListItemIcon>
                                          <NotificationsActive />
                                        </ListItemIcon>
                                        <ListItemText
                                            id="switch-list-label-notification-jobs"
                                            primary="Novos jobs" />
                                          <ListItemSecondaryAction>
                                          <Switch
                                            edge="end"
                                            onChange={handleToggle('notification_new_jobs')}
                                            checked={checked.indexOf('notification_new_jobs') !== -1}
                                            inputProps={{ 'aria-labelledby':'switch-list-label-notification-jobs' }}
                                          />
                                        </ListItemSecondaryAction>
                                 </ListItem>
                                 <Divider variant="inset" component="li" />
                                 <ListItem>
                                        <ListItemIcon>
                                          <NotificationsActive />
                                        </ListItemIcon>
                                        <ListItemText
                                            id="switch-list-label-notification-msg"
                                            primary="Mensagens de Clientes" />
                                          <ListItemSecondaryAction>
                                          <Switch
                                            edge="end"
                                            onChange={handleToggle('notification_msg')}
                                            checked={checked.indexOf('notification_msg') !== -1}
                                            inputProps={{ 'aria-labelledby': 'switch-list-label-notification-msg' }}
                                          />
                                        </ListItemSecondaryAction>
                                 </ListItem>
                              </List>
                              <CardActions style={{justifyContent:'center'}}>
                                    <Button onClick={()=>Save()}
                                            variant="contained" color="primary" className={classes.submit}
                                            style={{marginRight: 15}}>
                                        <SaveIcon/>
                                        Salvar
                                    </Button>
                              </CardActions>
                   </Card>

            )

};


export default index;
