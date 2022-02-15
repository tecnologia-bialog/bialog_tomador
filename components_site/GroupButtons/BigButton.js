import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { Icon } from "@material-ui/core";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core";


export default function BigButton({ title, href, color, icon }) {

    const classes = makeStyles(theme => ({
        buttonText: {
            color: color || "#111",
            fontWeight: theme.typography.fontWeightRegular,
            opacity: '0.8'
        }
    }))();

    const router = useRouter()

    const handleButtonClick = evt => {
        evt.preventDefault();
        router.push(href);
    }

    return (
        <Button
            onClick={handleButtonClick}
            size="large">
            <Grid container style={{ maxHeight: 80 }}>
                <Grid item xs={4} sm={4} md={12}>
                    <Icon style={{ minHeight: 45, minWidth: 45 }}>{icon}</Icon>
                </Grid>
                <Grid item xs={8} sm={8} md={12} style={{ paddingLeft: 5 }}>
                    <Typography align="left" variant="body2" className={classes.buttonText}>
                        {title}
                    </Typography>
                </Grid>
            </Grid>
        </Button >

    )

}
