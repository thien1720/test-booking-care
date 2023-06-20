import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from 'axios';
import "./style.css"

function DetailPhoto() {
    const { id } = useParams()
    const [results, setResults] = useState({});

    useEffect(() => {
        const apiKey = 'AIzaSyBnTvzWPFc-QWTG7kV0izEDIRa6RDIumt0';
        const cx = '40aa84b50e4a84ad1';
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${id}`

        // axios.get(url)
        //     .then((response) => {

        //         console.log(response)
        //         setResults(response.data)
        //         // setDetailPhoto(response)
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

    }, [id])


    return <div className={"detail-photos"}>
        <h1>Trang chi tiết :</h1>
        {/* <img src={results.pagemap.cse_image[0].r} alt={results.title} /> */}
        <p>Title : {id}</p>
        {/* <p>{results.title}</p> */}

        <Link to="/" className={"go-back"}>Quay lại</Link>
    </div>
}

export default DetailPhoto