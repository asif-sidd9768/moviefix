import { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MovieContext } from "../../context/MovieContext";
import EmptyList from "../shared/EmptyList/EmptyList";
import SearchForm from "../MovieSearch/SearchForm/SearchForm";

const SearchList = () => {
  const {
    state: { searchParam, searchMoviesData, isLoading, searchMoviesPages },
    fetchNextSearchPage,
    fetchMovieBasedOnSearch,
  } = useContext(MovieContext);

  useEffect(() => {
    if (searchParam) {
      fetchMovieBasedOnSearch();
    }
  }, [searchMoviesPages]);

  const renderItem = ({ item }) => {
    const { title, id, poster_path, vote_average } = item;
    const imgUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    return (
      <View style={styles.movieItem} key={id}>
        <Image source={{ uri: imgUrl }} style={styles.movieItemImage} />
        <Text style={styles.listTitle}>
          {title}
          {"\n"}
          <Text numberOfLines={4} style={styles.movieItemRatings}>
            Ratings: {vote_average}
          </Text>
        </Text>
      </View>
    );
  };

  const ListEndLoader = () => {
    if (isLoading) {
      return <ActivityIndicator size={"large"} />;
    }
  };

  return (
    <SafeAreaView>
      <SearchForm />
      {searchMoviesData.length > 0 ? (
        <View style={styles.searchListContainer}>
          <FlatList
            data={searchMoviesData}
            renderItem={renderItem}
            stickySectionHeadersEnabled={false}
            onEndReachedThreshold={0.2}
            onEndReached={fetchNextSearchPage}
            ListFooterComponent={ListEndLoader}
            ListHeaderComponent={ListEndLoader}
            numColumns={2}
          />
        </View>
      ) : (
        <EmptyList title="Nothing to see!" desc="Type something & search" />
      )}
    </SafeAreaView>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  movieItem: {
    padding: 8,
    flex: 1,
    position: "relative",
  },
  searchListContainer: {
    maxHeight: "90%",
  },
  movieItemImage: {
    width: 120,
    height: 200,
  },
  movieItemRatings: {
    fontSize: 14,
  },
  listTitle: {
    paddingLeft: 4,
    fontSize: 18,
    color: "white",
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#dd3e44",
    width: "100%",
    opacity: 0.85,
    paddingVertical: 4,
  },
  listText: { color: "white" },
});
