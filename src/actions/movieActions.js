import { OPEN_SEARCH_MODAL, SET_ALL_GENRE, SET_CURRENT_YEAR, SET_GENRES, SET_GENRE_PAGE, SET_IS_LOADING, SET_MOVIES, SET_SEARCH_MOVIES, SET_SEARCH_PARAM, SET_SELECTED_GENRE, SET_TOTAL_PAGES, UPDATE_SEARCH_PAGE } from "./movieTypes"

export const setMoviesAction = (movies) => ({
  type: SET_MOVIES,
  payload: movies
})

export const setIsLoading = (state) => ({
  type: SET_IS_LOADING,
  payload: state
})

export const setTotalPages = (totalPages) => ({
  type: SET_TOTAL_PAGES,
  payload: totalPages
})

export const setCurrentYearAction =  (newYear) => ({
  type: SET_CURRENT_YEAR,
  payload: newYear
})

export const setGenresAction = (genres) => ({
  type: SET_GENRES,
  payload: genres
})

export const setSelectedGenre = (selectedGenre) => ({
  type: SET_SELECTED_GENRE,
  payload: selectedGenre
})

export const setCurrentGenrePageAction = (page) => ({
  type:SET_GENRE_PAGE,
  payload: page
})

export const setAllGenreAction = () => ({
  type: SET_ALL_GENRE
})

export const openSearchModalAction = (modal) => ({
  type: OPEN_SEARCH_MODAL,
  payload: modal
})

export const setSearchParamAction = (searchParam) => ({
  type: SET_SEARCH_PARAM,
  payload: searchParam
})

export const setSearchMoviesAction = (searchList) => ({
  type: SET_SEARCH_MOVIES,
  payload: searchList
})

export const setSearchMoviesPageAction = (searchPage) => ({
  type: UPDATE_SEARCH_PAGE,
  payload: searchPage
})