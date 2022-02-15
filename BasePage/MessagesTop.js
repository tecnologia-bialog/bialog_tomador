import React from 'react';
import Snackbar from '../components/Snackbar';
import get from 'lodash/get';


export default function index(props) {

    let is_error      = get(props,"is_error",{});
    let error_msg     = get(is_error,"message","");
    let type          = get(is_error,"type","warning");
    let error         = get(is_error,"error",false);

    const {set_error} = props;

    return (
        <React.Fragment >
               <Snackbar show_error={error}
                          variant={type}
                          handleClose={()=>set_error({error:false,message:"",type:type})}
                          msg_error={error_msg}/>
        </React.Fragment>
      );
}
