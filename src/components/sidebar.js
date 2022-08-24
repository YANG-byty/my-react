import React, { Component } from 'react'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items = [
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('报送计划', '5'),
    getItem('报送任务', '6'),
    getItem('预期报送', 'sub3', null, [
      getItem('aaa', '7'),
      getItem('ccc', '8'),
    ]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
]

export default class Sidebar extends Component {
  onClick = (e) => {
    console.log('click ', e)
  }
  render() {
    return (
      <Menu
        onClick={this.onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub2']}
        mode="inline"
        items={items}
      />
    )
  }
}
