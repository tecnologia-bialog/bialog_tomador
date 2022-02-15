import React from 'react';
import { useStyles } from '../../theme/site/styles_appbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Input from '@material-ui/icons/Input';
import AccountBox from '@material-ui/icons/AccountBox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactSupport from '@material-ui/icons/ContactSupport';
import Badge from '@material-ui/core/Badge';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import InfoIcon from '@material-ui/icons/Info';
import GavelIcon from '@material-ui/icons/Gavel';
import CreditCard from '@material-ui/icons/CreditCard';
import SecurityIcon from '@material-ui/icons/Security';
import Description from '@material-ui/icons/Description';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from "@material-ui/core/Typography";
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';


export default function index(props) {

    const classes = useStyles();

    const {
        authenticated,
        msgs_unread,
        logout,
        set_signin,
        user_type,
        set_global_page_action,
        user_active,
        new_user,
        current_signature,
        app_version,
        drawer,
        set_drawer,
        user_recused,
    } = props;

    let currentUser = props.currentUser || {};
    let image_profile = get(currentUser, 'image_profile', '');
    let image_profile_exist = get(currentUser, 'image_profile', false);
    let status_label = get(currentUser, 'status.label', "Em análise");
    let signature_description = get(current_signature, "plan.description", "");
    let new_user_copy = cloneDeep(new_user);
    let color_label = "secondary";
    let color_button = "183444";

    return (
        <NoSsr>
            <Drawer
                className={classes.drawer}
                anchor="right"
                variant="temporary"
                escapeKeyDown={() => set_drawer(false)}
                backdropclick={() => set_drawer(false)}
                docked="false"
                open={drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton
                        onClick={() => set_drawer(false)}>
                        {!drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

                <div style={{
                    width: 240,
                    backgroundColor: '#fafafa',
                    justifyContent: 'center'
                }}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} style={{ backgroundColor: "#78909c" }}>
                            <Grid container justifyContent="center" spacing={2} style={{ paddingTop: 15 }}>
                                {image_profile_exist &&
                                    <Avatar style={{ width: 75, height: 75 }} src={image_profile} />
                                }
                                {!image_profile_exist &&
                                    <AccountCircle style={{ width: 75, height: 75 }} />
                                }
                            </Grid>
                        </Grid>
                        <Grid item
                            xs={12}
                            style={{ backgroundColor: "#78909c", justifyContent: "center" }}>
                            <Typography component="p"
                                variant="caption"
                                align="center"
                                color="textPrimary">
                                {currentUser.name}
                            </Typography>
                            <Typography component="p"
                                variant="caption"
                                align="center"
                                color="textPrimary">
                                {currentUser.email}
                            </Typography>
                            {!new_user &&
                                <Typography component="p"
                                    variant="caption"
                                    align="center"
                                    color="textPrimary">
                                    @{currentUser.slug}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                </div>
                <List>
                    <React.Fragment>
                        <Divider />
                        <Link href="/dashboard">
                            <ListItem button
                                disabled={new_user_copy}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Inicio'} />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link href="/dashboard/offers">
                            <ListItem button
                                disabled={new_user_copy}>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Ofertas'} />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link href="/dashboard/trips">
                            <ListItem button
                                disabled={new_user_copy}>
                                <ListItemIcon>
                                    <AccountBox />
                                </ListItemIcon>
                                <ListItemText primary={'Viagens'} />
                            </ListItem>
                        </Link>

                    </React.Fragment>
                    {!authenticated &&
                        <React.Fragment>
                            <Divider />
                            <ListItem
                                onClick={() => set_global_page_action("LOGIN")}
                                button>
                                <ListItemIcon>
                                    <Input />
                                </ListItemIcon>
                                <ListItemText primary={'Login'} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    }
                    {authenticated &&
                        <React.Fragment>
                            <ListItem button onClick={() => logout()}>
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary={'Sair'} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    }
                    <Divider />
                    <ListItem button>
                        <Typography component="p"
                            variant="caption"
                            align="center"
                            color="secondary">
                            versão: {app_version}
                        </Typography>
                    </ListItem>
                </List>
                {new_user && authenticated &&
                    <div style={{
                        width: 240,
                        padding: 10,
                        backgroundColor: "#fafafa"
                    }}>
                        <Typography component="p"
                            variant="caption"
                            align="left"
                            color="error">
                            Você provavelmente não concluiu o cadastro
                            de suas informações do seu perfil. Para liberar
                            o acesso à todas as funcionalidades clique "
                            em "Completar o Perfil" e siga as instruções
                            até o final.
                        </Typography>
                    </div>
                }
            </Drawer>
        </NoSsr>
    )

}
