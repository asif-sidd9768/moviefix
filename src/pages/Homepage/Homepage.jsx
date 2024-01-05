import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/MovieContext";
import GenresList from "../../components/GenresList/GenresList";
import GenreNav from "../../components/GenreNav/GenreNav";
import Fab from "../../components/Fab/Fab";
import MovieSearch from "../../components/MovieSearch/MovieSearch";

const Homepage = () => {
  const {
    state: { selectedGenre, isLoading, currentPageGenre, isModalOpen },
    fetchData,
    fetchGenre,
    fetchMoviesOnGenre,
  } = useContext(MovieContext);

  useEffect(() => {
    if (selectedGenre === null) {
      fetchData();
    }
  }, [selectedGenre]);

  useEffect(() => {
    fetchGenre();
  }, []);

  useEffect(() => {
    if (selectedGenre && !isLoading) {
      fetchMoviesOnGenre();
    }
  }, [currentPageGenre, selectedGenre]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.genresContainer}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.appTitle}>MovieFix</Text>
            <Fab />
          </View>
          <GenreNav />
        </View>
        {selectedGenre ? (
          <View style={styles.moviesListContainer}>
            <GenresList />
          </View>
        ) : (
          <View style={styles.moviesListContainer}>
            <MoviesList />
          </View>
        )}
      </View>
      {isModalOpen && <MovieSearch />}
    </SafeAreaView>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  appTitle: {
    color: "#dd3e44",
    fontSize: 28,
    padding: 8,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#000",
    // paddingHorizontal: 16,
    // paddingTop: 8,
  },
  moviesListContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    padding: 8,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "black",
    color: "white",
  },
  genresContainer: {
    backgroundColor: "#343434",
    padding: 16,
  },

  listTitle: { fontSize: 18, color: "white" },
  listText: { color: "white" },
});
