import React from 'react';
import { firebaseAuth, performance } from '../helpers/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import LoadingTop from './LoadingTop';
import OneSignalCustom from './OneSignalCustom';
import packageJson from '../package.json';
import get from 'lodash/get';

const DynamicSiteAppbar = dynamic(() => import('./SiteAppbar'));
const DynamicGlobalPages = dynamic(() => import('./GlobalPages'),
    { ssr: false, loading: () => <Loading color={"#183444"} type={"spin"} /> });


let GLOBAL_PAGES = [
    "LOGIN"
]

//
// https://onury.io/accesscontrol/?content=guide
// https://github.com/scarlet-sage/React-Hooks-Nextjs-Material-Ui-next-With-Firebase-Hosting
// https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
//

import {
    get_config_action,
    get_contants_action
} from "../redux/Actions/config_actions";



import {
    list_tickets_action,
    create_ticket_action,
    update_ticket_action
} from "../redux/Actions/tickets_actions";


import {
    set_tab_action,
    set_drawer_action,
    set_left_menu_action,
    set_internal_page_action,
    set_global_page_action,
    set_appbar_color_action,
    set_ismobil,
    set_screen_size,
    set_error,
    set_loading,
    set_generic_action,
    set_page_action
} from "../redux/Actions/tabs_actions";


import {
    set_signin_type,
    set_signin_status
} from "../redux/Actions/signin_actions";


import {
    crud_list_action,
    crud_add_action,
    crud_get_action,
    crud_update_action,
    crud_delete_action,
    crud_get_by_field_action,
    crud_set_action,
    crud_generic_get_action,
} from "../redux/Actions/crud_actions";

import {
    login_profile_action,
    logout_profile_action,
    update_profile_action,
    update_img_profile_action,
    get_profile_action,
    set_authenticated,
    change_password_profile,
    lost_password_profile,
    set_currentUser,
    set_isloading_login,
    anonymous_login_action,
    link_to_credential_action,
    login_provider_action,
    set_user_type,
    create_profile_action,
    get_profile_extract_action,
} from "../redux/Actions/profile_actions";
import dynamic from "next/dynamic";
import Loading from "../components/Loading";
import SeoMeta from "../seo/Seo";






class index extends React.Component {

    constructor(props) {
        super(props);
        this.props.set_drawer_action(false);

    }

    componentDidMount() {
        //performance();
        const { set_authenticated,
            set_screen_size,
            set_ismobil,
            set_isloading_login,
            get_contants_action,
            get_profile_action,
            set_currentUser,
            get_config_action,
            set_error,
        } = this.props;

        set_error({ error: false, message: "", type: "warning" });

        firebaseAuth.onAuthStateChanged(async (authUser) => {
            let uid = get(authUser, 'uid', false);
            if (uid) {
                get_profile_action(authUser);
                set_authenticated(true);
            } else {
                set_currentUser({});
                set_authenticated(false);
                set_isloading_login(false);
            }
        });

        let width = get(window, 'innerWidth', 600);
        let height = get(window, 'innerHeight', 800);
        set_screen_size({ width, height });
        if (width < 700) {
            set_ismobil(true);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        const {
            currentUser,
            is_error,
            set_error,
            config,
            set_loading,
        } = this.props;

        let currentUser_uid = get(currentUser, "uid", false);
        let next_currentUser = get(nextProps, "currentUser", {});
        let next_is_error = nextProps.is_error;

        if (next_is_error !== is_error) {
            setTimeout(() => {
                set_error({ error: false, message: "", type: "warning" });
            }, 150000);
        }
    }

    render() {

        const { classes,
            select,
            drawer,
            is_error,
            set_error,
            set_drawer,
            loading,
            config,
            seo,
            page, ...props } = this.props;

        let currentUser = get(this.props, "currentUser", {});
        let global_page = get(this.props, "global_page", "HOME");
        let new_user = false;
        let make_proprosal = false;

        let is_mobil = get(this.props, "is_mobil", false);
        let screen_size = get(this.props, "screen_size", {});
        let user_active = get(currentUser, "active", false);

        //console.log("currentUser-->",currentUser);

        let show_global_page = GLOBAL_PAGES.filter(item => item === global_page).length > 0;

        //console.log('global_page-->>',global_page,show_internal_page);
        //console.log('project_data-->>',project_data);
        //console.log('proposals_limit_allow-->>',proposals_limit_allow);
        //console.log('user_approved-->>',user_approved,user_active);

        const seo_data = {
            title: "Dashboard - Bialog.com.br",
            url: 'https://bialog.com.br/',
            description: "A Bialog nasceu com um único objetivo, o de melhorar a sua experiência com a logística atual.",
            set_url_base: false
        }

        return (
            <React.Fragment>
                <OneSignalCustom currentUser={currentUser} />
                <SeoMeta data={seo_data} />
                <main>
                    <DynamicSiteAppbar
                        drawer={drawer}
                        user_active={user_active}
                        app_version={false}
                        new_user={new_user}
                        title={"Bialog"}
                        leftMenu={false}
                        {...props} />
                    <CssBaseline />
                    <LoadingTop loading={loading} />

                    {show_global_page &&
                        <DynamicGlobalPages    {...props}
                            user_active={user_active}
                            new_user={new_user}
                            config={config}
                        />
                    }
                    {!show_global_page &&
                        React.cloneElement(this.props.children,
                            {
                                ...this.props,
                                config: config,
                                is_mobil: is_mobil,
                                screen_size: screen_size,
                                new_user: new_user,
                            })
                    }
                </main>
            </React.Fragment>
        );

    }
}

const mapStateToProps = store => ({

    currentUser: store.profiles_reducer.currentUser,
    link_anonymous: store.profiles_reducer.link_anonymous,
    new_user_done: store.profiles_reducer.new_user_done,
    error_duplicate_slug: store.profiles_reducer.error_duplicate_slug,
    authenticated: store.profiles_reducer.authenticated,
    list_profile_extract: store.profiles_reducer.list_profile_extract,
    loading: store.tabs_reducer.loading,
    loading_user: store.profiles_reducer.loading_user,
    error_login: store.profiles_reducer.error_login,
    link_password: store.profiles_reducer.link_password,
    tab: store.tabs_reducer.tab,
    drawer: store.tabs_reducer.drawer,
    left_menu: store.tabs_reducer.left_menu,
    get_page: store.tabs_reducer.get_page,
    constants: store.tabs_reducer.constants,
    internal_page: store.tabs_reducer.internal_page,
    global_page: store.tabs_reducer.global_page,
    appbar_color: store.tabs_reducer.appbar_color,
    is_mobil: store.tabs_reducer.is_mobil,
    screen_size: store.tabs_reducer.screen_size,
    temp_content: store.tabs_reducer.temp_content,
    app_version: get(packageJson, "version", 'v0.000'),
    crud_content: store.crud_reducer.crud_content,
    scroll_position: store.tabs_reducer.scroll_position,
    config: store.config_reducer.config,
    access_refer: store.tabs_reducer.access_refer,

    //Error
    is_error: store.tabs_reducer.is_error,
    freelancers_search_by: store.tabs_reducer.freelancers_search_by,
    freelancers_filter_skills: store.tabs_reducer.freelancers_filter_skills,
    freelancers_filter_perhour: store.tabs_reducer.freelancers_filter_perhour,
    freelancers_order_by: store.tabs_reducer.freelancers_order_by,

    //Signin
    signin_status: store.signin_reducer.signin_status,
    signin_type: store.signin_reducer.signin_type,

    loading_login: store.profiles_reducer.loading_login,
    list_user_plans: store.crud_reducer.list_user_plans,

    list_profiles: store.crud_reducer.list_profiles,
    list_paginas: store.crud_reducer.list_paginas,
    list_noticias: store.crud_reducer.list_noticias,

    list_crud: store.crud_reducer.list,
    item_crud: store.crud_reducer.item,
    error_crud: store.crud_reducer.error,
    done_crud: store.crud_reducer.done,
    loading_crud: store.crud_reducer.loading,
    generic_remote_data: store.crud_reducer.generic_remote_data,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        login_profile_action,
        anonymous_login_action,
        link_to_credential_action,
        login_provider_action,
        create_profile_action,
        logout_profile_action,
        update_profile_action,
        update_img_profile_action,
        change_password_profile,
        lost_password_profile,
        get_profile_action,
        get_profile_extract_action,
        set_user_type,
        set_isloading_login,
        set_authenticated,
        set_currentUser,
        set_tab_action,
        set_error,
        set_appbar_color_action,
        set_drawer_action,
        get_contants_action,
        set_left_menu_action,
        set_page_action,
        set_internal_page_action,
        set_global_page_action,
        set_generic_action,
        set_ismobil,
        set_loading,
        set_screen_size,
        crud_list_action,
        crud_add_action,
        crud_get_action,
        crud_update_action,
        crud_delete_action,
        crud_get_by_field_action,
        crud_set_action,
        crud_generic_get_action,
        set_signin_type,
        set_signin_status,
        list_tickets_action,
        create_ticket_action,
        update_ticket_action,
        get_config_action,
    }, dispatch);



export default (connect(mapStateToProps, mapDispatchToProps)(index));

