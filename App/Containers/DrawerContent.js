import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import { List, ListItem, Text, View, Content } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'


class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.logoDark} style={styles.logo} />
        <Content>
          <ListItem onPress={()=> {NavigationActions.listViewExample();this.context.drawer.close()}}>
            <Text>List example</Text>
          </ListItem>
          <ListItem onPress={()=> {NavigationActions.cardExample();this.context.drawer.close()}}>
            <Text>Card example</Text>
          </ListItem>
          <ListItem onPress={()=> {NavigationActions.login();this.context.drawer.close()}}>
            <Text>Login</Text>
          </ListItem>
          <ListItem onPress={()=> {NavigationActions.launchScreen();this.context.drawer.close()}}>
            <Text>LaunchScreen</Text>
          </ListItem>
          <ListItem onPress={()=> {NavigationActions.pop();this.context.drawer.close()}}>
            <Text>pop</Text>
          </ListItem>
        </Content>
      </View>
    )
  }

}
DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
