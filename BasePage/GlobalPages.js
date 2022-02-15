import React from 'react';
import Login from '../components_site/Login';
import get from 'lodash/get';



export default function globalPages(props) {

    const global_page       = get(props,"global_page","HOME");


    if(global_page === "LOGIN"){
              return (
                        <Login {...props} />
              );
     }


}
