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
    const { title, editLock } = this.props
    return (
      <Item style={{flex:1, alignItems:'flex-end', borderBottomWidth:0}} stackedLabel>
        <Text style={{flex:1, fontSize:12}}>{title}</Text>
        <Input style={{flex:1, maxWidth:'100%', textAlign:'right', marginRight:5}}
          disabled={editLock}
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
