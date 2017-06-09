import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from './Styles/DayCellStyle'
import moment from 'moment'

export default class DayCell extends React.Component {
  handlePress  = event => {
    this.props.handlePress(this.props.date, this.props.weekIdx)
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.type === nextProps.type && this.props.date === nextProps.date) return false
    return true
  }
  render () {
    const { date, type, day } = this.props
    let monthDate = moment(date).format('D')
    if (monthDate === '1') monthDate += moment(date).format(' MMM')
    const color1 = {
      'full': 'lightgreen', 'half1': 'lightgreen', 'half2': 'lemonchiffon', 'holiday':'lemonchiffon', 'none': 'lemonchiffon'
    }
    const color2 = {
      'full': 'lightgreen', 'half1': 'lemonchiffon', 'half2': 'lightgreen', 'holiday':'lemonchiffon', 'none': 'lemonchiffon'
    }

    return (
      <View style={{borderColor: 'wheat', borderWidth: 1}}>
        <View style={{width:46, height:46, position:'absolute'}}>
          <View style={{backgroundColor:color1[type], width:23, height:46, position:'absolute'}}></View>
          <View style={{backgroundColor:color2[type], width:23, height:46, left:23, position:'absolute'}}></View>
        </View>
        <TouchableOpacity style={{
            flex: 1,
            width: 46,
            height: 46,
            backgroundColor: 'rgba(0,0,0,0.0)',
            justifyContent: 'space-around',
            alignItems: 'center'
          }} onPress={this.handlePress}>
          <Text style={[
            {fontSize:10, fontWeight:'bold', color:'dimgray'},
            styles[day.toLowerCase() + 'dayText'], styles[type+'Text']]}>{day}</Text>
          <Text style={[{fontWeight:'bold'},styles[day.toLowerCase() + 'dayText'], styles[type+'Text']]}>{monthDate}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// // Prop type warnings
// DayCell.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// DayCell.defaultProps = {
//   someSetting: false
// }
