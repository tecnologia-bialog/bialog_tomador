import React from 'react';
import * as Yup from "yup";
import { Formik, Form, Field,FieldArray } from "formik";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from 'material-ui-formik-components/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import {useStyles} from '../../../theme/site/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from "@material-ui/core/Typography";
import {storageKey} from '../../../helpers/firebase';
import Link from "@material-ui/core/Link";
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
          .min(5,"Digite a senha com ao menos 5 caracteres")
          .required('digite a senha de acesso'),
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
                login_profile_action,
                lostpassword,
                setLostpassword,
                new_account,
                setNew_account,
                loading_login
            } = props;

            const classes   = useStyles();
            let error       = get(error_login,"message",false);

            const [email,
               setEmail]     = React.useState("");
            const [password,
               setPassword]  = React.useState("");

            React.useEffect(() => {
                let email_ = localStorage.getItem(storageKey+"-email",);
                setEmail(email_);
              }, []);

            const login=(values)=>{
                login_profile_action(values.email,values.password);
            }

            return (
                    <NoSsr>
                    <Formik
                        initialValues={{email,password}}
                        enableReinitialize={true}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                                login(values);
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
                                             <Typography gutterBottom color="textSecondary"
                                                  variant="body2"
                                                  component="p"
                                                  align="center">
                                                  Entre com seu e-mail e senha:
                                             </Typography>
                                 <FormGroup style={{padding:5}}>
                                            <FormControl  fullWidth
                                                          margin="none"
                                                          required
                                                          error={Boolean(errors.email)}>
                                                    <Field name="email"
                                                           variant="outlined"
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
                                                           variant="outlined"
                                                           type='password'
                                                           label={"Senha"}
                                                           size="small"
                                                           error={Boolean(errors.password)}
                                                           component={TextField}/>

                                            </FormControl>
                                       <FormControl  fullWidth margin="none">
                                            <Button type={'submit'}
                                                    disabled={!ValidForm(isValid,loading_login)}
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.submit}
                                                    style={{width:"100%"}}>
                                                Entrar
                                            </Button>
                                       </FormControl>
                                       <FormControl  fullWidth margin="normal">
                                              <Link color="inherit"
                                                   href="#"
                                                   onClick={()=>setLostpassword(!lostpassword)}>
                                                 <Typography  color="textSecondary"
                                                              variant="caption"
                                                              component="p"
                                                              align="center">
                                                          Esqueceu a senha ?
                                                  </Typography>
                                             </Link>
                                       </FormControl>
                                            {error &&
                                             <FormControl  fullWidth margin="none">
                                                 <div style={{color: 'red', fontSize: 14}}>{error}</div>
                                             </FormControl>
                                              }
                                  </FormGroup>
                         </Form>
                        )}
                    </Formik>
                  </NoSsr>
            )

};


export default index;
