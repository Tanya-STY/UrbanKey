// //react dependencies
// import { useState, useEffect } from "react";


// const useLocalStorageTokenCheckHook = (url) => {
    
//     //set the useState necessary
//     const [passed, setPassed] = useState(false); 
//     const token = localStorage.getItem('token'); 

//     useEffect(() => {
//         tryCheck(url);}, [url]); 

//         const tryCheck = (url) => {
//         if(token){
//             if(token !== ''){
            
//                 fetch(url, {
//                 method: 'POST',
//                 headers: { "content-Type" : "application/json" },
//                 body: JSON.stringify(token)
//                 })
//                 .then(res => {
//                     if(!res.ok){
//                         throw Error('could not fetch data from url'); 
//                     }
//                     return res.json();
//                 })
//                 .then(data => {
//                     if (data.message === 'good'){
//                         console.log("token verified, login skipped");
//                         setPassed(true);
//                     }
//                     if (data.message === 'bad'){
//                         console.log("token from local storage was bad");
//                         setPassed(false);
//                     }
//                 })
//                 .catch(err => {
//                     //catches errors from switching pages too fast and the component unmounting from the DOM
//                     //but the custom hook useVerifTokenHook still is waiting for the fetch
//                     //which creates a massive error
//                     if (err.name === 'AbortError') {
//                         console.log('fetch aborted explicitely');
//                     }
//                     else {
//                         //catches errors sent from the backend
//                         console.log(err.name); 
//                         console.log("Catched error from backend with useVerifTokenHook");  
//                     }
//                 })
//             }
//         }
//         else {setPassed(false)}

//         //abort object to abort in case of fast switch between pages
//         //fetching data function
//         //should be backend data

   
//         }
//         return { passed, token }
// }
// export default useLocalStorageTokenCheckHook;