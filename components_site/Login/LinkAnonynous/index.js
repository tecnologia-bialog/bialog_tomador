import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import NoSsr from '@material-ui/core/NoSsr';
import FormLogin from "./FormLogin";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import {GithubLoginButton} from "react-social-login-buttons";
import {Button, CircularProgress, Grid} from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Close from "@material-ui/icons/Close";



//
// https://libraries.io/npm/formik-material-ui
// https://github.com/stackworx/formik-material-ui
//

const LineIsLoading=(loading)=>{
   return  loading?<LinearProgress color="secondary"/>:<div></div>;
}

 const index = (props)=> {

            const {
                error_login,
                user,
                login_provider_action,
                setStep_project,
                link_to_credential_action,
                loading_login,
            } = props;


           return (
                    <NoSsr>
                        <Card style={{flex:1}}>
                             <div style={{width:'100%',height:10,padding:2}}>
                                {LineIsLoading(loading_login)}
                            </div>
                             <CardContent style={{padding: 10,backgroundColor: "#fafafa"}}>
                                   <Typography
                                        variant="body1"
                                        color="secondary"
                                        component="p"
                                        align="left">
                                        Crie uma senha de acesso
                                    </Typography>
                             </CardContent>
                            <CardContent>
                                    <React.Fragment>
                                            <FormLogin error_login={error_login}
                                                       loading_login={loading_login}
                                                       user={user}
                                                       link_to_credential_action={link_to_credential_action}/>
                                      </React.Fragment>
                            </CardContent>
                            <CardContent>
                                    <Button  onClick={()=>setStep_project(4)}
                                             variant="outlined"
                                             color="primary"
                                             fullWidth>
                                              <Close /> Voltar
                                    </Button>
                            </CardContent>

                            </Card>
                  </NoSsr>
            )

};


export default index;
