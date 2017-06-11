import React from 'react'
import {
  View, Text, Container, Content, Input, Button, Form, Label, Item,
  Toast
} from 'native-base'
import styles from './Styles/DateInputStyle'

export default class DateInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: props.date.substr(0,10),  // 2016-09-14
      orgDate: props.date.substr(0,10)  // 2016-09-14
    }
  }
  componentWillReceiveProps (newProps) {
    const {date} = newProps
    this.setState({
      date: date.substr(0,10),  // 2016-09-14
      orgDate: date.substr(0,10)  // 2016-09-14
    })
  }
  onChangeText = (text) => {
    this.setState({date:text})
  }
  onSave = () => {
    const date = this.state.date
    if (date.length === 10) {
      const d = new Date(date).getTime()
      if (d >= new Date('2015').getTime() && d < new Date('2050').getTime()) {
        this.setState({orgDate:date})
        this.props.onSubmitEditing(new Date(date).toJSON())
        return
      }
    }
    this.setState({date:this.state.orgDate})
  }

  render () {
    const { title } = this.props
    return (
      <Item style={{flex:2}} stackedLabel>
        <Label style={{fontSize:12}}>{title}</Label>
        <Input
          value={this.state.date}
          onChangeText={this.onChangeText}
          onEndEditing={this.onSave}
        />
      </Item>
    )
  }
}

// // Prop type warnings
// DateInput.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// DateInput.defaultProps = {
//   someSetting: false
// }
