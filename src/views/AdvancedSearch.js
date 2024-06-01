import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
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
    const [yearArr2, setYearArr2] = useState(yearArr);
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const star1Ref = useRef('');
    const star2Ref = useRef('');
    const year1Ref = useRef('');
    const year2Ref = useRef('');
    const genreRef = useRef([]);
    const pageRef = useRef(1);
    const isReset = useRef(false);
    const [showFilter, setShowFilter] = useState(false);

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
        star2Ref.current = '';
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
        setYearArr2([...arr]);
        isReset.current = true;
        year2Ref.current = '';
        handleQuery()
    }

    const handleYear2 = (e) => {
        year2Ref.current = e.target.value;
        isReset.current = true;
        handleQuery();
    }

    const handleGenre = useCallback((e) => {
        e.stopPropagation();
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
    }, [])

    useEffect(() => {
        if (isEmpty(query)) return
        getMoviesList();
    }, [query]);


    const getMoviesList = async () => {
        try {
            // setIsLoading(true);
            const res = await fetch(`${constants.MOVIE_END_POINT}${query}`, options);
            const response = await res.json();
            if (isReset.current) {
                setMovies(response.results)
            } else {
                setMovies(prev => [...prev, ...response.results])
            }
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

    const SelectBox = ({ optionArr, func, idType, suffix, value }) => {
        return (
            <select className="select select-bordered w-full max-w-xs" onChange={func} value={value}>
                <option disabled value={''}></option>
                {
                    optionArr.map((item) => (
                        <option key={`${item.id}-${idType}`} value={item.id}>
                            {item.name} {suffix}
                        </option>
                    ))
                }
            </select>
        )
    }

    const Filters = memo(() => {
        console.log("RENDER");
        return (
            <>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        Click me to show/hide content
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                        <input type="checkbox" defaultChecked className="checkbox" />
                    </div>
                </div>

                {/* Genre */}
                <div className="collapse collapse-arrow bg-gray-50 mb-2 collapse-open">
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
                {/* <div className="collapse collapse-arrow  bg-gray-50 mb-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-medium">
                        Rating
                    </div>
                    <div className="collapse-content">
                        <div className='flex gap-2'>
                            <SelectBox
                                optionArr={starArr}
                                func={handleStar1}
                                idType={'star1'}
                                suffix={'★'}
                                value={star1Ref.current}
                            />
                            <SelectBox
                                optionArr={starArr2}
                                func={handleStar2}
                                idType={'star2'}
                                suffix={'★'}
                                value={star2Ref.current}
                            />
                        </div>
                    </div>
                </div> */}

                {/* Release Year */}
                {/* <div className="collapse collapse-arrow  bg-gray-50 mb-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-medium">
                        Release Year
                    </div>
                    <div className="collapse-content">
                        <div className='flex gap-2'>
                            <SelectBox
                                optionArr={yearArr}
                                func={handleYear1}
                                idType={'year1'}
                                suffix={''}
                                value={year1Ref.current}
                            />
                            <SelectBox
                                optionArr={yearArr2}
                                func={handleYear2}
                                idType={'year2'}
                                suffix={''}
                                value={year2Ref.current}
                            />
                        </div>
                    </div>
                </div> */}
            </>
        )
    })

    return (
        <div className="" >
            <Header />
            <div className='flex justify-between px-6 md:px-[4rem] pt-8 mb-4' >
                <div className="font-bold underline cursor-pointer" onClick={() => navigate('/')}>Home</div>
                {/* <img src="/assets/common/filter.png" alt="filter icon" className='sm:hidden w-[1.5rem] cursor-pointer' onClick={handleFilterClick} /> */}
            </div>
            <div className='grid grid-cols-[100%] sm:grid-cols-[30%_70%] px-2 sm:px-[3rem] mt-8'>
                <div className='px-4'>
                    {/* Genre */}
                    <div className="collapse collapse-arrow bg-gray-50 mb-2">
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
                                <SelectBox
                                    optionArr={starArr}
                                    func={handleStar1}
                                    idType={'star1'}
                                    suffix={'★'}
                                    value={star1Ref.current}
                                />
                                <SelectBox
                                    optionArr={starArr2}
                                    func={handleStar2}
                                    idType={'star2'}
                                    suffix={'★'}
                                    value={star2Ref.current}
                                />
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
                                <SelectBox
                                    optionArr={yearArr}
                                    func={handleYear1}
                                    idType={'year1'}
                                    suffix={''}
                                    value={year1Ref.current}
                                />
                                <SelectBox
                                    optionArr={yearArr2}
                                    func={handleYear2}
                                    idType={'year2'}
                                    suffix={''}
                                    value={year2Ref.current}
                                />
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

export default AdvancedSearch;

// const SelectBox = ({ optionArr, func, idType, suffix, value }) => {
//     return (
//         <select className="select select-bordered w-full max-w-xs" onChange={func} value={value}>
//             <option disabled value={''}></option>
//             {
//                 optionArr.map((item) => (
//                     <option key={`${item.id}-${idType}`} value={item.id}>
//                         {item.name} {suffix}
//                     </option>
//                 ))
//             }
//         </select>
//     )
// }

// const Filters = memo(({ genre, handleGenre, handleStar1, star1Ref }) => {
//     console.log("RENDER");
//     return (
//         <>
//             {/* Genre */}
//             <div className="collapse collapse-arrow bg-gray-50 mb-2 collapse-open">
//                 <input type="checkbox" />
//                 <div className="collapse-title font-medium">
//                     Genre
//                 </div>
//                 <div className="collapse-content">
//                     <div className='flex flex-wrap gap-2'>
//                         {
//                             genre.map((item) => (
//                                 <div key={item.id} className='rounded-full border border-gray-600 px-3 py-1 flex items-center gap-4 cursor-pointer select-none text-gray-600'>
//                                     <span>{item.name}</span>
//                                     <input type="checkbox" value={item.id}
//                                         onChange={handleGenre}
//                                         className="checkbox checkbox-xs border-gray-600  [--chkfg:#e5e7eb]" />
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </div>

//             {/* Rating */}
//             <div className="collapse collapse-arrow  bg-gray-50 mb-2">
//                 <input type="checkbox" />
//                 <div className="collapse-title font-medium">
//                     Rating
//                 </div>
//                 <div className="collapse-content">
//                     <div className='flex gap-2'>
//                         <SelectBox
//                             optionArr={starArr}
//                             func={handleStar1}
//                             idType={'star1'}
//                             suffix={'★'}
//                             value={star1Ref.current}
//                         />
//                         <SelectBox
//                             optionArr={starArr2}
//                             func={handleStar2}
//                             idType={'star2'}
//                             suffix={'★'}
//                             value={star2Ref.current}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Release Year */}
//             {/* <div className="collapse collapse-arrow  bg-gray-50 mb-2">
//                 <input type="checkbox" />
//                 <div className="collapse-title font-medium">
//                     Release Year
//                 </div>
//                 <div className="collapse-content">
//                     <div className='flex gap-2'>
//                         <SelectBox
//                             optionArr={yearArr}
//                             func={handleYear1}
//                             idType={'year1'}
//                             suffix={''}
//                             value={year1Ref.current}
//                         />
//                         <SelectBox
//                             optionArr={yearArr2}
//                             func={handleYear2}
//                             idType={'year2'}
//                             suffix={''}
//                             value={year2Ref.current}
//                         />
//                     </div>
//                 </div>
//             </div> */}
//         </>
//     )
// })
