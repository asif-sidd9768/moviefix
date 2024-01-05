import { useContext } from "react"
import { Button, StyleSheet, TextInput, View } from "react-native"
import { MovieContext } from "../../../context/MovieContext"
import { setSearchMoviesPageAction, setSearchParamAction } from "../../../actions/movieActions"

const SearchForm = () => {
  const {state:{searchParam}, dispatch, fetchMovieBasedOnSearch} = useContext(MovieContext)
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        style={styles.input}
        onChangeText={nextText => dispatch(setSearchParamAction(nextText))}
        value={searchParam}
        placeholder="Enter movies title..."
      />
      <Button title="Search" onPress={() => {
        fetchMovieBasedOnSearch()
        dispatch(setSearchMoviesPageAction(1))
        }} 
      />
    </View>
  )
}

export default SearchForm

const styles = StyleSheet.create({
  input: {
    height: 40,
    minWidth: 200,
    maxWidth: '70%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})