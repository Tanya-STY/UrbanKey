
import useVerifTokenHook from "../CustomHooks/useVerifTokenHook";




const Test1 = () => {

    //testing the useVerifTokenHook

    const url = "http://127.0.0.1:5000/TestinguseVerifTokenHook"; 

    const {data , pending, error} = useVerifTokenHook(url, "1203")
    console.log(data);
    console.log(pending);
    console.log(error);

    return(
        <div>
            <p>
                This is page for test 1
            </p>
        </div>
    )
}
export default Test1;