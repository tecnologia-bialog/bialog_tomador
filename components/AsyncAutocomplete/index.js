import React from 'react';
import Async from 'react-select/async';
import {useTheme} from '@material-ui/core/styles';
import {useStyles} from './material_styles'
import {CustomComponents} from './custom_components'


//
// https://github.com/lodash/lodash
// https://github.com/JedWatson/react-select
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/autocomplete/IntegrationReactSelect.js
//


export default function index(props) {


      const handleChange = value => {
          try{
               props.onChange(props.field.name ,value);
          }catch (e) {
          }

      };

      const handleBlur = () => {
          try{
                props.onBlur(props.field.name, true);
          }catch (e) {
                //console.log('handleBlur',e);
          }
      };

      const filter = (inputValue) => {

          let options = props.options;

          if (inputValue) {
                return options.filter(i =>
                    i.label.toLowerCase().includes(inputValue.toLowerCase())
                  ).slice(0.100);
              }

          return options.slice(0,20);
        };

       const handleLoadOptions = (inputValue, callback) => {
                setTimeout(() => {callback(filter(inputValue));}, 1000);
       };


       const { error,options,name,placeholder,disabled,value } = props;

       const classes = useStyles();
       const theme = useTheme();

       const selectStyles = {
              input: base => ({...base,color: theme.palette.text.primary,
                height: '25px', '& input': {font: 'inherit',},
              }),
        };


       return (
           <div style={{ flexGrow: 1,height: 25}}>
                  <Async loadOptions={handleLoadOptions}
                         NoOptionsMessage={"Nenhum ítem encontrado"}
                         cacheOptions
                         name={name}
                         isDisabled={disabled}
                         classes={classes}
                         styles={selectStyles}
                         components={CustomComponents}
                         value={value}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         placeholder= {" busque  .. "}
                  />
          </div>
        );
}

