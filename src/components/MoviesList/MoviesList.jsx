import { useContext } from "react";
import {
  ActivityIndicator,
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MovieContext } from "../../context/MovieContext";

const MoviesList = () => {
  const {
    state: { moviesData, isLoading },
    fetchNextPage,
  } = useContext(MovieContext);
  const renderItem = ({ item }) => {
    const { title, overview, id, poster_path, vote_average, release_date } =
      item;
    const imgUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    return (
      <View style={{ padding: 8, width: "100%" }} key={id}>
        <Image
          source={{ uri: imgUrl }}
          style={{ width: "100%", height: 200 }}
        />
        <View style={styles.movieItemDetails}>
          <Text style={styles.movieItemTitle}>{title}</Text>
          <Text style={styles.movieItemVotes}>
            Vote: {vote_average}
            {"\n"}
            Released on: {release_date}
          </Text>
          <Text numberOfLines={2} style={styles.movieItemDescription}>
            {overview}
          </Text>
        </View>
        <View style={styles.movieItemDivider}></View>
      </View>
    );
  };

  const sectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const ListEndLoader = () => {
    if (isLoading) {
      // Show loader at the end of list when fetching next page data.
      return <ActivityIndicator size={"large"} />;
    }
  };

  return (
    <SectionList
      sections={moviesData}
      onEndReachedThreshold={0.9}
      renderItem={renderItem}
      // onStartReached={onStartReached}
      onStartReachedThreshold={0}
      onEndReached={fetchNextPage}
      ListFooterComponent={ListEndLoader}
      ListHeaderComponent={ListEndLoader}
      renderSectionHeader={sectionHeader}
      stickySectionHeadersEnabled={false}
    />
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    // paddingTop: 8,
  },
  sectionHeader: {
    padding: 8,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#424040",
    color: "white",
    marginVertical: 12,
  },
  movieItemDetails: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  movieItemVotes: {
    color: "#b0b0b0",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
  },
  movieItemTitle: {
    marginTop: 8,
    fontSize: 18,
    color: "white",
  },
  movieItemDescription: {
    color: "white",
    marginTop: 8,
    marginBottom: 16,
  },
  movieItemDivider: {
    width: "100%",
    height: 3,
    backgroundColor: "#8a8989",
    marginBottom: 6,
  },
});
