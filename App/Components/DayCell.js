import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from './Styles/DayCellStyle'
import moment from 'moment'

export default class DayCell extends React.Component {
  handlePress  = event => {
    this.props.handlePress(this.props.date, this.props.weekIdx)
  }

  render () {
    const { date, type, day } = this.props
    const monthDate = moment(date).format('MM/DD')
    const color1 = {
      'full': 'lightgreen', 'half1': 'lightgreen', 'half2': 'lemonchiffon', 'none': 'lemonchiffon'
    }
    const color2 = {
      'full': 'lightgreen', 'half1': 'lemonchiffon', 'half2': 'lightgreen', 'none': 'lemonchiffon'
    }

    return (
      <View style={{borderColor: 'wheat', borderWidth: 1}}>
        <View style={{width:46, height:48, position:'absolute'}}>
          <View style={{backgroundColor:color1[type], width:46, height:24, position:'absolute'}}></View>
          <View style={{backgroundColor:color2[type], width:46, height:24, top:24, position:'absolute'}}></View>
        </View>
        <TouchableOpacity style={{
            flex: 1,
            width: 46,
            height: 48,
            backgroundColor: 'rgba(144,238,144,0.0)',
            justifyContent: 'space-around',
            alignItems: 'center'
          }} onPress={this.handlePress}>
          <Text style={[
            {fontSize:10, fontWeight:'bold', color:'dimgray'},
            styles[this.props.day.toLowerCase() + 'dayText']]}>{day}</Text>
          <Text style={{}}>{monthDate}</Text>
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
