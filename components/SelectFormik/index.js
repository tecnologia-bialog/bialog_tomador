import React from 'react';
import { SingleSelect } from "react-select-material-ui";
import head from 'lodash/head';

//
// https://github.com/lodash/lodash
// https://github.com/JedWatson/react-select
// https://github.com/iulian-radu-at/react-select-material-ui
//


class index extends React.Component {


  handleChange = value => {
      try{
           let options = this.props.options || [];
           let item = this.getItemByLabel(options,value);
           this.props.onChange(this.props.field.name ,item);
      }catch (e) {

      }
  };


  handleBlur = () => {
      try{
          this.props.onBlur(this.props.field.name, true);
      }catch (e) {

      }
  };

  make_list=(list)=>{

     let out=[];
     list.map(item => (
            out.push(item.label)
         ));

     return out;
  };

  getItemByLabel=(list,label)=>{

      let item = {label:'',value:-1};

      if(!label){
          return item;
      }

      try{
            let out =  head(list.filter(list => list.label === label));
            if(out.label){
                return out
            }else{
                return item
            }
      }catch (e) {
            return item;
      }

  };

  render() {

    const { error,options,name,placeholder,disabled,value,background} = this.props;

    let value_ = value || {};
    let item   = this.getItemByLabel(options,value_.label);
    let items  = this.make_list(options);

    //console.log('error-->',error);

    return (

           <SingleSelect name={name}
                        SelectProps={{
                            isSearchable:false,
                            isDisabled:disabled,
                            isClearable:true,
                            defaultValue:{ label: "- Selecione -", value: -1 }
                        }}
                        options={items}
                        error={error}
                        value={item.label}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        placeholder={placeholder || "- selecione -"}

          />
    );
  }
}

export default index;
