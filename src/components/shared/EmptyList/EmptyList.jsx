import { StyleSheet, Text, View } from "react-native"

const EmptyList = ({title, desc}) => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListTitle}>{title}</Text>
      <Text style={styles.emptyListDesc}>{desc}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
  emptyListContainer: {
    padding: 16, 
    justifyContent: 'center'
  },
  emptyListTitle: {
    textAlign: 'center', 
    fontSize: 24, 
    marginTop: 16
  },
  emptyListDesc: {
    textAlign: 'center', 
    fontSize: 14, 
    marginTop: 8, 
    color: '#595858'
  }
})