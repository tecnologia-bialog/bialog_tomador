import React from 'react';
import Select,
       {components,
        createFilter} from 'react-select';
import { SingleSelect } from "react-select-material-ui";
import SearchIcon from '@material-ui/icons/Search';
import get from 'lodash/get';
import head from 'lodash/head';

//
// https://github.com/lodash/lodash
// https://github.com/JedWatson/react-select
// https://github.com/iulian-radu-at/react-select-material-ui
//

const DropdownIndicator = (props) => {

  return components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <SearchIcon/>
        </components.DropdownIndicator>
  );
};


class index extends React.Component {


      handleChange = value => {
          try{
               //console.log('handleChange',value);
               let options  = this.props.options || [];
               let item     = this.getItemByLabel(options,value);
               this.props.onChange(this.props.field.name ,item);
          }catch (e) {

          }
      };

      handleBlur = () => {
          try{
                this.props.onBlur(this.props.field.name, true);
          }catch (e) {
                //console.log('handleBlur',e);
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

          let item = {label:''};

          if(!label){
              return item;
          }
          try{
                return head(list.filter(list => list.label === label));
          }catch (e) {
                return item;
          }

      };

      render() {

        const {error,options,name,disabled,value } = this.props;

        let value_label   = get(value,'label','');
        let item          = this.getItemByLabel(options,value_label);
        let item_label    = get(item,'label','');
        let placeholder   = get(this.props,'placeholder', "busque por...")
        let items         = this.make_list(options);
        let is_error      = get(this.props,'error',false);

        return (
           <div style={{ flexGrow: 1,borderBottom: is_error?'1px solid #ff1744':'0px solid #ff1744'}}>
                  <SingleSelect
                    name={name}
                    options={items.slice(0,500) || []}
                    SelectProps={{components:{
                        DropdownIndicator},
                        isDisabled:disabled,
                        msgNoOptionsMatchFilter: "Nenhum ítem encontrato",
                        defaultValue:{ label: placeholder, value: -1 }
                    }}
                    value={item_label}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    placeholder ={placeholder}
                  />
          </div>
        );
      }
}

export default index;
