import React, {useEffect} from 'react';
import CustomNotAutorized from "../../../components_site/Notautorized/not_authorized";
import get from "lodash/get";
import Freela from "../../../components_site/Profile/Freela";
import Customer from "../../../components_site/Profile/Customer";
import {useRouter} from "next/router";


export default function index(props) {

    const {authenticated,
          new_user,
          currentUser,
          set_global_page_action,
          set_drawer_action}    = props;

    const router = useRouter();
    let user_type  = get(currentUser,'user_type','FREELA');

      // console.log('utm_source/capa -->',utm_source);
      // console.log('utm_medium/capa -->',utm_source);

      // console.log('authenticated -->',authenticated);
      // console.log('props -->',props);

    useEffect(() => {
            set_drawer_action(false);
        set_global_page_action("HOME");
    }, []);


    if(authenticated === false) {
        return (
            <CustomNotAutorized {...props}/>
        );
    }

    if(user_type === 'FREELA') {
        return (
            <React.Fragment>
                <Freela {...props}/>
            </React.Fragment>
        );
    }else{
        return (
            <React.Fragment>
                <Customer {...props}/>
            </React.Fragment>
        );
    }

}
