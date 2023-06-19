import {useState, useEffect} from "react"

function useDeboune(value , delay){
    const [debouneValue, setDebouneValue] = useState(value)

    useEffect(()=>{
        const handlers = setTimeout(() => {
            setDebouneValue(value)    
        }, delay);

        return() => {
            clearTimeout(handlers);
          };
    },[value])

    return debouneValue
}

export default useDeboune