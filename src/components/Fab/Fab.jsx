import { useContext } from 'react'
import { MovieContext } from '../../context/MovieContext'
import { openSearchModalAction } from '../../actions/movieActions'

const { TouchableOpacity, Image } = require('react-native')

const Fab = () => {
  const {dispatch} = useContext(MovieContext)
  return (
    <TouchableOpacity onPress={() => dispatch(openSearchModalAction(true))} activeOpacity={.5} style={{}} >
          <Image
              source={require('../../../assets/search.png')}
              style={{ width: 30, height: 30,  marginLeft: 15}}
          />
      </TouchableOpacity>
  )
}
export default Fab