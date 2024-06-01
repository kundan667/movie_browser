import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import useLocalStorage from '../hooks/useLocalStorage';
import { generateObjects, isEmpty } from '../utils/commonUtils';
import constants from '../data/constants';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const starArr = generateObjects(1, 10);
const yearArr = generateObjects('1980', new Date().getFullYear());
const options = constants.API_OPTIONS;

function AdvancedSearch() {
    const navigate = useNavigate();
    const { getItem } = useLocalStorage();
    const genre = getItem('genre');
    const [starArr2, setStarArr2] = useState(starArr);
    const [yearArr1, setYearArr1] = useState(yearArr);
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const star1Ref = useRef();
    const star2Ref = useRef();
    const year1Ref = useRef();
    const year2Ref = useRef();
    const genreRef = useRef([]);
    const pageRef = useRef(1);
    const isReset = useRef(false);

    const handleQuery = () => {
        let rating1 = isEmpty(star1Ref.current) ? '' : `&vote_average.gte=${star1Ref.current}`;
        let rating2 = isEmpty(star2Ref.current) ? '' : `&vote_average.lte=${star2Ref.current}`;
        let ratingQ = rating1 + rating2;
        let genreQ = isEmpty(genreRef.current) ? '' : `&with_genres=${genreRef.current}`;
        let year1 = isEmpty(year1Ref.current) ? '' : `&primary_release_date.gte=${year1Ref.current}-01-01`;
        let year2 = isEmpty(year2Ref.current) ? '' : `&primary_release_date.lte=${year2Ref.current}-01-01`;
        let yearQ = year1 + year2;
        let pageQ = isEmpty(pageRef.current) ? '' : `&page=${pageRef.current}`;
        let finalQ = `${ratingQ}${genreQ}${yearQ}${pageQ}`;
        setQuery(!isEmpty(finalQ) ? `?${finalQ.substring(1)}` : '');
    }
    const handleStar1 = (e) => {
        star1Ref.current = e.target.value;
        let arr = starArr.filter((item) => parseInt(item.id) >= parseInt(star1Ref.current));
        setStarArr2([...arr]);
        isReset.current = true;
        handleQuery();
    }

    const handleStar2 = (e) => {
        star2Ref.current = e.target.value;
        isReset.current = true;
        handleQuery();
    }

    const handleYear1 = (e) => {
        year1Ref.current = e.target.value;
        let arr = yearArr.filter((item) => parseInt(item.id) >= parseInt(year1Ref.current));
        setYearArr1([...arr]);
        isReset.current = true;
        handleQuery()
    }

    const handleYear2 = (e) => {
        year2Ref.current = e.target.value;
        isReset.current = true;
        handleQuery();
    }

    const handleGenre = (e) => {
        if (e.target.checked) {
            //add
            genreRef.current.push(e.target.value);
        } else {
            // remove
            let isFound = genreRef.current.findIndex(d => d === e.target.value);
            if (isFound !== -1) {
                genreRef.current.splice(isFound, 1);
            }
        }
        isReset.current = true;
        handleQuery()
    }

    useEffect(() => {
        if (isEmpty(query)) return
        getMoviesList();
    }, [query]);


    const getMoviesList = async () => {
        try {
            // setIsLoading(true);
            const res = await fetch(`${constants.MOVIE_END_POINT}${query}`, options);
            const response = await res.json();
            // console.log("response:", response.results);
            if (isReset.current) {
                setMovies(response.results)
            } else {
                setMovies(prev => [...prev, ...response.results])
            }
            // setIsLoading(true)
            // pageRef.current = response.page;
            // if (!reset) setMovies(prev => [...prev, ...response.results])
            // else setMovies(response.results)
            // setItem('movies', response);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            let parentEl = document.getElementById("movie-container");
            let boundedRect = parentEl.getBoundingClientRect();

            if (Math.round(Math.abs(boundedRect.top)) + window.innerHeight >= parentEl.scrollHeight) {
                pageRef.current++;
                isReset.current = false;
                handleQuery();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        getMoviesList();
    }, [])

    return (
        <div className="" >
            <Header />
            <div className='px-6 md:px-[4rem] font-bold underline pt-8 mb-4 cursor-pointer' onClick={() => navigate('/')}>Home</div>
            <div className='grid grid-cols-[30%_70%] px-[3rem] mt-8'>
                <div className='px-4'>
                    {/* Genre */}
                    <div className="collapse collapse-arrow  bg-gray-50 mb-2">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                            Genre
                        </div>
                        <div className="collapse-content">
                            <div className='flex flex-wrap gap-2'>
                                {
                                    genre.map((item) => (
                                        <div key={item.id} className='rounded-full border border-gray-600 px-3 py-1 flex items-center gap-4 cursor-pointer select-none text-gray-600'>
                                            <span>{item.name}</span>
                                            <input type="checkbox" value={item.id}
                                                onChange={handleGenre}
                                                className="checkbox checkbox-xs border-gray-600  [--chkfg:#e5e7eb]" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="collapse collapse-arrow  bg-gray-50 mb-2">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                            Rating
                        </div>
                        <div className="collapse-content">
                            <div className='flex gap-2'>
                                <select className="select select-bordered w-full max-w-xs" onChange={handleStar1}>
                                    <option disabled selected></option>
                                    {
                                        starArr.map((item) => (
                                            <option key={`${item.id}-star1`} value={item.id}>
                                                {item.name} ★
                                            </option>
                                        ))
                                    }
                                </select>

                                <select className="select select-bordered w-full max-w-xs" onChange={handleStar2}>
                                    <option disabled selected></option>
                                    {
                                        starArr2.map((item) => (
                                            <option key={`${item.id}-star2`} value={item.id} >
                                                {item.id} ★
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Release Year */}
                    <div className="collapse collapse-arrow  bg-gray-50 mb-2">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                            Release Year
                        </div>
                        <div className="collapse-content">
                            <div className='flex gap-2'>
                                {/* <input type="text" min="4"
                                    max="4" pattern="[4-9]*"
                                    maxlength="4"
                                    onChange={handleChange}
                                    placeholder={`${new Date().getFullYear()}`}
                                    className="input input-bordered w-full max-w-xs" />
                                <input type="text" min="0"
                                    max="4" pattern="[0-9]*" maxlength="4" placeholder={`${new Date().getFullYear()}`} className="input input-bordered w-full max-w-xs" /> */}

                                <select className="select select-bordered w-full max-w-xs" onChange={handleYear1}>
                                    <option disabled selected></option>
                                    {
                                        yearArr.map((item) => (
                                            <option key={`${item.id}-year1`} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>

                                <select className="select select-bordered w-full max-w-xs" onChange={handleYear2}>
                                    <option disabled selected></option>
                                    {
                                        yearArr1.map((item) => (
                                            <option key={`${item.id}-year2`} value={item.id}>
                                                {item.id}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-4' id="movie-container">

                    {
                        !isEmpty(movies) ? (
                            <div className='flex flex-wrap mx-auto justify-items-start'>
                                {
                                    movies.map((item, index) => (
                                        <div key={item.id} className='max-w-[300px] px-3 pb-8 basis-1/2 md:basis-1/2 lg:basis-1/3'>
                                            <Card imageUrl={`${constants.IMAGE_END_POINT}${item.poster_path}`} data={item} />
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='text-center text-xl'>No movies</div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default AdvancedSearch
