import { useEffect, useRef, useState, useCallback, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import constants from '../data/constants';
import Card from './Card';
import MovieContext from '../context/movieContext';
import { debounce, isEmpty } from '../utils/commonUtils'

function Movies() {
    const { searchText } = useContext(MovieContext);
    const { setItem, getItem } = useLocalStorage();
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef();
    const genreRef = useRef();
    const searchQueryRef = useRef();
    const pageRef = useRef(1);
    const firstLoadSearchRef = useRef(true);
    const options = constants.API_OPTIONS;

    // debounced search
    const debouncedSearch = useCallback(debounce((q) => {
        searchQueryRef.current = `?query=${searchRef.current}&page=${pageRef.current}`; // reset query param
        getMoviesList(searchQueryRef.current, true, true);
    }, 1000), []);


    // getting genre list and saving to local storage
    const getGenre = async () => {
        const storedGenre = getItem('genre');
        setGenre(storedGenre);
        if (storedGenre) return
        try {
            const res = await fetch(constants.GENRE_API_END_POINT, options);
            const response = await res.json();
            setItem('genre', response.genres);
            setGenre(response.genres);
        } catch (error) {
            console.error(error)
        }
    }

    // handles search input for movies
    useEffect(() => {
        searchRef.current = searchText;
        if (firstLoadSearchRef.current) {
            firstLoadSearchRef.current = false;
            return
        }
        pageRef.current = 1;
        searchQueryRef.current = `?query=${searchRef.current}&page=${pageRef.current}`; // reset query param
        if (!isEmpty(searchText)) {
            debouncedSearch(searchText);
        } else {
            getMoviesList(searchQueryRef.current, false, true);
        }
    }, [searchText, debouncedSearch])

    // get movies after genre is received from api
    useEffect(() => {
        if (!genre) return
        getMoviesList();
    }, [genre]);

    // handles api call for movies with query params
    const getMoviesList = async (query = '', isSearch = false, reset = false) => {
        try {
            let url = isSearch ? constants.SEARCH_END_POINT : constants.MOVIE_END_POINT;
            setIsLoading(true);
            const res = await fetch(`${url}${query}`, options);
            const response = await res.json();
            setIsLoading(true)
            pageRef.current = response.page;
            if (!reset) setMovies(prev => [...prev, ...response.results])
            else setMovies(response.results)
            setItem('movies', response);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getGenre();
    }, []);

    // handles scroll for infinte scrolling
    useEffect(() => {
        const handleScroll = () => {
            let parentEl = document.getElementById("movie-container");
            let boundedRect = parentEl.getBoundingClientRect();

            if (Math.round(Math.abs(boundedRect.top)) + window.innerHeight >= parentEl.scrollHeight) {
                pageRef.current++;
                if (!isEmpty(searchRef.current)) {
                    searchQueryRef.current = `?query=${searchRef.current}&page=${pageRef.current}`; // reset query param
                    getMoviesList(searchQueryRef.current, true)
                } else {
                    let genreQ = !isEmpty(genreRef.current) ? `&with_genres=${genreRef.current}` : ''
                    let query = `?page=${pageRef.current}${genreQ}`;
                    getMoviesList(query);
                }
            }
            // if (window.innerHeight + window.scrollY >= parentEl.scrollHeight) {
            //     console.log("end");
            //     debouncedSearch();
            // }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <div id="movie-container">
                <div className='flex flex-wrap mx-auto mt-2 sm:mt-10 justify-items-start px-2 md:px-[4rem]'>
                    {
                        movies.map((item, index) => (
                            <div key={item.id} className='max-w-[300px] px-3 pt-8 basis-1/2 md:basis-1/4 lg:basis-1/5'>
                                <Card imageUrl={`${constants.IMAGE_END_POINT}${item.poster_path}`} data={item} />
                            </div>

                        ))
                    }
                </div>
            </div>
            {
                isLoading && (<div>Loading...</div>)
            }
        </div>
    )
}
export default Movies
