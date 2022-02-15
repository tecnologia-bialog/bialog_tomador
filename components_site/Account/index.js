import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import {useStyles} from '../../theme/site/styles';
import Copyright  from '../Copyright'
import LinearProgress from '@material-ui/core/LinearProgress';
import SeoMeta from "../../seo/Seo";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Password from './Password';
import Plan from './Plan';
import Settings from './Settings';
import Container from "@material-ui/core/Container";
import dynamic from "next/dynamic";
import CustomNotAutorized from '../Notautorized/not_authorized';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import Link from 'next/link';


const FormBasic = dynamic(
  () => import ("../FormBasic"),
  { ssr: false }
)


export default function index(props) {

    const [value, setValue] = React.useState(0);
    const [internal_page,
        set_internal_page]       = React.useState("ACCOUNT");
    const classes = useStyles();
    let seo_data   = {title:"Account | Codefreela",
                     description:"Contrate programadores, encontre jobs"}

    const {
          loading_user,
          loading,
          currentUser,
          error,
          authenticated,
          config,
          set_global_page_action,
          current_signature,
          constants,
          update_profile_action,
          change_password_profile,
          get_stripe_account_action,
          account_session_stripe,
          is_mobil,
         } = props;

    let plans      = get(config,'plans',[]);
    let user_types = get(constants,'user_types',[]);
    let user_type  = get(currentUser,'user_type',user_types[0])

    const isLoading=(loading,loading_user)=>{
           let start = loading || loading_user;
           return  start?<LinearProgress color="secondary"/>:<div></div>;
    }

    const handleChange = (event, newValue) => {
            setValue(newValue);
    };

    const save_customer_profile =(values)=>{
            let currentUser_                 = cloneDeep(currentUser);
            currentUser_.comercial_data      = values;
            currentUser_.comercial_data_done = true;
            update_profile_action(currentUser_);
     }

    if(!authenticated){
         return (<CustomNotAutorized Error={404} />)
    }

    // if(internal_page === "PAYMENT"){
    //     return (<Payment
    //                 show_page={set_internal_page}
    //                 go_back_page="ACCOUNT"
    //                 {...props} />)
    // }

    return (
        <React.Fragment>
           <SeoMeta data={seo_data}/>
             <Paper className={classes.root_tabs}>

                    <Toolbar style={{minHeight:40}}>
                        <Tabs
                            style={{ width: '100%',flexGrow:1}}
                            value={value}
                            onChange={handleChange}
                            scrollButtons="on"
                            indicatorColor="primary"
                            centered={!is_mobil}
                            variant={is_mobil?"scrollable":"standard"}
                            textColor="primary"
                            >
                            <Tab label="Planos"/>
                            <Tab label="Dados Básicos"/>
                            <Tab label="Dados comerciais"/>
                            <Tab label="Senha"/>
                            <Tab label="Configuração"/>
                        </Tabs>
                        <Link href={"/dashboard"}>
                            <IconButton
                                        color="primary"
                                        style={{right:0}}
                                        aria-label="open drawer"
                                        edge="end">
                                        <CloseIcon />
                            </IconButton>
                        </Link>
                    </Toolbar>

            </Paper>
            <div style={{width:'100%',height:20}}>
               {isLoading(loading,loading_user)}
            </div>
             <Container maxWidth="sm">

                   {value === 0  &&
                         <Plan user={currentUser}
                               plans={plans}
                               set_global_page_action={set_global_page_action}
                               get_stripe_account_action={get_stripe_account_action}
                               account_session_stripe={account_session_stripe}
                               current_signature={current_signature}
                               submit={update_profile_action}/>
                    }
                    {value === 1 &&
                                <FormBasic user={currentUser}
                                           constants={constants}
                                           submit={update_profile_action}/>
                    }


                    {value === 3 &&
                                <Password user={currentUser}
                                          error={error}
                                          submit={change_password_profile}/>
                    }

                    {value === 4 &&
                                <Settings user={currentUser}
                                          submit={update_profile_action}/>
                    }
            </Container>
          <Box mt={5}>
                <Copyright />
          </Box>

   </React.Fragment>
  );
}



