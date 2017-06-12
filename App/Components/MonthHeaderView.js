import React from 'react'
import {
  View, Text, Container, Content, Input, Button, Form, Label, Item,
  Toast, Icon
} from 'native-base'
import styles from './Styles/MonthHeaderViewStyle'

export default class MonthHeaderView extends React.Component {
  gotoPrevMonth = () => {
    const { startMonth } = this.props
    const month = new Date(new Date(startMonth).getTime() - 24*3600*1000).toJSON().substr(0,7)
    this.props.updateStartMonth(month)
  }
  gotoNextMonth = () => {
    const { startMonth } = this.props
    const month = new Date(new Date(startMonth).getTime() + 32*24*3600*1000).toJSON().substr(0,7)
    this.props.updateStartMonth(month)
  }

  render () {
    const {startMonth, spinnerOn} = this.props
    return (
      <View style={{
          flexDirection:'row',
          marginTop:7, marginBottom:0,
          borderColor:'lightgray',
          borderTopWidth:1,
          justifyContent:'space-between',
          alignItems:'center'
        }}>
        <Button transparent style={{flex:1, justifyContent:'flex-start', marginTop:14, paddingLeft:0}} small onPress={this.gotoPrevMonth}>
          <Icon name="arrow-dropleft" />
        </Button>
        <Button transparent style={{flex:3, justifyContent:'center'}} large>
          <Text style={{opacity: spinnerOn ? 0.3 : 1.0}}>{startMonth}</Text>
        </Button>
        <Button transparent style={{flex:1, justifyContent:'flex-end', marginTop:14, paddingRight:0}} small onPress={this.gotoNextMonth}>
          <Icon name="arrow-dropright" />
        </Button>
      </View>
    )
  }
}

// // Prop type warnings
// MonthHeaderView.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// MonthHeaderView.defaultProps = {
//   someSetting: false
// }
