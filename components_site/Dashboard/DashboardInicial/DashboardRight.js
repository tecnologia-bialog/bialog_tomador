import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ShowResumo from "../ShowResumo";
import DashPieChart from "../../../components/DashPieChart";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ShowCircleBar from "../ShowCircleBar";
import FilterDataList from "../../FilterDataList";
import CreateOffer from './CreateOffer';

export default function index(props) {

        const { width_right,
                is_mobil } = props;

        let width_right_3 = width_right * 0.27;

        if (is_mobil) {
                width_right_3 = width_right * 1.5;
        }

        console.log("width_right_3-->", width_right_3, width_right, is_mobil)
        //Viagens em Andamento

        const list_data = [
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '01-2021',
                        signature_actives: 20
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '02-2021',
                        signature_actives: 16
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '03-2021',
                        signature_actives: 15
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '04-2021',
                        signature_actives: 21
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '05-2021',
                        signature_actives: 27
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '06-2021',
                        signature_actives: 24
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '07-2021',
                        signature_actives: 31
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '08-2021',
                        signature_actives: 42
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '09-2021',
                        signature_actives: 54
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '10-2021',
                        signature_actives: 67
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '11-2021',
                        signature_actives: 72
                },
                {
                        updatedAt: {
                                seconds: 21309310
                        },
                        month: '12-2021',
                        signature_actives: 83
                }
        ];

        return (
                <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                                <Grid container spacing={1} justifyContent="center">
                                        <Grid item xs={12} sm={12} md={4}>
                                                <ShowResumo list_data={list_data}
                                                        title={"Viagens em Andamento"}
                                                        width={width_right_3}
                                                        strokeColor="#008cff"
                                                        fillColor="#dee9f5"
                                                        number={78} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4}>
                                                <ShowResumo list_data={list_data}
                                                        title={"Ofertas com proposta"}
                                                        strokeColor="#42c2a8"
                                                        fillColor="#dff5f2"
                                                        width={width_right_3}

                                                        number={26} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4}>
                                                <ShowResumo list_data={list_data}
                                                        title="Motoristas Contatatos"
                                                        strokeColor="#e6d6a1"
                                                        fillColor="#faf8ef"
                                                        width={width_right_3}

                                                        number={180} />
                                        </Grid>
                                </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                                <CreateOffer />
                        </Grid>


                </Grid>
        )

}
