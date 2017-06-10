import React from 'react'
import { ListItem, Item, Card, CardItem, Text, View, Thumbnail, Container, Header, Content, Title, Button, Left, Right, Body, Icon} from 'native-base'
import styles from './Styles/MonthViewStyle'
import WeekRow from '../Components/WeekRow'

const DAY_TIME = 3600 * 24 * 1000
const WEEK_TIME = 7 * DAY_TIME

export default class MonthView extends React.Component {

  state: {
    weekObjects: Array
  }

  updateWeekObjects = props => {
    console.log('updateWeekObjects is called')
    const { startMonth, cal } = props
    const { startDate, vacDays } = cal
    let realStartDate = new Date(startMonth)
    realStartDate = new Date(realStartDate.getTime() - (realStartDate.getDay()) * DAY_TIME )
    let realEndDate = new Date(realStartDate.getTime() + 6 * WEEK_TIME)
    const sDate = realStartDate.toJSON()
    const eDate = realEndDate.toJSON()
    let vDaysThis = vacDays.filter(vday => (vday.date >= sDate && vday.date < eDate))

    const weekObjects = []
    for(let i=0; i < 6; i++) {
      const sDate = new Date(realStartDate.getTime() + i * (WEEK_TIME)).toJSON()
      const eDate = new Date(new Date(sDate).getTime() + (WEEK_TIME)).toJSON()
      const vDays = vDaysThis.filter(vday => (vday.date >= sDate && vday.date < eDate ))

      // if (vDays.length>0) console.log( 'vacDays && vDays:', vacDays, vDays)
      const s = new Date(sDate)
      const shiftOffset = { full:0, half1:7, half2:14, holiday:21 }
      const checkSum = vDays.reduce(((acc, vday) => {
        const d = new Date(vday.date)
        const diff = (d.getTime() - s.getTime())/(DAY_TIME)
        return acc | (((2 << diff)) << shiftOffset[vday.type])
      }), realStartDate.getTime())

      weekObjects.push({ weekIdx: i, checkSum, sDate, eDate, vDays })
    }
    this.setState({ weekObjects })
  }

  handlePress = date => {
    this.props.handlePress(date)
  }

  componentWillMount () {
    console.log('componentWillMount:', this.props.cal)
    this.updateWeekObjects(this.props)
  }

  componentWillReceiveProps (newProps) {
    console.log('componentWillReceiveProps is called:', newProps)
    if (newProps.cal) {
      this.updateWeekObjects(newProps)
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      weekObjects: []
    }
  }


  render () {
    console.log('cal:', this.props.cal)
    const { weekObjects } = this.state
    const weeks = (weekObjects.length == 0) ? null : (
      weekObjects.map(wo => (
        <WeekRow
          key={wo.sDate}
          weekData={wo}
          handlePress={this.handlePress}
        />
      ))
    )

    return (
      <View>
        {weeks}
      </View>
    )
  }
}

// // Prop type warnings
// MonthView.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// MonthView.defaultProps = {
//   someSetting: false
// }
