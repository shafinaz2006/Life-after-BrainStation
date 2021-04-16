import './Styles.scss';

function Movie({movie}){
    return(
        <section className="flip-card" key={movie.id}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt='movie poster'
                        className='section__poster' />
                </div>
                <div className="flip-card-back">
                    <h3 className='flip-card-back__heading'>{movie.title}</h3>
                    <p className='flip-card-back__author rating'>Rating: {movie.vote_average}</p>
                    <p className='flip-card-back__desc'>
                        {movie.overview.length > 200 ?
                            movie.overview.slice(0, 100) + '...' : movie.overview}</p>
                </div>
            </div>
        </section>
    )
}
export default Movie;