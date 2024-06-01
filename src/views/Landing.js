import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'

function Landing() {
    return (
        <div className="App" >
            <div className='relative bg-cover bg-no-repeat before:absolute before:backdrop-blur-sm before:inset-0 before:brightness-50'
                style={{ backgroundImage: 'url(/assets/common/movie_bg_1.jpeg)' }}
            >
                <div className='relative'>
                    <Header />
                    <Hero />
                </div>
            </div>
            <Movies />
        </div>
    )
}

export default Landing
