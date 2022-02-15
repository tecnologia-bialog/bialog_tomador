import fetch from "isomorphic-unfetch";


export const get_checkout_session = async function(priceID,customerEmail,uid,plan_id) {

    let data = 'priceID='+priceID+"&customerEmail="+customerEmail+"&client_reference_id="+uid+"&plan_id="+plan_id;
    let url = "https://backend.codefreela.com/checkout/stripe";

    const headers = {
        Accept: 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
    }

    try{
        const res = await fetch(url,
            {  method:'POST',body:data,headers:headers});
        return await res.json();

    }catch (e) {
      console.log('get_server error-->',e);
      return e
    }

}

export const get_customer_portal_session = async function(customerID) {

    let data = 'customerID='+customerID;
    let url = "https://backend.codefreela.com/account/stripe";

    const headers = {
        Accept: 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
    }

    try{
        const res = await fetch(url,
            {  method:'POST',body:data,headers:headers});
        return await res.json();

    }catch (e) {
      console.log('get_server error-->',e);
      return e
    }

}
