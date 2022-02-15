import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from '../../theme/site/styles_appbar';
import { logo_mobil_url, logo_url } from '../../assets/constants';
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import RightDrawer from "./RightDrawer";
import Container from "@material-ui/core/Container";
import Link from 'next/link';
import ProfileMenu from "./ProfileMenu";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { FormGroup, Grid } from "@material-ui/core";

export default function index(props) {

    const classes = useStyles();
    const pages_transparents = ["SITE", "BUSINESS", "AFFILIATES"];
    const pages_no_login = ["AFFILIATES", "SIGNIN_AFFILIATES"];
    let text_color = "#999";

    const {
        global_page,
        authenticated,
        msgs_unread,
        drawer,
        set_drawer_action,
        new_user,
        set_global_page_action,
        user_type,
        logout_profile_action,
        constants,
        is_mobil,
        app_version,
    } = props;

    const trigger = useScrollTrigger({ threshold: 50 });
    let has_transparent = pages_transparents.filter(item => item === global_page).length > 0;
    let no_login = pages_no_login.filter(item => item === global_page).length > 0;

    //console.log("global_page-->", global_page, is_mobil)

    let currentUser = props.currentUser || {};
    let disable_buttons = false;
    let show_appbar = true;
    let show_dashborad = false;
    let notifications = msgs_unread;

    if (no_login) {
        show_appbar = false;
    }

    if (global_page === "LOGIN") {
        show_appbar = false;
    }

    const go_home = () => {
        set_global_page_action("DASBOARD");
        set_drawer(false);
    };
    const set_drawer = (value) => {
        set_drawer_action(value);
    };

    const _logout = () => {
        logout_profile_action(false);
        set_drawer(false);
    };

    React.useEffect(() => {
        if (new_user) {
            set_drawer(true);
        }
    }, []);

    class MenuButton extends React.Component {
        render() {
            return (
                <Link href={this.props.link}>
                    <Button size="medium"
                        variant={this.props.selected ? "outlined" : "text"}
                        color={this.props.selected ? "secondary" : "default"}
                        style={{
                            fontSize: 11,
                            color: this.props.selected ? "default" : text_color
                        }}>
                        {this.props.text}
                    </Button>
                </Link>
            )
        };
    }

    return (

        <AppBar elevation={!trigger ? 0 : 1} position="fixed" color="primary">
            <Container component="main" maxWidth="lg">
                <Toolbar>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item md={2} sm={10} xs={10}>
                            <div className={classes.site_logo}>
                                <Link href={"/dashboard"} passHref>
                                    <a>
                                        <img width={170} src={logo_url} />
                                    </a>
                                </Link>
                            </div>
                            <div className={classes.site_logo_mobile}>
                                <Link href={"/dashboard"} passHref>
                                    <a>
                                        <img height={30} src={logo_url} />
                                    </a>
                                </Link>
                            </div>
                        </Grid>
                        <Grid item md={8} sm={12} xs={12} className={classes.sectionDesktop}>
                            <FormGroup row>
                                {!is_mobil &&
                                    <div className={classes.buttons_top} >
                                        <MenuButton text="Início" link="/dashboard" selected={global_page === "DASHBOARD"} />
                                    </div>
                                }
                                <div className={classes.buttons_top} >
                                    <MenuButton text="Ofertas" link="/dashboard/offers" selected={global_page === "OFFERS"} />
                                </div>
                                <div className={classes.buttons_top} >
                                    <MenuButton text="Viagens" link="/dashboard/trips" selected={global_page === "TRIPS"} />
                                </div>
                                <div style={{ flex: 6 }}>
                                </div>
                            </FormGroup>
                        </Grid>
                        <Grid item md={2} sm={2} xs={2} style={{ paddingTop: 15 }}>
                            {is_mobil &&
                                <Badge color={"secondary"}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    invisible={!Boolean(notifications > 0)}
                                    overlap="circular"
                                    style={{ bottom: "29%" }}
                                    badgeContent={notifications}>
                                    <IconButton
                                        color="inherit"
                                        size="small"
                                        aria-label="open drawer"
                                        onClick={() => set_drawer(true)}
                                        edge="end">
                                        <MenuIcon style={{ color: "#000" }} />
                                    </IconButton>
                                </Badge>
                            }
                            {!is_mobil && show_appbar &&
                                <ProfileMenu props={props}
                                    notifications={notifications}
                                    set_drawer={set_drawer} />
                            }
                            {!show_appbar &&
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={() => go_home()}
                                    edge="end">
                                    <CloseIcon style={{ color: "#999" }} />
                                </IconButton>
                            }

                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
            <RightDrawer
                set_drawer={set_drawer}
                drawer={drawer}
                constants={constants}
                msgs_unread={msgs_unread}
                new_user={new_user}
                currentUser={currentUser}
                set_global_page_action={set_global_page_action}
                user_type={user_type}
                setLeftOpen={set_drawer_action}
                logout={_logout}
                app_version={app_version}
                authenticated={authenticated} />
        </AppBar>

    );
}
