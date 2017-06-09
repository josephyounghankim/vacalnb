import React from 'react'
import { ListItem, Item, Card, CardItem, Text, View, Thumbnail, Container, Header, Content, Title, Button, Left, Right, Body, Icon} from 'native-base'
import styles from './Styles/MonthViewStyle'
import WeekRow from '../Components/WeekRow'

export default class MonthView extends React.Component {

  state: {
    weekObjects: Array
  }

  updateWeekObjects = props => {
    console.log('updateWeekObjects is called')
    const { startMonth, cal } = props
    const { startDate, vacDays } = cal
    let realStartDate = new Date(startMonth)
    realStartDate = new Date(realStartDate.getTime() - (realStartDate.getDay()) * 3600 * 24 * 1000 )

    const weekObjects = []
    for(let i=0; i < 6; i++) {
      const sDate = new Date(realStartDate.getTime() + i * (7 * 3600 * 24 * 1000)).toJSON()
      const eDate = new Date(new Date(sDate).getTime() + (7 * 3600 * 24 * 1000)).toJSON()
      const vDays = vacDays.filter(vday => (vday.date >= sDate && vday.date < eDate ))
      // if (vDays.length>0) console.log( 'vacDays && vDays:', vacDays, vDays)
      // const s = new Date(sDate)
      // const checkSum = vDays.reduce(((acc, vday) => {
      //   const d = new Date(vday.date)
      //   const diff = (d.getTime() - s.getTime())/(3600 * 24 * 1000)
      //   const t = (vday.type === 'full') ? 8 : 0
      //   // console.log('diff, t', s, d, diff, t)
      //   return acc | (((2 << diff)) << t)
      // }), realStartDate.getTime())
      weekObjects.push({ weekIdx: i, sDate, eDate, vDays })
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
    if (newProps.cal) {
      console.log('componentWillReceiveProps is called')
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
        <WeekRow key={wo.sDate} weekData={wo} handlePress={this.handlePress}/>
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
