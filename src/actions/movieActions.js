import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function moviesFetched(movies){
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie){
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie){
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function fetchMovies(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                /*res.result.forEach(function(e) {
                    if (e.reviews) {
                        //console.log("Num reviews: "+e.reviews.length);
                        let total = 0;
                        let num = e.reviews.length;
                        if (num > 0) {
                            for (let i = 0; i < e.reviews.length; i++) {
                                total += e.reviews[i].rating;
                            }
                            e = Object.assign({}, e, {avgRating: total/num});
                        }
                        else {
                            e = Object.assign({}, e, {avgRating: 0});
                        }
                        console.log("movie: " + JSON.stringify(e));
                    }
                });*/
                dispatch(moviesFetched(res.result));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchMovie(movieId){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                let movie = res.result[0];
                /*if (movie.reviews) {
                    //console.log("Num reviews: "+res.result.reviews.length);
                    let total = 0;
                    let num = movie.reviews.length;
                    if (num > 0) {
                        for (let i = 0; i < movie.reviews.length; i++) {
                            total += movie.reviews[i].rating;
                        }
                        movie = Object.assign({}, movie, {avgRating: total/num});
                    }
                    else {
                        movie = Object.assign({}, movie, {avgRating: 0});
                    }
                }*/
                //console.log("movie: " + JSON.stringify(movie));
                dispatch(movieFetched(movie));
            })
            .catch( (e) => console.log(e) );
    }
}