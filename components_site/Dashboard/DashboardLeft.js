import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GroupButtons from "../GroupButtons";
import ShowLineChart from "../../components/ShowLineChart";
import SimpleDataList from "../../components/SimpleDataList";
import { AddCircle, Attachment, LocalShipping, TripOrigin } from "@material-ui/icons";


export default function index(props) {

    const { width_left } = props;

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 17 }}>
                <Card style={{ minHeight: 270, backgroundColor: "#ffa726" }}>
                    <CardContent style={{ padding: 0 }}>
                        <Typography variant="h6" style={{ color: '#fff', padding: 8 }}>Históricos das viagens contratadas</Typography>
                        <ShowLineChart />
                    </CardContent>
                </Card>
                <CardActions style={{ backgroundColor: "#fff" }}>
                    <GroupButtons buttonsDef={GroupButtonsDef} />
                </CardActions>
            </Grid>

            <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 17 }}>
                <Card style={{ minHeight: 270, borderRadius: '4%' }}>
                    <CardContent style={{ padding: 0 }}>
                        <SimpleDataList />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 17 }}>
                <Card style={{ minHeight: 270, borderRadius: '4%' }}>
                    <CardContent style={{ padding: 0 }}>
                        <SimpleDataList />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )

}

const GroupButtonsDef = [
    {
        title: "Criar oferta de frete",
        icon: <AddCircle />,
        href: "/dashboard/new_offer"
    },
    {
        title: "Oferta em andamento",
        icon: <LocalShipping />,
        href: "offer_progress"
    },
    {
        title: "Importar arquivo XML",
        icon: <Attachment />,
        href: "import_xml"
    },
    {
        title: "Monitorar Viagens",
        icon: <TripOrigin />,
        href: "/trips_monitor"
    },
]