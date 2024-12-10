import { useState, useEffect } from "react";

const useFetch = (
    initialValue: unknown,
    apiCall: ()=>unknown,
    dependencyArray: unknown[]
) => {
    const [data, setData] = useState(initialValue) //<TNote[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
          const data = await apiCall()
          setData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    
    useEffect(()=>{
        fetchData()
      }, dependencyArray)

    return {
        data, isLoading, isError, manuallyTriggerFetchData:fetchData
    }

}

export default useFetch