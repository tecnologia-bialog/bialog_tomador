import React, {useEffect} from 'react';
import SeoMeta from "../../../seo/Seo";
import dynamic from "next/dynamic";
import Loading from "../../../components/Loading";
import CustomNotAutorized from "../../../components_site/Notautorized/not_authorized";
import {useRouter} from "next/router";


let seo_data = {title:"Dashboard - Os melhores programadores freelancers da Internet",
              description:"contrate ou trabalhe como  programador freelancer." +
                  " O Codefreela não cobra comissão e te ajuda a ganhar dinheiro trabalhando em casa"
              }

const DynamicAccount= dynamic(() => import('../../../components_site/Account'),
    {ssr: false,loading: () => <Loading color={"#183444"} type={"spin"}/>});

export default function index(props) {

    const {authenticated,
          new_user,
          set_global_page_action,
          set_drawer_action}    = props;

    const router = useRouter();

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

    return (
        <React.Fragment>
            <SeoMeta data={seo_data}/>
            <DynamicAccount {...props}/>
        </React.Fragment>
    );

}
