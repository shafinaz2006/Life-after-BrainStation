import React from 'react';
import axios from 'axios';
import './Styles.scss';
import Movie from './Movie';
const IMDB_API = process.env.REACT_APP_IMDB_API;

class Movies extends React.Component {
    state = {
        genre: [],
        genreName: '',
        movieList: [],
        movieListByGenre: [],
        foundMovieListByGenre: false,
    }

    // get all the genre list:

    getGenreList = () => {
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${IMDB_API}`)
            .then(response => {
                // console.log(response.data.genres);
                this.setState({ genre: response.data.genres });
            })
            .catch(error => console.log(''))
    }

    // get whole movie List 

    getMovieList = () => {
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${IMDB_API}&language=en-US&page=1`)
            .then(response => {
                // console.log(response.data.results);
                let movieListData = response.data.results;
                axios
                    .get(`https://api.themoviedb.org/3/movie/popular?api_key=${IMDB_API}&language=en-US&page=2`)
                    .then(response => {
                        let movieListData2 = [...movieListData, ...response.data.results];
                        this.setState({ movieList: movieListData2 });
                        let movieFilter = this.state.movieList.filter(movie => movie.genre_ids.includes(10751))
                        this.setState({ movieListByGenre: movieFilter, foundMovieListByGenre: true, genreName: 'Family' });
                    })
            })
            .catch(error => console.log('Error in movie data', error));
    }

    // handle movie List search:

    handleMovieSearchByGenre = (event, genreId) => {
        let movieFilter = this.state.movieList.filter(movie => movie.genre_ids.includes(genreId))
        this.setState({ movieListByGenre: movieFilter, foundMovieListByGenre: true });
        let genre = this.state.genre.find(genre => genre.id === genreId);
        this.setState({ genreName: genre.name });
        window.scrollTo(0, 0)
    }
    componentDidMount() {
        this.getGenreList();
        this.getMovieList();
    }
    render() {
        return (
            <section className='content'>
                {this.state.genre?
                    <div className='content__genre'>
                        <h2 className='content__subHeading'>List of IMDB movie genres </h2>
                        <ul className='list content__list'>
                            {this.state.genre.map(genre =>
                                <li className='item genreItem' key={genre.id}
                                    onClick={(event) => this.handleMovieSearchByGenre(event, genre.id)}>
                                    {genre.name}
                                </li>
                            )}
                        </ul>
                    </div>
                    : <h2>Loading..</h2>
                }
                {this.state.foundMovieListByGenre ?
                    this.state.movieListByGenre.length > 0 ?
                        <div className='content__result'>
                            {this.state.genreName ?
                                <h2 className='content__subHeading'>Here are some suggestions on "{this.state.genreName}" </h2>
                                : ''
                            }
                            <ul className='list listByGenre'>
                                {this.state.movieListByGenre.map(movie =>
                                    <Movie movie={movie} key={movie.id} />)
                                }
                            </ul>
                        </div>
                        : 
                        <div className='content__result content__result--error'>
                            <h3 className='content__errorHeading'>Oops!!</h3>
                            <h3 className='content__errorHeading'>No movie in "{this.state.genreName}" category. </h3>
                            <h3 className='content__errorHeading'>Try another one!!!</h3>
                        </div>
                    : ''
                }
            </section>
        );
    }
}
export default Movies;