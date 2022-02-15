import React from 'react';
import MaterialInput from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';

//
// https://github.com/sanniassin/react-input-mask#examples
//


const index  = ({field: { ...fields }, form: { touched, errors, ...rest }, ...props })=>{

        const mask = "999.999.999-99";

        return (
            <InputMask mask={mask} {...props}  {...fields} >
                    {(inputProps) => <MaterialInput {...inputProps} type="text"  />}
            </InputMask>
        )
};


export default index;
