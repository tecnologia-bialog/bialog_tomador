import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../../theme/site/styles';
import get from 'lodash/get';
import { Grid, IconButton } from "@material-ui/core";
import WelcomeBar from "../../WelcomeBar";
import Alert from '@material-ui/lab/Alert';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

export default function index(props) {

    const { is_mobil,
        set_global_page_action,
        currentUser,
        screen_size,

    } = props;

    //console.log("screen_with-->", screen_size, is_mobil);

    let width = get(screen_size, "width", 410);
    let width_left = width * 0.32;
    let width_right = width * 0.6;
    if (is_mobil) {
        width_left = width * 0.95;
        width_right = width_right * 0.95;
    }


    useEffect(() => {
        // set_global_page_action("DASHBOARD");
    }, []);

    let user_type = get(currentUser, 'user_type', 'FREELA');
    const currentUser_uid = get(currentUser, 'uid', false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <WelcomeBar />
            <CssBaseline />
            <main>
                <div className={classes.dashboard_content}>
                    <Container maxWidth="lg" disableGutters>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <DashboardLeft currentUser={currentUser}
                                    user_type={user_type}
                                    width_left={width_left}
                                    is_mobil={is_mobil}
                                    {...props} />

                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid style={{ marginBottom: 8 }}>
                                    <Alert style={{ marginBottom: 8 }}
                                        action={
                                            <IconButton size="small" aria-label="delete">
                                                <DoubleArrowIcon />
                                            </IconButton>
                                        } severity="warning">Tempo esgotado: Lorem ipsum dolor sit amet, consectetur adipiscing elit Suspendisse</Alert>
                                </Grid>
                                <DashboardRight currentUser={currentUser}
                                    user_type={user_type}
                                    width_right={width_right}
                                    is_mobil={is_mobil}
                                    {...props} />
                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </main>
        </React.Fragment >
    )

}
