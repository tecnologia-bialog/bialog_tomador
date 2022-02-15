import Typography from "@material-ui/core/Typography";
import React from "react";
import {useStyles} from "../theme/site/styles";
import Grid from "@material-ui/core/Grid";
import Link from 'next/link';
import {logo_mobil_url} from "../assets/constants";


const Footer=(props)=> {

     const classes = useStyles();

     return (
        <footer className={classes.footer}>
             <Grid container spacing={1} justifyContent="center">
              <Grid item  sm={12}>
                  <Grid container spacing={2} alignContent="center" justifyContent="center">
                      <Grid item xs={12}>
                          <Grid container spacing={2} alignContent="center" justifyContent="center">
                          <Link href={"/dashboard"} passHref>
                              <a>
                                  <img height={30} src={logo_mobil_url}/>
                              </a>
                          </Link>
                          </Grid>
                      </Grid>
                      <Grid item xs={12}>
                          <Typography component="p"
                                      display="block"
                                      variant="caption"
                                      align="center"
                                      color="textPrimary">
                              Todos direitos reservados
                          </Typography>
                      </Grid>
                  </Grid>
              </Grid>

             </Grid>
          </footer>
  );
}

export default Footer;
