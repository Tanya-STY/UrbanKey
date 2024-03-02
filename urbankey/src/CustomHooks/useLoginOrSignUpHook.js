// this custom hook is used to login or signup someone

//imports from react
import { useState } from "react";


const useLoginOrSignUpHook = (page, userInfo) => {

    //message from backend
    [message, setMessage] = useState();
    
    //response Value to know errors
    [responseValue, setResponseValue] = useState();

    //token given back for user session
    [token, setToken] = useState();

    //set url for the sending
    //this will allow us to use the same hook for sign up or login
    url = 'http://127.0.0.1:5000/' + page;

    fetch(url, {
        method: 'POST',
        headers: {'content-Type' : 'application/json' },
        body: JSON.stringify(userInfo)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch data from url'); 
        }
        return res.json();
    })
    .then(data => {
        if ('error' in data){
            console.log('error in the backend, return to initial page');
            setMessage(data[message]);
            setResponseValue(1);
        }
        else{
            console.log(data[message]);
            console.log(data[data]); 
            setMessage(data[message]);
            setResponseValue(0)
            setToken(data[token]);
        }
    })
    .catch(err => {
        console.log(err.name);
        console.log('catched error from backend with useLoadInitDataHook');
        setResponseValue(1); 
    })

    return { message, responseValue, token}
}
export default useLoginOrSignUpHook