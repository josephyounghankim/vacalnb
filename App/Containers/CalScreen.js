
import React from 'react'
import { connect } from 'react-redux'
import { Image, ListView, BackAndroid, Platform } from 'react-native'
import {
  ListItem, Item, Card, CardItem, Text,
  View, Thumbnail, Container, Header, Content,
  Title, Button, Left, Right, Body, Icon,
  H1, H2, H3, Toast, Spinner
} from 'native-base'

import Orientation from 'react-native-orientation'

// import { Col, Row, Grid } from 'react-native-easy-grid'
import DateInput from '../Components/DateInput'
import NumberInput from '../Components/NumberInput'
import MonthView from '../Components/MonthView'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import CalActions from '../Redux/CalRedux'

// Styles
import styles from './Styles/CalScreenStyle'

class CalScreen extends React.Component {

  state: {
    startMonth: String,
    spinnerOn: Boolean
  }

  handlePress = (date) => {
    console.log('handlePress:', date)
    if (this.props.cal.editLock) return
    this.props.updateVacDay(date)
  }

  handleSubmitStartDate = (startDate) => {
    console.log('handleSubmitStartDate:', startDate)
    this.props.updateStartDate(startDate)
  }

  handleSubmitMaxVacDays = (maxVacDays) => {
    console.log('handleSubmitMaxVacDays:', maxVacDays)
    this.props.updateMaxVacDays(parseInt(maxVacDays))
  }

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

  onFetchSampleData = () => {
    // fetch my sample data on 2016-2017
    this.props.fetchSampleData()
  }

  constructor (props) {
    super(props)
    this.state = {
      startMonth: new Date().toJSON().substr(0,7),
      spinnerOn: false
    }
    this._resetCount = 0
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  componentWillMount () {
    const initial = Orientation.getInitialOrientation();
    console.log('initial Orientation: ', initial)
    if (initial === 'PORTRAIT') {} else {}
  }

  componentWillReceiveProps (newProps) {
    if (newProps.cal) {
    }
  }

  componentDidUpdate () {
    if (this.state.spinnerOn) this.setState({spinnerOn:false})
  }

  gotoPrevMonth = () => {
    const { startMonth } = this.state
    const month = new Date(new Date(startMonth).getTime() - 24*3600*1000).toJSON().substr(0,7)
    this.setState({startMonth:month, spinnerOn:true})
  }
  gotoNextMonth = () => {
    const { startMonth } = this.state
    const month = new Date(new Date(startMonth).getTime() + 32*24*3600*1000).toJSON().substr(0,7)
    this.setState({startMonth:month, spinnerOn:true})
  }
  render () {
    const { startDate, maxVacDays, vacDays, editLock } = this.props.cal
    const { startMonth, spinnerOn } = this.state
    // console.log( 'cal:', this.props.cal )

    const sTime = new Date(startDate).getTime()
    const aYearTime = 365 * 24 * 3600 * 1000
    const daysCount = vacDays.reduce((count, day) => {
      const dTime = new Date(day.date).getTime()
      if (dTime >= sTime && dTime < (sTime + aYearTime)) {
        if (day.type === 'half1' || day.type === 'half2') return count + 0.5
        if (day.type === 'full') return count + 1.0
        return count
      }
      return count
    }, 0)
    const daysLeft = maxVacDays - daysCount

    return (
      <Container >
        <Header>
          <Body style={{flexDirection:'row', justifyContent:'center'}}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Icon style={{fontSize:22, color:(Platform.OS=='android' ? 'white' : null)}} name="calculator" />
              <Title>  Vacation Calculator</Title>
            </View>
          </Body>
        </Header>
        <Content padder>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <DateInput date={startDate} title='Base Date:' onSubmitEditing={this.handleSubmitStartDate} />
            <NumberInput number={''+maxVacDays} title='Max Days:' onSubmitEditing={this.handleSubmitMaxVacDays} />
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>
            <Left />
            <H1>{''+daysLeft}</H1>
            <Text style={{color:'gray'}}>
              { (daysLeft <= 1.0) ? ' day left' : ' days left' }
            </Text>
            <Right>
              <Button transparent small
                danger={editLock} success={!editLock}
                onPress={() => this.props.updateEditLock(!editLock)}
              >
                <Icon name={editLock ? 'lock' : 'unlock'} />
              </Button>
            </Right>
          </View>
          <View style={{
              flexDirection:'row',
              marginTop:15, marginBottom:0,
              borderColor:'lightgray',
              borderTopWidth:1,
              justifyContent:'center',
              alignItems:'center'
            }}>
            <Left>
              <Button transparent small onPress={this.gotoPrevMonth}>
                <Icon name="arrow-dropleft" />
              </Button>
            </Left>
            <Button transparent large>
              <Text style={{opacity: spinnerOn ? 0.3 : 1.0}}>{startMonth}</Text>
            </Button>
            {spinnerOn && <Spinner color='#157efc' style={{position:'absolute'}}/> }
            <Right>
              <Button transparent small onPress={this.gotoNextMonth}>
                <Icon name="arrow-dropright" />
              </Button>
            </Right>
          </View>
          <MonthView
            startMonth={startMonth}
            cal={this.props.cal}
            handlePress={this.handlePress}
          />
        <View style={{flexDirection:'row', marginTop:10}}>
            { (startDate == '2016-09-14T00:00:00.000Z') &&
              (
                <Button transparent small success onPress={this.onFetchSampleData}>
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
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cal: state.cal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSampleData: () => dispatch(CalActions.fetchSampleData()),
    resetAll: () => dispatch(CalActions.resetAll()),
    updateVacDay: date => dispatch(CalActions.updateVacDay(date)),
    updateStartDate: startDate => dispatch(CalActions.updateStartDate(startDate)),
    updateMaxVacDays: maxVacDays => dispatch(CalActions.updateMaxVacDays(maxVacDays)),
    updateEditLock: editLock => dispatch(CalActions.updateEditLock(editLock))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalScreen)
