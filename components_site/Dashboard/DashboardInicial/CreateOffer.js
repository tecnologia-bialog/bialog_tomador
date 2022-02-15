import { Box, makeStyles, Paper, Typography, TextField } from '@material-ui/core'
import React from 'react'
import AddressBox from "./AddressBox";
import DashButton from "../../DashButton";

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.typography.pxToRem(24),
        paddingRight: theme.typography.pxToRem(24),
        paddingBottom: theme.typography.pxToRem(24),
    },
    title: {
        color: '#7F7F7F',
        borderBottom: '1px solid #e2e2e2',
        lineHeight: theme.typography.pxToRem(72),
        marginBottom: theme.typography.pxToRem(24),
        fontWeight: theme.typography.fontWeightLight
    },
    inputLabel: {
        color: '#7F7F7F',
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: theme.typography.pxToRem(48)
    },
    input: {
    }
}));

function CreateOffer() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography className={classes.title}>Crie uma nova oferta</Typography>
            <Box>
                <Typography className={classes.inputLabel}>CNPJ / CPF Origem da carga</Typography>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    placeholder="32.334.442/0001-43"
                    fullWidth
                />

                <AddressBox />

                <DashButton text="Prosseguir" />
            </Box>
        </Paper>
    )
}

export default CreateOffer
