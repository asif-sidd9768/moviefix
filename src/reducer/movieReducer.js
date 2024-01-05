import { OPEN_SEARCH_MODAL, SET_ALL_GENRE, SET_CURRENT_YEAR, SET_GENRES, SET_GENRE_PAGE, SET_IS_LOADING, SET_MOVIES, SET_SEARCH_MOVIES, SET_SEARCH_PARAM, SET_SELECTED_GENRE, SET_TOTAL_PAGES, UPDATE_SEARCH_PAGE } from "../actions/movieTypes"

export const initialState = {
  moviesData: [],
  genres: [],
  totalPages: null ,
  currentYear: 2012,
  currentPageGenre: 1,
  isLoading: false,
  error: null,
  selectedGenre: null,
  searchParam: null,
  isModalOpen: false,
  searchMoviesData: [],
  searchMoviesPages: 1
}

export const movieReducer = (state, action) => {
  switch(action.type){
    case SET_MOVIES: 
      return {...state, moviesData: action.payload, isLoading: false}
    case SET_TOTAL_PAGES:
      return{...state, totalPages: action.payload}
    case SET_CURRENT_YEAR:
      return {...state, currentYear: action.payload}
    case SET_SELECTED_GENRE:
      return {...state, selectedGenre: action.payload}
    case SET_GENRES:
      return {...state, genres: [{"id": 9999, "name": "All"}].concat(action.payload)}
    case SET_GENRE_PAGE:
      return {...state, currentPageGenre: action.payload}
    case SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case SET_ALL_GENRE: {
      return {...initialState, genres: state.genres}
    }
    case OPEN_SEARCH_MODAL: {
      return {...state, isModalOpen: action.payload}
    }
    case SET_SEARCH_PARAM: 
      return {...state, searchParam: action.payload}
    case SET_SEARCH_MOVIES: 
      return {...state, searchMoviesData: action.payload}
    case UPDATE_SEARCH_PAGE:
      return {...state, searchMoviesPages: action.payload}
  }
}