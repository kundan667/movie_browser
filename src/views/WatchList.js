import React, { useContext } from 'react'
import Header from '../components/Header'
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import constants from '../data/constants';
import MovieContext from '../context/movieContext';
import { isEmpty } from '../utils/commonUtils';
import { useNavigate } from 'react-router-dom';

function WatchList() {
    const navigate = useNavigate()
    const { getItem } = useLocalStorage();
    const { watchList } = useContext(MovieContext);
    const storedItems = getItem('watchlist');
    let movies = isEmpty(watchList) ? storedItems : watchList
    return (
        <div>
            <Header />
            <div className='px-6 md:px-[4rem] font-bold underline pt-8 mb-4 cursor-pointer' onClick={() => navigate('/')}>Home</div>
            <div className='flex flex-wrap mx-auto mt-2 sm:mt-10 justify-center px-2 md:px-[4rem]'>
                {
                    !isEmpty(movies) ? (
                        movies.map((item) => (
                            <div key={item.id} className='max-w-[300px] px-3 pb-8 basis-1/2 md:basis-1/3 lg:basis-1/4'>
                                <Card imageUrl={`${constants.IMAGE_END_POINT}${item.poster_path}`} data={item} add={false} />
                            </div>
                        ))
                    ) : (
                        <div className='grid'>
                            <h2 className='text-center text-lg mb-8'>No movies in your watchlist</h2>
                            <button className='btn bg-primary text-secondary' onClick={() => navigate('/')}>Home</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default WatchList
