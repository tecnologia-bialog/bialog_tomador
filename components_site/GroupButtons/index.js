import React from 'react';
import { Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import BigButton from "./BigButton";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: -70,
        zIndex: 999
    },
    containerWithoutMargin: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    firstButtonCard: {
        background: 'linear-gradient(-57.2267125833664deg, rgba(230, 138, 0, 1) -14%, rgba(255, 172, 0, 1) 83%)', borderRadius: 15
    },
    firstBigButtonIcon: {
        fontSize: theme.typography.pxToRem(35),
        color: "white"
    },
    bigButtonIcon: {
        fontSize: theme.typography.pxToRem(35),
    },
    cardButtonContainer: {
        padding: 10
    },
    buttonCard: {
        backgroundColor: "#fff",
        borderRadius: theme.typography.pxToRem(15)
    },
}));

export default function index({ buttonsDef, removeContainerMargin }) {
    const classes = useStyles();

    return (
        <Grid container spacing={1} className={removeContainerMargin ? classes.containerWithoutMargin : classes.container}>
            {
                buttonsDef.map((def, index) => {
                    const ButtonIcon = React.cloneElement(def.icon, {
                        className: clsx(def.highlight ? classes.firstBigButtonIcon : classes.bigButtonIcon, def.icon.className),
                        color: def.highlight ? "primary" : "secondary"
                    });

                    return (<Grid item xs={12} sm={12} key={index} md={6} className={classes.cardButtonContainer}>
                        <Card className={def.highlight ? classes.firstButtonCard : classes.buttonCard}>
                            <CardContent>
                                <BigButton
                                    title={def.title || "No title"}
                                    color={def.highlight && "white"}
                                    icon={ButtonIcon}
                                    href={def.href || "#"}
                                />
                            </CardContent>
                        </Card>
                    </Grid>)
                })
            }
        </Grid>
    )

}
