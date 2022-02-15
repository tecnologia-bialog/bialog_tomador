import React  from 'react';
import ReactLoading from 'react-loading';
import get from 'lodash/get';


//
// https://github.com/fakiolinho/react-loading
//


function index(props) {

      const color = get(props,"color",'#f18b38');
      const type = get(props,"type",'bars');

      return (

          <div style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '100vh'}}>
                   <ReactLoading type={type} color={color}/>
                </div>
          </div>

      )

}



export default index;
