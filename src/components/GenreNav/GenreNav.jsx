import { useContext } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MovieContext } from "../../context/MovieContext"
import { setAllGenreAction, setSelectedGenre } from "../../actions/movieActions"

const GenreNav = ()=> {
  const {state: {genres, selectedGenre}, dispatch, fetchMoviesOnGenre} = useContext(MovieContext)

  const handleGenreSelected = (item) => {
    console.log(item)
    if(item.id === 9999){
      dispatch(setAllGenreAction())
    }else {
      dispatch(setSelectedGenre(item)) 
    }
  }


  const renderItem = ({item}) => {
    const isActive = (selectedGenre && item.id === selectedGenre.id) || (!selectedGenre && item.id === 9999);
    return (
      <View>
        <TouchableOpacity onPress={() => handleGenreSelected(item)}>
          <Text style={[styles.genreItemText, isActive && styles.genreItemActive]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <FlatList 
      horizontal={true}
      data={genres}
      renderItem={renderItem}
    />
  )
}

export default GenreNav

const styles = StyleSheet.create({
  genreItem: {

  },
  genreItemText: {
    color: 'white',
    padding: 8,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#7a7979'
  },
  genreItemActive: {
    backgroundColor: '#dd3e44'
  }
})