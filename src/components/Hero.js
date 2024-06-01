import { useContext } from "react";
import MovieContext from "../context/movieContext";

function Hero() {
    const { searchText, setSearchText } = useContext(MovieContext);
    return (
        <>
            <div className="grid justify-items-center content-center min-h-[150px] sm:min-h-[170px] text-gray-100 pt-[2rem] pb-[2rem] sm:pt-[4rem] sm:pb-[8rem]">
                <label className={`w-[80%] bg-transparent border border-white focus-within:border-primary rounded-full input input-bordered flex items-center gap-2 justify-center px-4`}>
                    <input type="text"
                        className="grow focus:!outline-none focus-within:border-red-50 focus:border-white bg-transparent h-[2.5rem]"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <img src="/assets/common/close.png" loading="lazy" alt="" width={10} className='cursor-pointer'
                        onClick={() => setSearchText('')}
                    />
                </label>
                <h1 className="text-2xl sm:text-5xl px-2 uppercase font-bold text-primary my-8">Explore the World of Movies</h1>
            </div>
            {/* <Movies /> */}
        </>
    )
}

export default Hero
