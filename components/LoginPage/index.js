import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Loading from '../Loading';
import {logo_url,logo_big_url} from "../../assets/constants";


class index extends React.Component {

      state = {
            email:'',
            password:'',
            error:'',
            loading:false,
      };

      handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
     };

     _login = (email,password) =>{
          this.props.login_profile_action(email, password);
     };

      UNSAFE_componentWillReceiveProps(nextProps){

                if (nextProps.error !== this.props.error){
                    let error_ = nextProps.error || {code:'',message:''};
                    let msg = error_['message'];
                    if(msg){
                        this.setState({ error:msg});
                    }
                }
                if (nextProps.loading !== this.props.loading){
                        this.setState({ loading:nextProps.loading});
                }
      }

    render() {

        const {classes,profile,loading} = this.props;
        const { email,password,error } = this.state;

        if(loading){
            return (<Loading/>);
        }

        return (
            <div className={classes.root} style={{height:800}}>
            <div className={classes.login}>
                        <Paper className={classes.paper_login}>
                            <div>
                                 <img  src={logo_big_url} height={120}  alt="Vogue"/>
                            </div>
                            <form className={classes.form_login} >
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email" style={{color:"#fff"}}>
                                        Email Address
                                    </InputLabel>
                                    <Input id="email" name="email" autoComplete="email"
                                           autoFocus onChange={this.handleChange('email')} value={email}/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password" style={{color:"#fff"}}>
                                        Password
                                    </InputLabel>
                                    <Input name="password" type="password"  value={password}
                                           onChange={this.handleChange('password')}
                                           id="password" autoComplete="current-password"/>
                                </FormControl>
                                <Button fullWidth variant="contained" color="primary"
                                        className={classes.submit} onClick={() => this._login(email,password)} >
                                    Entrar
                                </Button>
                                <p style={{color: 'red'}}>{error}</p>
                            </form>
                        </Paper>
                    </div>
             </div>
        );

    }
}



export default index;



