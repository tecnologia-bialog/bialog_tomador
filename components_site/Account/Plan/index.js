import React, {useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useStyles} from '../../../theme/site/styles';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {CircularProgress} from "@material-ui/core";
import get from "lodash/get";
import * as dayjs from "dayjs";
let relativeTime = require('dayjs/plugin/relativeTime');
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');
dayjs.extend(relativeTime);


//
// https://libraries.io/npm/formik-material-ui
// https://github.com/stackworx/formik-material-ui
//


 const index = (props)=> {

            const {
                current_signature,
                account_session_stripe,
                get_stripe_account_action,
                set_global_page_action,
            } = props;

           const [disableButton,
               setDisableButton] = useState(true);
           let free_plan         = get(current_signature,'plan.default_plan',false);
           let stripe_id         = get(current_signature,'stripe.customer',false);
           let account_url       = get(account_session_stripe,"session.url","/");
           //console.log("current_signature-->",current_signature)

           useEffect( () => {
               if(stripe_id) {
                   get_stripe_account_action(stripe_id);
               }
            }, []);

           useEffect( () => {
                if(account_url.length > 10) {
                    setDisableButton(false);
                }
            }, [account_session_stripe]);

            const classes   = useStyles();
            let today       = dayjs().unix();

            let createdAt_  = get(current_signature,'createdAt._seconds',today);
            let createdAt   = dayjs.unix(createdAt_).format("DD/MM/YYYY  HH:mm:ss");
            let signature_description   = get(current_signature,"plan.description","");

            const payment=()=>{
                set_global_page_action("PAYMENT");
            }

            return (
              <Card style={{marginTop:10}} className={classes.form_white}>
                             <CardContent style={{backgroundColor:"#fafafa"}}>
                                   <Typography variant="subtitle2" align="left">
                                              Plano
                                   </Typography>
                                   <Typography variant="h6" align="left" color="secondary">
                                           {signature_description}
                                   </Typography>
                                   <Typography variant="subtitle2" align="left" gutterBottom>
                                            {createdAt}
                                   </Typography>
                                   <Typography variant="caption"
                                                      color="textSecondary"
                                                      align="left" gutterBottom>
                                             Para assinar outro plano click no botão abaixo
                                   </Typography>
                             </CardContent>
                             <Divider />
                             {free_plan &&
                                      <CardActions style={{justifyContent: 'center'}}>
                                          <Link onClick={() => payment()}>
                                              <Button type={'submit'}
                                                      variant="contained"
                                                      color="primary"
                                                      className={classes.submit}
                                                      style={{width:"100%",marginLeft: 15}}>
                                                  Ver planos disponíveis
                                              </Button>
                                          </Link>
                                      </CardActions>
                             }
                             {!free_plan &&
                                      <CardActions style={{justifyContent: 'center'}}>
                                          <Link href={account_url} target="_blank">
                                              <Button type={'submit'}
                                                      style={{width:"100%",marginLeft: 15}}
                                                      variant="contained"
                                                      disabled={disableButton}
                                                      color="primary"
                                                      className={classes.submit}>
                                                  {!disableButton && <AccountCircle />}
                                                  {!disableButton && "Gerenciar seu plano"}
                                                  {disableButton &&
                                                      <div style={{width: 60}}>
                                                          <CircularProgress color="secondary" size={15}/>
                                                      </div>
                                                  }
                                              </Button>
                                          </Link>
                                      </CardActions>
                             }
                            <CardActions style={{justifyContent: 'center'}}>
                                   <Typography variant="caption"
                                                 color="textSecondary"
                                                 align="center" gutterBottom>
                                             Você será direcionado para o nosso parceito
                                       internacional Stripe.com
                                   </Typography>
                            </CardActions>
                          </Card>
            )

};


export default index;
