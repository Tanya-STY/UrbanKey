//react dependencies
import {useState, useEffect } from 'react'; 
import { json } from 'react-router-dom';

const useVerifTokenHook = (url, token) => {
    //hook that will be used to verify token at every first render of a component (page)
    //Takes in url as param
    //returns data (from the fetch), error messages, and isPending

    //data that will be received from the backend
    const [data, setData] = useState(null);

    //pending state that will check if we received or not from backend
    const [isPending, setPending] = useState(null);

    //any potiential error arising from backend stuff
    const [error, setError] = useState(null);

    useEffect(() => {

        //abort object to abort in case of fast switch between pages
        const  abortCont = new AbortController();
        
        //fetching data function
        //should be backend data
        fetch(url, {
            method: 'POST',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(token)
        })
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch data from url'); 
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setPending(false);
            setError(null); 
        })
        .catch(err => {
            //catches errors from switching pages too fast and the component unmounting from the DOM
            //but the custom hook useVerifTokenHook still is waiting for the fetch
            //which creates a massive error
            if (err.name === 'AbortError') {
                console.log('fetch aborted explicitely');
            }
            else {
                //catches errors sent from the backend
                setPending(false); 
                setError(err.message);
                console.log("Catched error from backend with useVerifTokenHook");  
            }
        })
        return () => abortCont.abort(); 
    }, [url])

    //returning the data back to the custom hook user
    return { data , isPending, error };
}
export default useVerifTokenHook; 