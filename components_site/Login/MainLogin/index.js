import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from "@material-ui/core/Typography";
import {GoogleLoginButton,
        GithubLoginButton } from "react-social-login-buttons";
import FormLogin from "./FormLogin";
import LostPasswordForm from "./LostPasswordForm";
import NewAccount from "../NewAccount";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    storageKey
} from '../../../helpers/firebase';
import LinearProgress from "@material-ui/core/LinearProgress";
import {useRouter} from "next/router";
import get from 'lodash/get';


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
                login_provider_action,
                login_profile_action,
                link_password,
                lost_password_profile,
                loading_login,
                add_account,
            } = props;

           const router     = useRouter();
           let query        = get(router,"query",{});
           let utm_source   = get(query,"utm_source","");
           let utm_medium   = get(query,"utm_medium","");
           let from_facebok = utm_source === "facebook";

           //console.log("from_facebok-->",from_facebok,utm_source,utm_medium)

           const [lostpassword,
               setLostpassword] = React.useState(false);

           const [new_account,
               setNew_account] = React.useState(false);

           React.useEffect(() => {
               if(add_account){
                   setNew_account(true);
               }
              }, []);

           return (
                    <NoSsr>
                        <Card style={{flex:1}}>
                             <div style={{width:'100%',height:10,padding:2}}>
                                {LineIsLoading(loading_login)}
                            </div>
                            {from_facebok === false &&
                                <CardContent style={{
                                    padding: 10,
                                    backgroundColor: "#fafafa"
                                }}>
                                <FormGroup style={{justifyContent: 'center',
                                                    padding: 5
                                                }}>
                                    <Typography gutterBottom color="textSecondary"
                                                variant="h6"
                                                component="p"
                                                align="center">
                                        Login
                                    </Typography>
                                </FormGroup>
                            </CardContent>
                            }
                            <CardContent>
                                    {new_account &&
                                        <React.Fragment>
                                            <NewAccount setNew_account={setNew_account}
                                                        loading_login={loading_login}
                                                        {...props}/>
                                        </React.Fragment>
                                    }

                                    {!lostpassword && !new_account &&
                                    <React.Fragment>
                                            <FormLogin error_login={error_login}
                                                       loading_login={loading_login}
                                                       setLostpassword={setLostpassword}
                                                       lostpassword={lostpassword}
                                                       setNew_account={setNew_account}
                                                       new_account={new_account}
                                                       login_profile_action={login_profile_action}/>
                                      </React.Fragment>
                                    }

                                    {lostpassword && !new_account &&
                                         <React.Fragment>
                                            <LostPasswordForm error_login={error_login}
                                                              setLostpassword={setLostpassword}
                                                              link_password={link_password}
                                                              lost_password_profile={lost_password_profile}/>
                                         </React.Fragment>
                                    }
                                  </CardContent>

                              </Card>
                  </NoSsr>
            )

};


export default index;
