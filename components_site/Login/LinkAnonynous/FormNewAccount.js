import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import { Formik, Form, Field,FieldArray } from "formik";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from 'material-ui-formik-components/TextField';;
import FormGroup from '@material-ui/core/FormGroup';
import {useStyles} from '../../../theme/site/styles';
import NoSsr from '@material-ui/core/NoSsr';
import SaveIcon from "@material-ui/icons/Save";
import {CircularProgress} from "@material-ui/core";
import get from 'lodash/get';

//
// https://libraries.io/npm/formik-material-ui
// https://github.com/stackworx/formik-material-ui
//


const ValidationSchema = Yup.object().shape({

      email: Yup.string().email()
            .email('e-mail inválido')
            .required('informe o e-mail do usuário'),

      password: Yup.string()
          .min(6,"Digite a senha com ao menos 5 caracteres")
          .required('digite a senha de acesso'),

      passwordConfirmation: Yup.string()
             .oneOf([Yup.ref('password'), null], 'As duas senhas não são iguais')
             .required('digite a sua senha novamente'),
});

const ValidForm = (isvalid,isloading)=>{

    if(isloading){
        return false;
    }else{
        return isvalid
    }

}

 const index = (props)=> {

            const {
                user,
                error_login,
                link_to_credential_action,
                loading_login
            } = props;

            const classes   = useStyles();
            let error       = get(error_login,"message",false);
            let email_      = get(user,"email","");

            const [loading,
               setLoading]          =  useState(false);

             useEffect(() => {

                 if(loading) {
                     setTimeout(() => {
                         setLoading(false);
                     }, 10000)
                 }

              }, [loading]);

            const [email,
               setEmail]     = React.useState(email_);

            const create_profile=(values)=>{
                link_to_credential_action(values.email,values.password);
            }

            return (
                <NoSsr>
                    <Formik
                        initialValues={{email:email,
                                        password:"",
                                        passwordConfirmation:""}}
                        enableReinitialize={true}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                                setLoading(true);
                                create_profile(values);
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
                            <Form style={{width:"100%"}}>
                                 <FormGroup style={{padding:5}}>
                                            <FormControl  fullWidth
                                                          margin="none"
                                                          required
                                                          error={Boolean(errors.email)}>
                                                    <Field name="email"
                                                           variant="outlined"
                                                           disabled={loading}
                                                           label={"E-mail"}
                                                           size="small"
                                                           error={Boolean(errors.email)}
                                                           component={TextField}/>
                                            </FormControl>
                                            <FormControl  fullWidth
                                                          margin="none"
                                                          required
                                                          error={Boolean(errors.password)}>
                                                    <Field name="password"
                                                           disabled={loading}
                                                           variant="outlined"
                                                           type='password'
                                                           inputProps={{autoComplete: 'off'}}
                                                           autoComplete='off'
                                                           label={"Senha"}
                                                           size="small"
                                                           error={Boolean(errors.password)}
                                                           component={TextField}/>

                                            </FormControl>
                                              <FormControl  fullWidth
                                                          margin="none"
                                                          required
                                                          error={Boolean(errors.passwordConfirmation)}>
                                                    <Field name="passwordConfirmation"
                                                           disabled={loading}
                                                           variant="outlined"
                                                           type='password'
                                                           inputProps={{autoComplete: 'off'}}
                                                           autoComplete='off'
                                                           label={"Senha (novamente)"}
                                                           size="small"
                                                           error={Boolean(errors.passwordConfirmation)}
                                                           component={TextField}/>

                                            </FormControl>
                                            {error &&
                                             <FormControl  fullWidth margin="none">
                                                 <div style={{color: 'red', fontSize: 14}}>{error}</div>
                                             </FormControl>
                                              }
                                  </FormGroup>
                                  <FormGroup style={{padding:5}}>
                                       <FormControl  fullWidth margin="none">
                                            <Button type={'submit'}
                                                    disabled={!ValidForm(isValid,loading)}
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.submit}
                                                    style={{width:"100%"}}>
                                                    {!loading && <SaveIcon />}
                                                    {!loading && "Criar conta"}
                                                    {loading &&
                                                    <div style={{width: 60}}>
                                                        <CircularProgress color="primary" size={15}/>
                                                    </div>
                                                    }
                                            </Button>
                                       </FormControl>
                                  </FormGroup>

                         </Form>
                        )}
                    </Formik>
                  </NoSsr>
            )

};


export default index;
