import React, { Component } from 'react'

export default class header extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="header-box flex-row col-center">
        {/* <img
          className="logo"
          src={require('../assets/images/logo.png')}
          alt=""
        /> */}
      </div>
    )
  }
}

// 把store中的数据映射到组件的props
const mapStateToProps = (state) => {
  return {
    myHomeData: state.getIn(['myData']),
  }
}
