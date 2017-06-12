import React from 'react'
import {
  View, Title, Button, Left, Right, Body, Icon, Text
} from 'native-base'
import styles from './Styles/MonthFooterViewStyle'

export default class MonthFooterView extends React.Component {
  handleReset = () => {
    this._resetCount++
    console.log('handleReset', this._resetCount)
    if (this._resetCount >= 5) {
      this._resetCount = 0
      this.props.resetAll()
    } else {
      if (this._resetCount === 1) setTimeout((() => this._resetCount=0),20000)
    }
  }

  constructor (props) {
    super(props)
    this._resetCount = 0
  }

  render () {
    const { startDate, editLock, fetchSampleData } = this.props
    return (
      <View style={{flexDirection:'row', marginTop:10}}>
        <Left />
          { (startDate == '2016-09-14T00:00:00.000Z') &&
            (
              <Button transparent small success onPress={fetchSampleData}>
                <Text>Fetch Sample</Text>
              </Button>
            )
          }
          <Right>
            { (!editLock) && (
              <Button transparent small danger onLongPress={this.handleReset}>
                <Icon name='trash' />
              </Button>
            )}
          </Right>
        </View>
    )
  }
}

// // Prop type warnings
// MonthFooterView.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// MonthFooterView.defaultProps = {
//   someSetting: false
// }
