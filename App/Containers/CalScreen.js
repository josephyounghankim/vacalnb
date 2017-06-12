
import React from 'react'
import { connect } from 'react-redux'
import { Image, ListView, BackAndroid, Platform } from 'react-native'
import {
  ListItem, Item, Card, CardItem, Text,
  View, Container, Content,
  Button, Left, Right, Body, Icon,
  H1, H2, H3, Toast, Spinner,
  Label, Input
} from 'native-base'

import Orientation from 'react-native-orientation'

// import { Col, Row, Grid } from 'react-native-easy-grid'
import VacHeader from '../Components/VacHeader'
import DateInput from '../Components/DateInput'
import NumberInput from '../Components/NumberInput'
import DaysLeftView from '../Components/DaysLeftView'
import MonthHeaderView from '../Components/MonthHeaderView'
import MonthView from '../Components/MonthView'
import MonthFooterView from '../Components/MonthFooterView'

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

  updateStartMonth = (month) => {
    this.setState({startMonth:month, spinnerOn:true})
  }

  constructor (props) {
    super(props)
    this.state = {
      startMonth: new Date().toJSON().substr(0,7),
      spinnerOn: false
    }
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
        <VacHeader editLock={editLock} updateEditLock={this.props.updateEditLock}/>
        <Content padder>
          <View style={{flexDirection:'row', justifyContent:'space-between', height:70, marginBottom:5}}>
            <DateInput style={{flex:2}} editLock={editLock} date={startDate} title='Base Date:' onSubmitEditing={this.handleSubmitStartDate} />
            <DaysLeftView style={{flex:1}} daysLeft={''+daysLeft} title='Days Left:' />
            <NumberInput style={{flex:2}} editLock={editLock} number={''+maxVacDays} title='Max Days:' onSubmitEditing={this.handleSubmitMaxVacDays} />
          </View>
          <MonthHeaderView startMonth={startMonth} spinnerOn={spinnerOn} updateStartMonth={this.updateStartMonth} />
          <MonthView startMonth={startMonth} cal={this.props.cal} handlePress={this.handlePress} />
          <MonthFooterView startDate={startDate} editLock={editLock} fetchSampleData={this.props.fetchSampleData} resetAll={this.props.resetAll} />
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
