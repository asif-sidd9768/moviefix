import { createContext, useReducer } from "react";
import { initialState, movieReducer } from "../reducer/movieReducer";
import {
  setCurrentGenrePageAction,
  setCurrentYearAction,
  setGenresAction,
  setInitialMoviesAction,
  setIsLoading,
  setMoviesAction,
  setSearchMoviesAction,
  setSearchMoviesPageAction,
  setTotalPages,
} from "../actions/movieActions";

export const MovieContext = createContext();
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const fetchData = async (newYear = null) => {
    try {
      dispatch(setIsLoading(true));
      const { currentYear, moviesData, totalPages:totalPagesOnMovie } = state;
      const currentYearNumber = new Date().getFullYear()
      if(currentYearNumber === currentYear){
        return
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${
          newYear || currentYear
        }&page=1&vote_count.gte=100`
      );
      const { results, totalPages } = await response.json();
      const toUpdate = { data: results, title: newYear || currentYear };
      const newData = moviesData.concat(toUpdate);
      dispatch(setMoviesAction(newData));
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchGenre = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d"
      );
      const { genres } = await response.json();
      dispatch(setGenresAction(genres));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const fetchMoviesOnGenre = async () => {
    if (state.isLoading && state.selectedGenre === null) {
      return;
    }
    try {
      dispatch(setIsLoading(true));
      const { moviesData, currentPageGenre, selectedGenre, totalPages: totalPagesOnGenre } = state;
      if(totalPagesOnGenre === currentPageGenre){
        return
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&page=${currentPageGenre}&with_genres=${selectedGenre.id}`
      );
      const { results, totalPages } = await response.json();
      if (currentPageGenre === 1) {
        const newData = results;
        dispatch(setMoviesAction(newData));
      } else {
        const newData = moviesData.concat(results);
        dispatch(setMoviesAction(newData));
      }
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      console.log("error =", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchMovieBasedOnSearch = async () => {
    try {
      dispatch(setIsLoading(true))
      const { searchParam, searchMoviesPages, searchMoviesData } = state;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchParam}&api_key=2dca580c2a14b55200e784d157207b4d&page=${searchMoviesPages}`
      );
      const { results, totalPages } = await response.json();
      if (searchMoviesPages === 1) {
        const newData = results;
        dispatch(setSearchMoviesAction(newData));
      } else {
        const newData = searchMoviesData.concat(results);
        dispatch(setSearchMoviesAction(newData));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false))
    }
  };

  const fetchNewGenre = async () => {
    if (!state.isLoading) {
      dispatch(setCurrentGenrePageAction(state.currentPageGenre + 1));
    }
  };

  const fetchNextPage = async () => {
    if (!state.isLoading) {
      dispatch(setCurrentYearAction(state.currentYear + 1));
      await fetchData(state.currentYear + 1);
    }
  };

  const fetchNextSearchPage = async () => {
    console.log("CALLED ")
    if (!state.isLoading) {
      dispatch(setSearchMoviesPageAction(state.searchMoviesPages + 1));
      // await fetchMovieBasedOnSearch(state.searchMoviesPages + 1);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        state,
        dispatch,
        fetchData,
        fetchNewGenre,
        fetchNextPage,
        fetchGenre,
        fetchMoviesOnGenre,
        fetchMovieBasedOnSearch,
        fetchNextSearchPage
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
