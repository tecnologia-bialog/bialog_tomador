import React from 'react';
import MaterialInput from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';

//
// https://github.com/sanniassin/react-input-mask#examples
//


const index  = ({field: { ...fields }, form: { touched, errors, ...rest }, ...props })=>{

        const mask = "99999-999";

        return (
            <InputMask mask={mask} {...props}  {...fields} >
                    {(inputProps) => <MaterialInput {...inputProps} type="cep"  />}
            </InputMask>
        )
};


export default index;
