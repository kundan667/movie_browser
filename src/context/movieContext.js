import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { isEmpty } from "../utils/commonUtils";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const { setItem, getItem } = useLocalStorage();
    const [selectedGenre, setSelectedGenre] = useState();
    const [year, setYear] = useState();
    const [rating, setRating] = useState();
    const [watchList, setWatchList] = useState([]);

    const handleWatchList = (item) => {
        const storedItems = getItem('watchlist');
        if (!isEmpty(storedItems)) {
            //find if movie is already added to watchlist
            const isMovieAlreadyAdded = storedItems.findIndex((movie) => movie.id === item.id);
            if (isMovieAlreadyAdded === -1) {
                //add to the list
                setItem('watchlist', [...storedItems, item]);
                setWatchList([...storedItems, item])
            }
        } else {
            setItem('watchlist', [item]);
            setWatchList([item]);
        }
    }

    const removeFromWatchList = (item) => {
        let storedItems = getItem('watchlist');
        if (!isEmpty(storedItems)) {
            //find if movie is already added to watchlist
            const itemToBeRemoved = storedItems.findIndex((movie) => movie.id === item.id);
            if (itemToBeRemoved !== -1) {
                //remove to the list
                storedItems.splice(itemToBeRemoved, 1)
                setItem('watchlist', [...storedItems])
                setWatchList([...storedItems])
            }
        } else {
            setItem('watchlist', [item])
            setWatchList([item])
        }
    }

    const values = {
        searchText,
        setSearchText,
        handleWatchList,
        selectedGenre,
        setSelectedGenre,
        removeFromWatchList,
        watchList,
        setWatchList,
        year,
        setYear,
        rating,
        setRating
    }
    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieContext;
