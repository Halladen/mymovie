import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMovieContext } from "./contexts/MovieContext";
import MoviesPopular from "./pages/movies/MoviesPopular";
import MoviesTopRated from "./pages/movies/MoviesTopRated";
import MoviesNowPlaying from "./pages/movies/MoviesNowPlaying";
import MoviesUpcoming from "./pages/movies/MoviesUpcoming";
import TvPopular from "./pages/tv-shows/TvPopular";
import OnTv from "./pages/tv-shows/OnTv";
import TvTopRated from "./pages/tv-shows/TvTopRated";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ViewDetail from "./pages/ViewDetail";
import Watchlist from "./pages/Watchlist";
import SearchQuery from "./pages/SearchQuery";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // return scrollbar to the top position on refresh
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className=" pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:phrase" element={<SearchQuery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movies/popular" element={<MoviesPopular />} />
          <Route path="/movies/top-rated" element={<MoviesTopRated />} />
          <Route path="/movies/now-playing" element={<MoviesNowPlaying />} />
          <Route path="/movies/upcoming" element={<MoviesUpcoming />} />
          <Route path="/tv-shows/popular" element={<TvPopular />} />
          <Route path="/tv-shows/on-tv" element={<OnTv />} />
          <Route path="/tv-shows/top-rated" element={<TvTopRated />} />
          <Route path="/:type/:detail" element={<ViewDetail />} />
          <Route path="/Watchlist" element={<Watchlist />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
