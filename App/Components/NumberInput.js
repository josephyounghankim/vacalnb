import React from 'react'
// import { View, Text } from 'react-native'
import { View, Text, Container, Content, Input, Button, Form, Label, Item } from 'native-base'
import styles from './Styles/NumberInputStyle'

export default class NumberInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      number: props.number,
      orgNumber: props.number
    }
  }
  componentWillReceiveProps (newProps) {
    const {number} = newProps
    this.setState({number, orgNumber:number})
  }
  onChangeText = (text) => {
    this.setState({number:text})
  }
  onSave = () => {
    const number = parseInt(this.state.number) || -1
    if ( number >= 0 && number < 100) {
      this.setState({orgNumber:''+number})
      this.props.onSubmitEditing(''+number)
      return
    }
    this.setState({number:this.state.orgNumber})
  }

  render () {
    const { title } = this.props
    return (
      <Item style={{borderBottomWidth:0}} stackedLabel>
        <Label style={{fontSize:12}}>{title}</Label>
        <Input
          value={this.state.number}
          onChangeText={this.onChangeText}
          onEndEditing={this.onSave}
        />
      </Item>
    )
  }
}

// // Prop type warnings
// NumberInput.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// NumberInput.defaultProps = {
//   someSetting: false
// }
