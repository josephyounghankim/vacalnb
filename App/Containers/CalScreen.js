
import React from 'react'
import { connect } from 'react-redux'
import { Image, ListView, BackAndroid } from 'react-native'
import {
  ListItem, Item, Card, CardItem, Text,
  View, Thumbnail, Container, Header, Content,
  Title, Button, Left, Right, Body, Icon,
  H1, H2, H3, Toast
} from 'native-base'
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
    startMonth: String
  }

  handlePress = (date) => {
    console.log('handlePress:', date)
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

  onFetchSampleData = () => {
    // fetch my sample data on 2016-2017
    this.props.fetchSampleData()
  }

  constructor (props) {
    super(props)
    console.log('constructor:', props)
    this.state = {
      startMonth: new Date().toJSON().substr(0,7)
    }
  }

  componentWillMount () {
    console.log('componentWillMount:', this.props.cal)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.cal) {
    }
  }

  gotoPrevMonth = () => {
    const { startMonth } = this.state
    const month = new Date(new Date(startMonth).getTime() - 24*3600*1000).toJSON().substr(0,7)
    this.setState({startMonth:month})
  }
  gotoNextMonth = () => {
    const { startMonth } = this.state
    const month = new Date(new Date(startMonth).getTime() + 32*24*3600*1000).toJSON().substr(0,7)
    this.setState({startMonth:month})
  }
  render () {
    const { startDate, maxVacDays, vacDays } = this.props.cal
    const { startMonth } = this.state
    // console.log( 'cal:', this.props.cal )

    const sTime = new Date(startDate).getTime()
    const aYearTime = 365 * 24 * 3600 * 1000
    const daysCount = vacDays.reduce((count, day) => {
      const dTime = new Date(day.date).getTime()
      if (dTime >= sTime && dTime < (sTime + aYearTime)) {
        if (day.type === 'half1' || day.type === 'half2') return count + 0.5
        return count + 1.0
      }
      return count
    }, 0)

    return (
      <Container >
        <Header>
          <Body>
            <Button transparent dark>
              <Icon name="calculator" />
              <Title>Vacation Calculator</Title>
            </Button>
          </Body>
        </Header>
        <Content padder>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <DateInput date={startDate} title='Base Date:' onSubmitEditing={this.handleSubmitStartDate} />
            <NumberInput number={''+maxVacDays} title='Max:' onSubmitEditing={this.handleSubmitMaxVacDays} />
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>
            <H1>{''+(maxVacDays - daysCount)}</H1>
            <Text style={{color:'gray'}}> days left</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:15, marginBottom:5}}>
            <Left>
              <Button transparent small onPress={this.gotoPrevMonth}>
                <Icon name="arrow-dropleft" />
                <Text>Prev</Text>
              </Button>
            </Left>
            <Button transparent small>
              <Text>{startMonth}</Text>
            </Button>
            <Right>
              <Button transparent small onPress={this.gotoNextMonth}>
                <Text>Next</Text>
                <Icon name="arrow-dropright" />
              </Button>
            </Right>
          </View>
          <MonthView
            startMonth={startMonth}
            cal={this.props.cal}
            handlePress={this.handlePress}
          />
          <Button transparent small success onPress={this.onFetchSampleData}>
            <Text>Fetch Sample</Text>
          </Button>
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
    updateVacDay: date => dispatch(CalActions.updateVacDay(date)),
    updateStartDate: startDate => dispatch(CalActions.updateStartDate(startDate)),
    updateMaxVacDays: maxVacDays => dispatch(CalActions.updateMaxVacDays(maxVacDays))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalScreen)
