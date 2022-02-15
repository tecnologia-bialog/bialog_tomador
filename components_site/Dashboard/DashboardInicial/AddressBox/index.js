import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden, Typography } from "@material-ui/core";
import Line from "./LineVector";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        textAlign: "center",
        backgroundColor: "rgba(242, 242, 242, 0.694117647058824)",
        margin: '20px auto',
        borderRadius: '20px'
    },
    boxItem: {
        padding: theme.typography.pxToRem(24),
        color: "#555555",
        "& span": {
            fontWeight: theme.typography.fontWeightLight
        }
    },
    addressText: {
        lineHeight: theme.typography.pxToRem(32)
    }
}));

export default function AddressBox() {
    const classes = useStyles();
    return (
        <Grid
            alignItems="center"
            justifyContent="space-around"
            className={classes.root}
            container
        >
            <Grid className={classes.boxItem} xs={12} sm={12} md={5} item>
                <Typography className={classes.addressText}>
                    CNPJ: <span>34.324.211/0001-23</span>
                </Typography>
                <Typography className={classes.addressText}>
                    Razão Social: <span>Fruter S/A</span>
                </Typography>
                <Typography className={classes.addressText}>
                    Inscrição Estadual: <span>333922039</span>
                </Typography>
            </Grid>
            <Hidden smDown>
                <Line />
            </Hidden>
            <Grid className={classes.boxItem} xs={12} sm={12} md={5} item>
                <Typography className={classes.addressText}>
                    CEP: <span>04034-332</span>
                </Typography>
                <Typography className={classes.addressText}>
                    <span>Av Paulista, 443 - Bela Vista, SP São Paulo - SP</span>
                </Typography>
            </Grid>
        </Grid>
    );
}
