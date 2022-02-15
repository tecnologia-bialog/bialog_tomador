import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {useStyles} from '../../theme/site/styles';
import SeoMeta from "../../seo/Seo";
import MainLogin  from './MainLogin';
import get from 'lodash/get';


export default function Login(props) {

   const classes = useStyles();

   const {
          loading_login,
          new_user,
          currentUser,
          authenticated,
          add_account,
          set_drawer_action,
          access_refer
          }         = props;

  //console.log('access_refer-->>',access_refer);

   let user_uid     = get(currentUser,'uid',false);
   let seo_data     = {title:"Login | Bialog",
                              description:"Bialog"};

   useEffect(() => {
       set_drawer_action(false);
    }, []);

  return (
        <React.Fragment>
           <SeoMeta data={seo_data}/>
           <div  style={{  background: 'linear-gradient(to  bottom, #ffcc80 50%,#fafafa 10%, #fafafa  50%)',
                            height: "100vh"
                        }}>
                    <Container component="main" maxWidth="xs" >
                      <div className={classes.loginContent}>
                        <MainLogin loading_login={loading_login}
                                   add_account={add_account}
                                   {...props} />
                      </div>
                    </Container>
           </div>
       </React.Fragment>
  );
}






