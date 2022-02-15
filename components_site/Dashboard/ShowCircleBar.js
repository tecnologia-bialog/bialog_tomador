import React from "react";
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import CircularBarChart from "../../components/CircularBarChart";
import DashSelect from "../../components/DashSelect";

export default function ShowCircleBar({ height }) {
    return (
        <Card style={{
            paddingTop: 5,
            borderRadius: '5%',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}>
            <CardContent style={{ backgroundColor: "#fafafa" }} height={height}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="body1" style={{ flexGrow: 1, color: '#666', fontWeight: 200, opacity: 0.8, height: 30 }}>
                            Histórico de ofertas criadas
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DashSelect />
                    </Grid>
                </Grid>
                <CircularBarChart height={270} />
            </CardContent>
        </Card>
    );
}