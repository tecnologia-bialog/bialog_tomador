import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: 'right'
    },
    button: {
        margin: theme.spacing(1),
        color: 'white',
        lineHeight: theme.typography.pxToRem(24)
    }
}));

export default function IconLabelButtons({ text, type, form }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                size="large"
                color="secondary"
                form={form}
                type={type || 'button'}
                className={classes.button}
                endIcon={<ChevronRightIcon />}
            >
                {text}
            </Button>
        </div>
    );
}
