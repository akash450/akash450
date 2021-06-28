import React from 'react'

const Movies = (props) => {

    return (
        <div>
            {
                props.movies.map(
                (movie, index) =>
                <div className="image-container">
                    <img src={movie.Poster} alt='movie'></img>
                </div>
            )}
        </div>
    )
}

export default Movies
