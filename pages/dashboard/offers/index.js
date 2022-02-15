import React, { useEffect } from 'react';
import SeoMeta from "../../../seo/Seo";
import dynamic from "next/dynamic";
import Loading from "../../../components/Loading";
import CustomNotAutorized from "../../../components_site/Notautorized/not_authorized";
import { useRouter } from "next/router";

let seo_data = {
    title: "Dashboard | Bialog.com.br",
    description: "Bialog"
}


const DynamicDashboard = dynamic(() => import('../../../components_site/OfferDashboard'),
    { ssr: false, loading: () => <Loading color={"#183444"} type={"spin"} /> });

export default function index(props) {

    const { authenticated,
        set_global_page_action,
        set_drawer_action } = props;

    // console.log('authenticated -->',authenticated);
    // console.log('props -->',props);

    useEffect(() => {
        set_drawer_action(false);
        set_global_page_action("OFFERS");
    }, []);

    // useEffect(() => {
    //     if(authenticated===false){
    //         router.push("/");
    //     }
    // }, [authenticated]);

    // if (authenticated === false) {
    //     return (
    //         <CustomNotAutorized {...props} />
    //     );
    // }

    return (
        <React.Fragment>
            <SeoMeta data={seo_data} />
            <DynamicDashboard {...props} />
        </React.Fragment>
    );

}
