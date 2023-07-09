import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url) =>{
    const[data,setData] = useState([])
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState(false)

    useEffect(() => {
        const fetchData = async ()=>{
            setLoading(true)
        try{
            const headers = { "Content-type":"application/JSON" };
            const res = await axios.get(url, {headers});
            setData(res.data);
        }  catch(err) {
            setError(err)
        } 
        setLoading(false)
        }
        fetchData();
    }, []) //[url] url is removed so that it wont update instantly, only updates when refetch is called
    
    const reFetch = async ()=>{
        setLoading(true)
        try{
            const res = await axios.get(url)
            setData(res.data);
        }  catch(err) {
            setError(err)
        } 
        setLoading(false)
    }

    return {data,loading,error,reFetch}
}

export default useFetch;

