import React, {useState, useEffect} from 'react'
// import Movies from './components/Movies';
import Search from './Search';
import './index.css';

const App = () => {
  const [searchVal, setSearchVal] = useState('');
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async(searchVal) => {
    const url = `http://www.omdbapi.com/?s=${searchVal}&apikey=296590e5`
    const response = await fetch(url);

    const responseJson = await (response.json());

    // console.log(responseJson)

    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  };

  useEffect(() => {getMovieRequest(searchVal);}, [searchVal])

  const isMovie = (movie) => {
    // console.log(movie.Type)
    if (movie.Type === "movie" && movie.Poster !== "N/A") {
      return true;
    }
    return false;
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Search App</h1>
        {
        <Search searchVal={searchVal} setSearchVal={setSearchVal}/>
        }
      </header>
      <main>
        <div>
              {
                  movies.map(
                  (movie, index) =>
                    isMovie(movie) ?
                    <div className="image-container">
                        <img src={movie.Poster} alt='movie'></img>
                    </div> : null
                    // console.log("no movies")
              )}
          </div>
      </main>
    </div>
  )
}
export default App






