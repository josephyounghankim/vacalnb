import React from 'react'
import {
  View, Text, Container, Content, Input, Button, Form, Label, Item,
  Toast
} from 'native-base'
import styles from './Styles/DaysLeftViewStyle'

export default class DaysLeftView extends React.Component {

  render () {
    const { daysLeft } = this.props
    return (
      <Item stackedLabel style={{flex:1, borderBottomWidth:0}}>
        <Text style={{flex:1, fontSize:12}}>Days Left:</Text>
        <Input style={{flex:1, textAlign:'center', fontSize:30, fontWeight:'bold', color:'black'}}
          value={''+daysLeft}
          disabled
        />
      </Item>
    )
  }
}

// // Prop type warnings
// DaysLeftView.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// DaysLeftView.defaultProps = {
//   someSetting: false
// }
