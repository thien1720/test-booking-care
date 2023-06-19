import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";

import useDeboune from '../common/useHookDeboune';
import "./style.css"
import { Link } from 'react-router-dom';

const SearchPhotos = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const debounces = useDeboune(query, 500)
    console.log(debounces)
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const getMorePost = async () => {
        console.log("tos")
        await setPage(page + 1)
        const url = `https://jsonplaceholder.typicode.com/photos?q=${debounces}&_page=${page}&_limit=20`;

        axios.get(url)
            .then((response) => {
                setLoading(false);
                setResults((prevResults) => [...prevResults, ...response.data]);
            })
            .catch((error) => {
                console.error(error);
            });
        console.log("re")
    };

    useEffect(() => {
        if (!debounces.trim()) {
            return
        }
        const handleSearch = async () => {

            // Thực hiện tìm kiếm khi người dùng nhập vào input
            const url = `https://jsonplaceholder.typicode.com/photos?q=${debounces}&_page=${page}&_limit=20`;

            axios.get(url)
                .then((response) => {
                    setLoading(false);
                    setResults((prevResults) => [...prevResults, ...response.data]);
                })
                .catch((error) => {
                    console.error(error);
                });

        }

        handleSearch()

    }, [debounces])




    return (
        <div >
            <div className={"list-search"}>

                <input type="text"
                    placeholder='Tìm kiếm'
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }} />
                <button type="submit">Search</button>

            </div>
            {results.length > 0 ? <InfiniteScroll
                dataLength={results.length}
                next={getMorePost}
                hasMore={hasMore}
                loader={<h3 style={{ textAlign: "center" }} > Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
            >

                {results.map((photo) => (
                    <Link to={`/photos/${photo.id}`}>
                        <div key={photo.id} className={"item-photo"}>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                            <div>
                                <h3>{photo.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </InfiniteScroll>
                : <h3 style={{ textAlign: "center" }}>Chưa có giá trị .</h3>
                
                }

        </div>
    );
};

export default SearchPhotos;
