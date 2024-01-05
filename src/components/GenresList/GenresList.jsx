import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const GenresList = () => {
  const {
    state: { moviesData, isLoading },
    fetchNewGenre,
  } = useContext(MovieContext);

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
    <View>
      <FlatList
        data={moviesData}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        onEndReachedThreshold={0.6}
        onEndReached={fetchNewGenre}
        ListFooterComponent={ListEndLoader}
        ListHeaderComponent={ListEndLoader}
        numColumns={2}
      />
    </View>
  );
};

export default GenresList;

const styles = StyleSheet.create({
  movieItem: {
    padding: 8,
    flex: 1,
    position: "relative",
  },
  movieItemImage: {
    width: 200,
    height: 250,
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
