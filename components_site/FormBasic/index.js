import React from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from 'material-ui-formik-components/TextField';
import InputPhone from '../../components/InputPhone';
import InputPhoneCode from '../../components/InputPhoneCode';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import SaveIcon from '@material-ui/icons/Save';
import { ErroLine } from '../../utils/Utils';
import { useStyles } from '../../theme/site/styles';
import SelectFormik from "../../components/SelectFormik";
import NoSsr from '@material-ui/core/NoSsr';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';


//
// https://libraries.io/npm/formik-material-ui
// https://github.com/stackworx/formik-material-ui
//

const ValidationSchema = Yup.object().shape({

  name: Yup.string()
    .min(5, 'coloque seu nome completo!')
    .max(50, 'muitos caracteres, o limite máximo é de 50 caracteres')
    .required('coloque o nome do usuário'),

  active: Yup.bool(),
  code: Yup.string()
    .min(1, 'código do pais')
    .max(5, 'código do pais')
    .required('Campo obrigatório'),
  phone: Yup.string()
    .nullable()
    .min(7, 'digite o número do celular corretamento')
    .required('O celular é um campo obrigatório'),
  // .nullable()
  // .matches(/\+[0-9]{2} \([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, 'Digite corretamente o celular')
  // .required('O celular é um campo obrigatório'),

  city: Yup.string()
    .min(3, 'digite o nome da sua cidade com ao menos 3 caracteres')
    .max(60, 'digite o nome da sua cidade com no máximo 60 caracteres')
    .required('digite o nome da sua cidade'),

  uf: Yup.string()
    .min(2, 'digite o UF')
    .max(2, 'digite o UF')
    .required('digite o UF'),

  email: Yup.string().email()
    .nullable()
    .email('e-mail inválido')
    .required('informe o e-mail do usuário'),

  sexo: Yup.object({
    value: Yup.number()
      .min(1, "Selecione o gênero")
      .required('Selecione a gênero'),
  }),


});

let initialValues = {

  user_type: '',
  name: ' ',
  email: ' ',
  code: '+55',
  phone: ' ',
  sexo: {},
  new_user_customer: true,
  new_user_freela: true,
  city: ' ',
  uf: ' ',
  uid: ' ',
  country: 'BR'
};

const index = (props) => {

  const {
    user,
    error,
    submit,
    constants,
    signin_type,
  } = props;

  const classes = useStyles();
  initialValues.signin_type = signin_type;

  let user_ = get(props, 'user', initialValues);
  let email_ = get(user_, 'email', '');
  let phone_ = get(user_, 'phone', '');

  let disabled_email = Boolean(email_);
  let disabled_phone = Boolean(phone_);
  let phone_number = get(user, 'phone', '');
  let phone_code = get(user, 'code', '');
  let profile_generos = get(constants, "profile_generos", []);

  if (phone_number > 11) {
    user_.phone = user.phone.replace(/\D/g, '').slice(-11);
  }

  if (phone_code.length < 2) {
    user_.code = "+55";
  }


  return (
    <NoSsr>
      <Formik
        initialValues={user_}
        enableReinitialize={true}
        validationSchema={ValidationSchema}
        onSubmit={(values, actions) => {
          let values_ = cloneDeep(values);
          values_.phone = values.phone.replace(/\D/g, '');
          submit(values_);
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
            <Card style={{ padding: 15 }} className={classes.form_white}>

              <FormGroup>
                <FormControl fullWidth margin="normal" required>
                  <Field name="name"
                    size="small"
                    label={"Nome completo"}
                    variant="outlined"
                    error={Boolean(errors.name)}
                    component={TextField} />
                </FormControl>
                <FormControl fullWidth margin="normal"
                  required
                  error={Boolean(errors.email)}>
                  <Field name="email"
                    variant="outlined"
                    label={"E-mail"}
                    size="small"
                    disabled={disabled_email}
                    error={Boolean(errors.email)}
                    component={TextField} />
                  <div style={{ color: 'red', fontSize: 14 }}>{error}</div>
                </FormControl>
              </FormGroup>
              <FormGroup row>
                <FormControl margin="normal"
                  fullWidth
                  required
                  style={{ flex: 1, marginRight: 5 }}
                  error={Boolean(errors.code)}>
                  <Field name="code"
                    variant="outlined"
                    label={"Cod"}
                    size="small"
                    disabled={disabled_phone}
                    error={Boolean(errors.code)}
                    component={InputPhoneCode} />
                </FormControl>
                <FormControl required margin="normal" style={{ flex: 4 }}>
                  <Field name="phone"
                    fullWidth
                    variant="outlined"
                    size="small"
                    label={"Celular"}
                    disabled={disabled_phone}
                    error={Boolean(errors.phone)}
                    component={InputPhone} />
                  <div style={{ color: 'red', fontSize: 14 }}>
                    {errors.phone}
                  </div>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl margin="normal"
                  style={{ zIndex: 9999 }}
                  required error={ErroLine(errors.sexo)}>
                  <FormLabel component="legend">Gênero</FormLabel>
                  <Field name="sexo"
                    value={values.sexo}
                    variant="outlined"
                    size="small"
                    label="Gênero"
                    options={profile_generos}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={Boolean(errors.sexo)}
                    component={SelectFormik} >
                  </Field>
                </FormControl>
              </FormGroup>
              <FormGroup row>
                <FormControl margin='normal'
                  style={{ flex: 5, marginRight: 5 }}
                  required
                  error={Boolean(errors.city)}>
                  <Field name="city"
                    variant="outlined"
                    size="small"
                    value={values.city}
                    label={"Cidade"}
                    error={Boolean(errors.city)}
                    component={TextField} >
                  </Field>
                </FormControl>
                <FormControl
                  style={{ flex: 1 }}
                  margin="normal"
                  error={Boolean(errors.uf)}
                  required>
                  <Field name="uf"
                    variant="outlined"
                    size="small"
                    label={"Uf"}
                    error={Boolean(errors.uf)}
                    value={values.uf}
                    component={TextField} />
                </FormControl>

              </FormGroup>
              <FormGroup style={{
                justifyContent: 'center',
                marginTop: 15,
                padding: 10
              }}>
                <Button type={'submit'}
                  disabled={!isValid}
                  variant="contained" color="primary"
                  className={classes.submit}
                  style={{ marginRight: 15, alignSelf: "center" }}>
                  <SaveIcon />
                  Salvar
                </Button>
              </FormGroup>
            </Card>
          </Form>
        )}
      </Formik>
    </NoSsr>
  )

};


export default index;
