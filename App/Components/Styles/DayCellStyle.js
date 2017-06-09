import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: 46,
    height: 50,
    // paddingTop: Metrics.titlePadding,
    backgroundColor: 'rgba(144,238,144,0.0)'
  },
  fullday: {
    backgroundColor: 'red'
  },
  half1day: {
    backgroundColor: 'blue'
  },
  half2day: {
    backgroundColor: 'cyan'
  },
  sundayText: {
    color: 'red'
  },
  satdayText: {
    color: 'green'
  }
})
