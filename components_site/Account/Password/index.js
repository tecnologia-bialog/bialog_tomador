import React, { useState, useEffect } from 'react';
import * as Yup from "yup";
import { Formik, Form, Field,FieldArray } from "formik";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {TextField,Select,Switch} from 'formik-material-ui';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import SaveIcon from '@material-ui/icons/Save';
import {ErroLine} from '../../../utils/Utils';
import {useStyles} from '../../../theme/site/styles';
import Typography from "@material-ui/core/Typography";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";


//
// https://libraries.io/npm/formik-material-ui
// https://github.com/stackworx/formik-material-ui
//

const ValidationSchema = Yup.object().shape({

    password: Yup.string()
             .min(5,'digite uma senha atual com mais de 5 caracteres')
             .required('digite  sua senha atual'),

    new_password: Yup.string()
            .min(5,'digite a NOVA senha com mais de 3 caracteres')
            .required('Digite a sua NOVA senha'),

    new_password_again: Yup.string()
            .oneOf([Yup.ref('new_password')],'a  NOVA senha digitada não é igual a primeira',)
            .required('Digite a sua NOVA senha novamente'),

});

const empty_user = {
      password:'',
      new_password:'',
      new_password_again:'',
};

 const index = (props)=> {

            const {
                user,
                error,
                submit,
            } = props;

            const classes       = useStyles();
            let providerData    = get(user,'providerData.providerId',false);
            let disable_form    = !Boolean(providerData === 'password');
            let error_message   = get(error,'message','');
            let erro_show       = Boolean(error_message.length > 0);
            const [showError,
                setShowError]   = useState(false);

            React.useEffect(() =>{
                    if(erro_show) {
                        setShowError(true);
                    }
                },
                [erro_show])

            const change_password=(values)=>{
                submit(values.email,values.password, values.new_password)
            }

            return (

                    <Formik
                        initialValues={empty_user}
                        enableReinitialize={true}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                                let values_          = cloneDeep(values);
                                values_.email        = user.email;
                                change_password(values_);
                                //console.log('values',values);
                        }}>

                        {({
                              errors,
                              touched,
                              handleChange,
                              setFieldValue,
                              setFieldTouched,
                              values,
                              isValid

                          }) => (
                            <Form>
                                 <Card style={{marginTop:10,padding:15}} className={classes.form_white}>

                                 <FormGroup>
                                      <Typography variant="caption" align="left" gutterBottom>
                                                  E-mail
                                       </Typography>
                                      <Typography variant="h6" align="left" gutterBottom>
                                                 {user.email}
                                       </Typography>
                                     {disable_form &&
                                      <Typography variant="subtitle2"
                                                  color="textSecondary"
                                                  align="left" gutterBottom>
                                                 Você usou um provedor externo para criar uma conta
                                          (Gmail, Github, Facebook), por isso não é possível alterar
                                          a senha por aqui.
                                       </Typography>
                                     }
                                 </FormGroup>
                                 <FormGroup row>
                                        <FormControl required fullWidth style={{marginRight: 15, paddingTop: 5}}
                                                     error={ErroLine(errors.password)}>
                                            <Field
                                                autoComplete={'off'}
                                                disabled={disable_form}
                                                variant="outlined"
                                                size="small"
                                                type={'password'}
                                                name="password"
                                                label="senha atual"
                                                component={TextField}/>
                                        </FormControl>
                                  </FormGroup>
                                   <FormGroup row>
                                        <FormControl required fullWidth style={{marginRight: 15, paddingTop: 5}}
                                                     error={ErroLine(errors.new_password)}>
                                            <Field
                                                autoComplete={'off'}
                                                disabled={disable_form}
                                                 variant="outlined"
                                                size="small"
                                                type={'password'}
                                                name="new_password"
                                                label="nova senha"
                                                component={TextField}/>
                                         </FormControl>
                                 </FormGroup>
                                 <FormGroup row>
                                         <FormControl required fullWidth style={{marginRight: 15, paddingTop: 5}}
                                                     error={ErroLine(errors.new_password_again)}>
                                            <Field
                                                autoComplete={'off'}
                                                disabled={disable_form}
                                                type={'password'}
                                                 variant="outlined"
                                                size="small"
                                                name="new_password_again"
                                                label="nova senha"
                                                component={TextField}/>
                                        </FormControl>
                                  </FormGroup>
                                  <CardActions style={{justifyContent:'center'}}>
                                      {!disable_form &&
                                          <Button type={'submit'}
                                                  disabled={!isValid}
                                                  variant="contained"
                                                  color="primary" className={classes.submit}
                                                  style={{marginRight: 15}}>
                                              <SaveIcon/>
                                              Salvar
                                          </Button>
                                      }
                                  </CardActions>
                                  </Card>
                                    <Snackbar open={showError}
                                               autoHideDuration={6000}
                                               onClose={()=>setShowError(false)}
                                        >
                                      <Alert  onClose={()=>setShowError(false)} severity="error">
                                        A senha atual está incorreta !
                                      </Alert>
                                    </Snackbar>
                             </Form>
                        )}
                    </Formik>
                    )

};


export default index;
