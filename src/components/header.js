import React, { Component } from 'react'

export default class header extends Component {
  testFn() {
    console.log(33)
  }
  componentDidMount() {
    this.testFn()
  }
  render() {
    return <div>header</div>
  }
}
