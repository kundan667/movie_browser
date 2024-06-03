import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../data/constants";

export default function Header() {
    const navigate = useNavigate();

    useEffect(() => {
        const headerEl = document.getElementById("header");
        const handleScroll = () => {
            if (window.scrollY >= 180) {
                headerEl.style.backgroundColor = constants.THEME_COLOR_PRIMARY;
            } else {
                headerEl.style.backgroundColor = null;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header className="h-[5rem]">
            <div id="header" className='fixed shadow-xl z-[9999] duration-300 h-auto w-full grid grid-cols-[20%_80%] items-center text-white px-4 sm:px-12 bg-[#00000080] py-2'>
                <div>
                    <img src="/assets/common/logo1.png" loading="lazy" alt="Logo" onClick={() => navigate('/')} className="cursor-pointer w-[50px] sm:w-[70px]" />
                </div>
                <div className='flex items-center gap-2 sm:gap-4 justify-end'>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/advanced-search')}>
                        <span className="text-sm sm:text-base">Advanced search</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/watchlist')}>
                        <img src="/assets/common/watchlist.png" loading="lazy" alt="watchlist icon" className="w-[14px] sm:w-[18px]" />
                        <span className="text-sm sm:text-base">WatchList</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
