import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames' //样式类合并器
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import './style.scss'
import * as requestRefers from '../../api/common'

import { DownloadOutlined } from '@ant-design/icons'
import { Button, Radio } from 'antd'

const Home = (props) => {
  const { myHomeData, setData } = props
  let navigate = useNavigate()
  let arr = [1, 2, 3, 4, 5]
  const liRender = (arr) => {
    return arr.map((item, index) => {
      return <li key={index}>{item}</li>
    })
  }

  const goToFn = (link) => {
    navigate(link)
  }

  // 请求接口
  const getInstanceByIdFn = () => {
    requestRefers
      .getInstanceById({ instanceId: '48a078d0f87b4e46ba9111d2ef4c701f' })
      .then((res) => {
        console.log(res)
      })
  }
  getInstanceByIdFn()

  return (
    <Fragment>
      <Button type="primary" icon={<DownloadOutlined />} />
      <ul className={classNames('ul')}>{liRender(arr)}</ul>
      <div onClick={() => goToFn('/login')}>点击去Login</div>
      <div className="ipt-con">home store: myData = {myHomeData}</div>
      <div className="ipt-con">
        <button
          onClick={() => {
            setData('123456')
          }}
        >
          更改home store的myData
        </button>
      </div>
    </Fragment>
  )
}

// 把store中的数据映射到组件的props
const mapStateToProps = (state) => {
  return {
    myHomeData: state.getIn(['myData']),
  }
}

// 把store的Dispatch映射到组件的props
const mapDispatchToProps = (dispatch) => ({
  setData(data) {
    const action = actionCreators.setData(data)
    dispatch(action)
  },
})
// connect(mapStateToProps, null)  如果不需要dispatch可以设置为null
export default connect(mapStateToProps, mapDispatchToProps)(Home)
