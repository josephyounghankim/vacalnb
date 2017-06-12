import React from 'react'
import { Platform } from 'react-native'
import {
  View, Header, Title, Button, Left, Right, Body, Icon
} from 'native-base'
import styles from './Styles/VacHeaderStyle'

export default class VacHeader extends React.Component {

  render () {
    const { editLock, updateEditLock } = this.props
    return (
      <Header>
        <Left style={{flex:1}}/>
        <Body style={{flex:3, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Icon style={{fontSize:22, color:(Platform.OS=='android' ? 'white' : null)}} name="calculator" />
            <Title>  Vacation Calculator</Title>
          </View>
        </Body>
        <Right style={{flex:1}}>
          <Button transparent small
            danger={editLock} success={!editLock}
            onPress={() => updateEditLock(!editLock)}
          >
            <Icon style={{fontSize:20}} name={editLock ? 'lock' : 'unlock'} />
          </Button>
        </Right>
      </Header>
    )
  }
}

// // Prop type warnings
// VacHeader.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// VacHeader.defaultProps = {
//   someSetting: false
// }
