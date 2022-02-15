import React from "react";
import {useStyles} from "../theme/site/styles";
import {error_404_url} from '../assets/constants';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import SeoMeta from "../seo/Seo";

export default function Custom404(props) {

    const {set_internal_page_action,
          set_global_page_action} = props;

    const classes = useStyles();
    let seo_data       = {title:"página não encontrada | Bialog.com.br",
                            description:"Bialog.com.br"}


    React.useEffect( () => {
                try {
                    set_internal_page_action("404");
                    set_global_page_action("404");
                }catch (e) {

                }
          }, []);

  return (

      <React.Fragment>
       <SeoMeta data={seo_data}/>
      <CssBaseline />
      <div className={classes.Content_404}>
              <Container className={classes.card_404} maxWidth="md">
                         <Grid container spacing={4} justifyContent="center">
                             <Grid item xs={12} sm={12} md={12}>
                               <img width={150} src={error_404_url} />
                             </Grid>
                             <Grid item xs={12} sm={12} md={12}>
                              <Typography gutterBottom color="textSecondary"
                                          variant="body1"
                                          component="h2"
                                          align="center">
                                      Página não encontrada.
                              </Typography>
                              <Typography gutterBottom color="textSecondary"
                                          variant="body2"
                                          component="h2"
                                          align="center">
                                      Verifique o endereço digitado ou tente a nossa busca por
                                  palavra-chave para encontrar o que deseja.
                              </Typography>
                             </Grid>
                         </Grid>
              </Container>
      </div>
     </React.Fragment>
  )
}
