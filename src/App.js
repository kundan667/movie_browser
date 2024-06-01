import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovieContextProvider } from './context/movieContext';
import Landing from './views/Landing';
import WatchList from './views/WatchList';
import './App.css';
import AdvancedSearch from './views/AdvancedSearch';

function App() {
  return (
    <MovieContextProvider>
      <BrowserRouter>
        <Routes >
          <Route path='/'
            element={<Landing />}>
          </Route>
        </Routes>

        <Routes >
          <Route path='/watchlist'
            element={<WatchList />}>
          </Route>
        </Routes>

        <Routes >
          <Route path='/advanced-search'
            element={<AdvancedSearch />}>
          </Route>
        </Routes>

      </BrowserRouter>
    </MovieContextProvider>
  );
}

export default App;
