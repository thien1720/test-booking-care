import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from 'axios';
import "./style.css"

function DetailPhoto() {
    const { id } = useParams()
    const [results, setResults] = useState({});

    useEffect(() => {
        const url = `https://jsonplaceholder.typicode.com/photos/${id}`;

        axios.get(url)
            .then((response) => {

                console.log(response)
                setResults(response.data)
                // setDetailPhoto(response)
            })
            .catch((error) => {
                console.error(error);
            });

    }, [id])


    return <div className={"detail-photos"}>
        <h1>Trang chỉ tiết :</h1>
        <img src={results.thumbnailUrl} alt={results.title} />
        <p>AlbumId : {results.albumId}</p>
        <p>{results.title}</p>

        <Link to="/" className={"go-back"}>Quay lại</Link>
    </div>
}

export default DetailPhoto