//react dependencies
import {useState, useEffect } from 'react'; 

const useVerifTokenHook = (url, token) => {
    //hook that will be used to verify token at every first render of a component (page)
    //Takes in url as param
    //returns data (from the fetch), error messages, and isPending

    const [returnedValue, setReturnedValue] = useState('');


        //abort object to abort in case of fast switch between pages
        
        //fetching data function
        //should be backend data
        fetch(url, {
            method: 'POST',
            headers: { 
                "content-Type" : "application/json",
                'token':token
             },
            body: JSON.stringify({token: token})
        })
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch data from url'); 
            }
            return res.json();
        })
        .then(data => {
            console.log(data.message + ' inside verifToken')
            setReturnedValue(data.message);
        })
        .catch(err => {
            console.log(err);
           
                //catches errors sent from the backend
                console.log("Catched error from backend with useVerifTokenHook");  
            
        })


    //returning the data back to the custom hook user
    return returnedValue;
}
export default useVerifTokenHook; 