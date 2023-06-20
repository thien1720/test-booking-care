import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";

import useDeboune from '../common/useHookDeboune';
import "./style.css"
import { Link } from 'react-router-dom';

const SearchPhotos = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(10);
    const debounces = useDeboune(query, 500)

    const [totalResult, setTotalResult] = useState(results.length)
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    console.log(results)
    const getMorePost = async () => {
        await setTotalResult(totalResult + 10)
        const apiKey = 'AIzaSyBnTvzWPFc-QWTG7kV0izEDIRa6RDIumt0';
        const cx = '40aa84b50e4a84ad1';
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${debounces}&start=${totalResult}`

        axios.get(url)
            .then((response) => {
                setLoading(false);
                setResults((prevResults) => [...prevResults, ...response.data.items]);
            })
            .catch((error) => {
                console.error(error);
            });
        console.log("re")
    };

    useEffect(() => {
        if (!debounces.trim()) {
            setResults([])
            return
        }
        const handleSearch = async () => {

            // Thực hiện tìm kiếm khi người dùng nhập vào input
            const apiKey = 'AIzaSyBnTvzWPFc-QWTG7kV0izEDIRa6RDIumt0';
            const cx = '40aa84b50e4a84ad1';
            const url1 = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${debounces}`
            const url2 = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${debounces}&start=${page}`


            axios.get(url1)
                .then((response) => {
                    setLoading(false);
                    setResults((prevResults) => [...prevResults, ...response.data.items]);
                })
                .catch((error) => {
                    console.error(error);
                });

            axios.get(url2)
                .then((response) => {
                    setLoading(false);
                    setResults((prevResults) => [...prevResults, ...response.data.items]);
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

                {results.map((photo) => {
                    
                    return <Link to={`/photos/${photo.title}`} key={photo.cacheId}>
                        <div className={"item-photo"}>
                            {photo.pagemap.cse_image.length ?
                                <img src={photo.pagemap.cse_image[0].src} alt={photo.title} />
                                : <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/10-anh-dai-dien-trang-inkythuatso-03-15-27-10.jpg" alt={photo.title} />

                            }
                            <div>
                                <h3>{photo.title}</h3>
                                <p>{photo.htmlTitle}</p>
                            </div>
                        </div>
                    </Link>
                }
                )}
            </InfiniteScroll>
                : <h3 style={{ textAlign: "center" }}>Chưa có giá trị .</h3>

            }

        </div>
    );
};

export default SearchPhotos;
