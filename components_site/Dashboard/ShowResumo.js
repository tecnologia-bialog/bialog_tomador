import React, { useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import ShowAreaChart from "../../components/ShowAreaChart";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

export default function index(props) {

    const goPage = (page) => {
        Router.push('/admin/' + page);
    };

    const {
        title,
        number,
        page,
        strokeColor,
        fillColor,
        bg_color,
        height,
        width,
        list_data
    } = props;

    const lineCardStyles = {
   /*      width:width, */
        padding:0,
        paddingTop:5,
        marginBottom: 16,
        borderRadius: '5%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    }

    return (

        <Card style={lineCardStyles}>
            <CardContent style={{ padding: 0 }}>
                <Grid container style={{ height: 150 }} onClick={() => page && goPage(page)}>

                    <Grid container  spacing={0} alignItems="center" direction="row">
                        <Grid item xs={12} style={{ padding: '0 10px', color: '#8c8e9f' }}>
                            <Typography variant="body1" style={{ color: "#666" }}>
                                {title}
                            </Typography>
                            <Typography variant="h6" style={{ fontWeight: 'normal', color: strokeColor, marginLeft: 5 }}>
                                {number}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="center" style={{}} direction="row" >
                        <Grid style={{height:82}} item xs={12} >
                            <ShowAreaChart list_data={list_data}
                                width={width}
                                strokeColor={strokeColor}
                                fillColor={fillColor} />
                        </Grid>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );

}
