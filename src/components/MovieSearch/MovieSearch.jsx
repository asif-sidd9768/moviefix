import { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MovieContext } from "../../context/MovieContext";
import {
  openSearchModalAction,
  setSearchMoviesAction,
  setSearchParamAction,
} from "../../actions/movieActions";
import SearchList from "../SearchList/SearchList";

const MovieSearch = () => {
  const { dispatch } = useContext(MovieContext);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        dispatch(openSearchModalAction(false));
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <SearchList />
          <Pressable
            style={[styles.button]}
            onPress={() => {
              dispatch(openSearchModalAction(false));
              dispatch(setSearchMoviesAction([]));
              dispatch(setSearchParamAction(null));
            }}
          >
            <Text style={styles.textStyle}>X</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MovieSearch;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "absolute",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    right: 4,
    top: 4,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
