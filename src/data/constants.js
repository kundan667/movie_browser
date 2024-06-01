const AUTHORIZATION = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDk2ZmY0M2IzOTA1ZmQ3OTY5MTI1ODkxYjFhOGM5NiIsInN1YiI6IjY2NTVlYzFjMThmZThiMDcwNTM2MTA1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rV8GNmfZEiYBUJGm_KDx6RLlTSyaqTmIu27CVYZQUGQ";
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_END_POINT = BASE_URL + "/discover/movie";
const GENRE_API_END_POINT = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const IMAGE_END_POINT = "https://image.tmdb.org/t/p/w500/";
const SEARCH_END_POINT = BASE_URL + "/search/movie"
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: AUTHORIZATION
    }
};

const THEME_COLOR_PRIMARY = "#e4511a";
const THEME_COLOR_SECONDARY = "#fafbdd";

export default {
    AUTHORIZATION,
    BASE_URL,
    GENRE_API_END_POINT,
    IMAGE_END_POINT,
    API_OPTIONS,
    MOVIE_END_POINT,
    SEARCH_END_POINT,
    THEME_COLOR_PRIMARY,
    THEME_COLOR_SECONDARY
}