import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GroupButtons from "../../GroupButtons";
import ShowLineChart from "../../../components/ShowLineChart";
import SimpleDataList from "../../../components/SimpleDataList";
import { AddCircle, Attachment, LocalShipping, TripOrigin } from "@material-ui/icons";
import CommonQuestions from '../../CommonQuestions';
import { Box } from '@material-ui/core';


export default function index(props) {

    const { width_left } = props;

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 17 }}>
                <Box style={{ minHeight: 270, backgroundColor: 'transparent', zIndex: 0, padding: 10 }}>
                    <CommonQuestions />
                </Box>
                <CardActions >
                    <GroupButtons buttonsDef={GroupButtonsDef} removeContainerMargin={true} />
                </CardActions>
            </Grid>
        </Grid>
    )

}




const go_page = (values) => {
    console.log("go_page-->", values)
}
const GroupButtonsDef = [
    {
        title: "Oferta em andamento",
        icon: <LocalShipping />,
        clickHandler: go_page,
        page: "new_offer"

    },
    {
        title: "Monitorar Viagens",
        icon: <TripOrigin />,
        clickHandler: go_page,
        page: "new_offer"
    },
]