import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Drawer, Grid, IconButton, Tooltip, Typography, Paper } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import NoSsr from '@material-ui/core/NoSsr';

import SearchBar from "../../components/SearchBar";

const useStyles = makeStyles({
    drawerContainer: {
        backgroundColor: '#f2f2f2',
        color: '#7f7f7f'
    },

});

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
                className={classes.drawer}
            >
                <Box className={classes.drawerContainer}>
                    <Grid container direction="column">
                        <Grid item md={6}>
                            <SearchBar />

                            <Typography style={{ textAlign: "center" }}>Filtrar ofertas em andamento</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Paper>
                                <Typography style={{ textAlign: "center" }}>as</Typography>
                                <Typography style={{ textAlign: "center" }}>vi</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>

        </NoSsr >
    );
}
