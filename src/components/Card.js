import React, { useContext } from 'react';
import MovieContext from "../context/movieContext";
import { getGenreById, isEmpty } from '../utils/commonUtils';

function Card({ imageUrl, data, add = true }) {
    const { handleWatchList, removeFromWatchList } = useContext(MovieContext);
    function handleError(img) {
        img.target.src = "/assets/common/no-movie.png";
        img.alt = "Image failed to load";
    }
    return (
        <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden relative h-full w-full">
            <figure className='w-full h-full'>
                <img src={imageUrl} loading="lazy" alt="Shoes" className="w-full h-full object-cover" onError={(e) => handleError(e)} />
            </figure>
            <div className="card-body w-full absolute bottom-0 left-0 text-left p-3 text-gray-100 bg-card-body-gradient pt-[3rem] block leading-none">
                <div className='flex items-center justify-between pb-1'>
                    <h2 className="card-title font-semibold text-xl overflow-hidden block whitespace-nowrap truncate pr-[1rem] w-[80%]">{data.title}</h2>
                    <div className='flex items-center justify-center w-[20%]'>
                        <img src="/assets/common/star.png" loading="lazy" alt="star" width={13} className='mr-1' />
                        <span className='font-bold'>{data.vote_average.toFixed(1)}</span>
                    </div>
                </div>
                <div className='text-xs'>{data.release_date.split('-')[0]}</div>
                <div className='mb-2 font-bold text-xs'>{!isEmpty(data?.genre_ids) && getGenreById(data.genre_ids).join(' ')}</div>
                {/* <div className='mb-2 font-bold text-xs'>{JSON.stringify(data.genre_ids)}</div> */}
                <div className="card-actions">
                    {
                        add ? (
                            <button className={`btn btn-xs bg-secondary border-secondary text-xs`} onClick={() => handleWatchList(data)}>Add to watchlist</button>
                        ) : (
                            <button className={`btn btn-xs bg-secondary border-secondary`} onClick={() => removeFromWatchList(data)}>Remove</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Card
