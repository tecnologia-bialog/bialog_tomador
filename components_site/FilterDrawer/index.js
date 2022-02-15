import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Drawer, Grid, IconButton, Tooltip, Typography, Paper, NativeSelect, Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import NoSsr from '@material-ui/core/NoSsr';
import SearchBar from "../../components/SearchBar";

import Avatar from '@material-ui/core/Avatar';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PausePresentationIcon from '@material-ui/icons/PausePresentation';
import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles(theme => ({
    drawerContainer: {
        width: 350,
        backgroundColor: '#f2f2f2',
        color: '#7f7f7f',
    },
    currentOffersLabel: {
        textAlign: "center",
        lineHeight: theme.typography.pxToRem(64)
    },
    avatar: {
        backgroundColor: '#f8f8f8',
        color: '#7f7f7f',
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));



const Select = () => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="body2">Etapa da oferta</Typography>
            <NativeSelect
                value={10}
                name="age"
                style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: '#f2f2f2',
                }}
                inputProps={{ 'aria-label': 'age' }}
            >
                <option value="">None</option>
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
            </NativeSelect>
        </>
    )
};

const HeaderFilterDrawer = () => {
    const classes = useStyles();
    return (
        <Grid item md={12}>
            <SearchBar width={350} />

            <Typography className={classes.currentOffersLabel}>Filtrar ofertas em andamento</Typography>

            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={4} item container justifyContent="center" direction="column" alignItems="center">
                    <Avatar className={classes.avatar}>
                        <LocalAtmIcon style={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography align="center" variant="caption">Com Propostas</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={4} item container justifyContent="center" direction="column" alignItems="center">
                    <Avatar className={classes.avatar}>
                        <PausePresentationIcon style={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography align="center" variant="caption">Sem Propostas</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={4} item container justifyContent="center" direction="column" alignItems="center">
                    <Avatar className={classes.avatar}>
                        <ClearIcon style={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography align="center" variant="caption">Canceladas</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default function FilterDrawer() {
    const classes = useStyles();
    const [showFilter, setFilterShow] = useState(false);

    const toggleDrawer = () => {
        setFilterShow(!showFilter)
    }

    return (
        <NoSsr>
            <Tooltip onClick={toggleDrawer} title="Filter list">
                <IconButton aria-label="filter list">
                    <FilterListIcon />
                </IconButton>
            </Tooltip>

            <Drawer
                open={showFilter}
                onClose={toggleDrawer}
                anchor="right"
            >
                <Box className={classes.drawerContainer}>

                    <Grid container direction="column" spacing={2} >
                        <HeaderFilterDrawer />
                    </Grid>

                    <Paper>
                        <Grid container spacing={2} style={{ padding: 8 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Select />
                            </Grid>
                            <Grid item container spacing={1}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Select />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Select />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={1}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Select />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Select />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Select />
                            </Grid>

                            <Grid item container>
                                <Button variant="contained" style={{ width: '100%' }} color="secondary">Filtrar</Button>
                            </Grid>
                        </Grid>
                    </Paper>


                </Box>
            </Drawer>

        </NoSsr >
    );
}
