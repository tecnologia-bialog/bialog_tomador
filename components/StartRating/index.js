import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {Grid} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";

//
// https://github.com/sanniassin/react-input-mask#examples
//


const index  = ({field: { ...fields }, form: { touched, errors,values, ...rest }, ...props })=>{

        let erro_field = errors['customer_rate'] || 0;
        let value_field = parseFloat(values['customer_rate']) || 0;
        let is_error =  Boolean(erro_field.length > 2);

        return (
            <Box border={1}
                 borderRadius="borderRadius"
                 borderColor={is_error?"#e53935":"#e0e0e0"}
                 style={{padding:5}}>
                 <Grid container spacing={1} alignContent={"center"}>
                         <Grid item md={8} sm={12} xs={12}>
                                <Rating  {...fields} {...props} />
                         </Grid>
                         <Grid item md={4} sm={12} xs={12} style={{backgroundColor:"#fafafa"}}>
                                 <Typography align="center"
                                             component="legend"
                                             variant="h5">
                                         {value_field.toFixed(1)}
                                 </Typography>
                         </Grid>
                 </Grid>
            </Box>
        )
};


export default index;
