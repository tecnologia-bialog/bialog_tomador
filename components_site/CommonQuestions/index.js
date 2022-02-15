import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AccordionSummary, AccordionDetails, Typography, Accordion } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {

    },
    questionsTitle: {
        lineHeight: theme.typography.pxToRem(64),
        color: '#7F7F7F',
        fontSize: theme.typography.pxToRem(16)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightLight,
        color: '#7f7f7f'
    },
    content: {
        fontWeight: theme.typography.fontWeightLight,
        color: '#7f7f7f'
    },
    questionAccordion: {
        marginBottom: 20,
        border: -1,
        borderRadius: theme.typography.pxToRem(8),
        '&:before': {
            display: 'none'
        },
    }
}));

function CommonQuestions() {
    const classes = useStyles();

    const accordion = (<Accordion elevation={0} className={classes.questionAccordion}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
        >
            <Typography className={classes.heading}>
                Titúlo da pergunta
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography className={classes.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
        </AccordionDetails>
    </Accordion>);

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.questionsTitle}> Perguntas Frequentes BiaLog</Typography>

            <Accordion className={classes.questionAccordion} elevation={0} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className={classes.heading}>
                        Titúlo da pergunta
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {accordion}
            {accordion}
            {accordion}
            {accordion}
            {accordion}
            {accordion}
        </div>
    );
}

export default CommonQuestions