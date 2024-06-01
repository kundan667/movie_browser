import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className='grid grid-cols-[20%_80%] items-center text-white px-4 sm:px-12 bg-header-gradient py-2'>
            <div>
                <img src="/assets/common/logo1.png" loading="lazy" alt="Logo" onClick={() => navigate('/')} className="cursor-pointer w-[50px] sm:w-[70px]" />
            </div>

            <div className='flex items-center gap-2 sm:gap-4 justify-end'>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/advanced-search')}>
                    <span className="text-sm sm:text-base">Advanced search</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/watchlist')}>
                    <img src="/assets/common/watchlist.png" loading="lazy" alt="watchlsi icon" className="w-[14px] sm:w-[18px]" />
                    <span className="text-sm sm:text-base">WatchList</span>
                </div>
            </div>
        </header>
    )
}
