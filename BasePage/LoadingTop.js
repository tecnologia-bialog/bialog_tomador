import React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import get from 'lodash/get';

const isLoading=(value)=>{
    return  value?<LinearProgress color="primary"/>: <div></div>
};

export default function index(props) {

    let loading   = get(props,"loading",false);

    return (
            <div style={{width:'100%',position:"absolute",zIndex:99999,top:0}}>
                    {isLoading(loading)}
            </div>
      );
}
