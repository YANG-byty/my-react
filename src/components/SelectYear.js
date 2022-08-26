import React, { Component } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.areaMapTitle = props.areaMapTitle
    this.timeObj = {
      startTime: '',
      endTime: '',
    }
  }

  changeTimeFn = (e) => {
    if (e == null) {
      this.timeObj.startTime = ''
      this.timeObj.endTime = ''
    } else {
      this.timeObj.startTime = moment(e[0]).format('yyyy')
      this.timeObj.endTime = moment(e[1]).format('yyyy')
    }

    // 向父组件传值
    this.props.setTime(this.timeObj)
  }

  render() {
    return (
      <div className="select-year side-box info flex-row col-center row-center">
        <div className="year flex-row col-center">
          <div className="all" onClick={this.clearTime}>
            全部
          </div>
          <RangePicker
            bordered={false}
            inputReadOnly={true}
            picker="year"
            onChange={this.changeTimeFn}
          />
        </div>
        <div className="line-y"></div>
        <div className="city">
          丽水市{this.areaMapTitle ? ' · ' + this.areaMapTitle : ''}
        </div>
      </div>
    )
  }
}
