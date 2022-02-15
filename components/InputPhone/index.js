import React from 'react';
import MaterialInput from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';

//
// https://github.com/sanniassin/react-input-mask#examples
//


const index  = ({field: { ...fields }, form: { touched, errors, ...rest }, ...props })=>{

        const mask = "(99) 99999-9999";
        let erro_field = errors['phone'] || ''
        let is_error =  Boolean(erro_field.length > 2);

        return (
             <div style={{ flexGrow: 1,borderBottom: is_error?'1px solid #ff1744':'0px solid #ff1744'}}>
                <InputMask mask={mask} {...props}  {...fields} >
                        {(inputProps) => <MaterialInput {...inputProps} type="text" placeholder={mask} />}
                </InputMask>
             </div>
        )
};


export default index;
