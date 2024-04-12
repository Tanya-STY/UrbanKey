//hook for loading initial data

//imports from react
import { useState } from "react";

const useLoadInitDataHook = (page, token) => {

    // will be used inside a useEffect, to load initial data needed for the page
    //for example, if we load the dashboard, we need to go fetch the units data to show when the page renders
    //this should be done independently of buttons of user driven events
    //since this is, to the user, part of the page loading

    //url for the load page request, with a query named request for specific pages
    url = 'http://127.0.0.1:5000/loadPage?request=' + page;  

    //useState to store data from the backend
    [returnedValue, setReturnedValue] = useState(); 
    
    //use to store the response value of the backend (failed, not worked, expired token, etc)
    [responseValue, setResponseValue] = useState(); 

    fetch(url, {
        //methods for the fetch
        //added the token in the headers because in the backend, the @wraps token_required
        //will go verify the token value in the headers to verify it is good
        //and will only let the route function if the @wraps passes the decode
        method: 'POST',
        headers: { 
            'content-Type' : 'application/json',
            'token': token
        },
    })
    .then(response => {
        //when i get the response, i should check if it exists, because if not, then theres no point to try to do smthn with it
        if (!response.ok){
            console.log('Could not fetch data from the frontend');
            setResponseValue(1); 
            throw Error('could not reach backend properly');
        }
        //return the response in a json so that i can see it
        return response.json();
    })
    .then(data => {
        //check if there is a tokenValidResponse since thats an error of token
        if('tokenValidResponse' in data){
            console.log('token invalid');
            console.log(data['message']);
            setResponseValue(1); 
        }
        else{
            //pushing all the data into the useState
            //since the data is different per page, we let the pages handle 
            //deconstructing the useStates into the properties they are expecting
            //for example, profile can have name, age, etc but dashboard can have
            //unit name, unit sq meter, etc so the responsibility to know whats inside the response
            //is to the individual pages since they are requesting unique sets of data
            //thanks to this shift of responsibility, we can 
            console.log(data['message']);
            setResponseValue(0);
            setReturnedValue(data['data']);
        }
    })
    .catch(err => {
        console.log(err.name);
        console.log('catched error from backend with useLoadInitDataHook');
        setResponseValue(1); 
    })

    return { responseValue, returnedValue };
}

export default useLoadInitDataHook