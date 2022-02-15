import fetch from 'isomorphic-unfetch';



    let data = 'priceID=price_1HWpE5ARN5WbldmdA2PHW9Af';
    let url = "https://backend.codefreela.com/checkout/stripe";

    const headers = {
        Accept: 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
    }

    fetch(url,{ mode:'no-cors',method:'POST',body: data,headers:headers}).then( response => {
        return response.text();
    }).then( responseBodyAsText => {

        console.log(" responseBodyAsText->",responseBodyAsText);
        try {
            const bodyAsJson = JSON.parse(responseBodyAsText);
            return bodyAsJson;
        } catch (e) {
            return responseBodyAsText
        }
    }).then( json => {
            console.log(" json->",json);
            return json
    }).catch( err => {

        console.log(" error->",err);
        if (!(err instanceof Error) && err.type && err.type === "unparsable") {
            return;
        }
        throw err;
    })
