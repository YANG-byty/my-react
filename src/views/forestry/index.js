import React, { Component } from 'react'
import classNames from 'classnames' //样式类合并器
import * as echarts from 'echarts'
import { UpOutlined } from '@ant-design/icons'
import './style.scss'
import SelectYear from '../../components/SelectYear'

class forestry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      areaMapTitle: '丽水市',
      modelTypeList: [
        {
          id: '1',
          name: '公益林补偿金',
        },
        {
          id: '2',
          name: '林木采伐',
        },
        {
          id: '3',
          name: '征占用林地',
        },
      ],
      modelTypeListActive: 0,
      warningConditionObj: {
        total: 99,
        redWarning: 99,
        redPercentage: 99,
        yellowWarning: 99,
        yellowPercentage: 99,
      },
      collapseList: [],
    }
  }
  // 获取子组件的选中的时间
  setTime = (data) => {
    console.log(data)
  }
  // 预警情况类型切换
  modelTypeListFn = (index) => {
    this.setState({
      modelTypeListActive: index,
    })
    // this.getModelType()
  }
  // 总预警量
  warningChart(data) {
    let myChart = echarts.init(document.getElementById('warning-chart'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let color = ['#ff4444', '#ffd159']
    let echartData = [
      {
        name: '红色预警量',
        value: data.redWarning,
      },
      {
        name: '黄色预警量',
        value: data.yellowWarning,
      },
    ]

    let formatNumber = function (num) {
      let reg = /(?=(\B)(\d{3})+$)/g
      return num.toString().replace(reg, ',')
    }
    let total = echartData.reduce((a, b) => {
      return a + b.value * 1
    }, 0)

    let option = {
      color: color,
      tooltip: {
        trigger: 'item',
      },
      title: [
        {
          text: '{name|' + '}{val|' + formatNumber(total) + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#fff',
                padding: [10, 0],
              },
              val: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
              },
            },
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['50%', '50%'],
          data: echartData,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderWidth: 2,
            },
          },
          labelLine: {
            show: false,
          },
          label: {
            normal: {
              show: false,
            },
          },
        },
      ],
    }
    myChart.setOption(option)
  }
  // 显示悬浮框
  showModalFn(id) {
    if (id) {
      this.parameter = {
        forestryModelId: id,
        areaId: this.areaId,
        endTime: this.endTime,
        startTime: this.startTime,
      }
      this.showModal = true
    }
  }
  // 折叠
  isDropupFn(index) {
    this.forestryModelId = this.collapseList[index].id
    this.collapseList[index].isDropup = !this.collapseList[index].isDropup
    if (this.collapseList[index].isDropup) {
      this.listData = []
      this.getWarningModelPageFn()
    }
    let arr = this.collapseList

    this.collapseList = arr.map((item, idx) => {
      if (index != idx) {
        item.isDropup = false
      }
      return item
    })
  }
  // 渲染-预警模型
  renderCollapse() {
    this.state.collapseList.map((item, index) => {
      return (
        <div key={index}>
          <div className="collapse disFlex">
            <div onClick={() => this.showModalFn(item.id)} style="width: 45%">
              {item.name}
            </div>
            <div className="disFlex row-between" style="width: 55%">
              <progress-bar
                progressBar={'progress-bar' + item.id}
                data={'[item.count, item.total]'}
              />
              <div className="disFlex" style="margin-left: 0.75rem">
                {item.count}条
                {/* <Icon
                  class="down"
                  type="item.isDropup ? 'ios-arrow-up' : 'ios-arrow-down'"
                  onClick={() => this.isDropupFn(index)}
                /> */}
                <UpOutlined />
              </div>
            </div>
          </div>
          <div v-if="item.isDropup">
            <div className="table-box">
              <div className="thead">
                <div className="column one">村名</div>
                <div className="column one">年度</div>
                <div className="column one">差额</div>
                <div className="column one">状态</div>
              </div>
              <div className="tbody">
                {/* <vue-seamless-scroll
                        className="seamless-warp list"
                        v-if="listData.length > 0"
                        :data="listData"
                        :class-option="optionSingleHeightTime"
                      >
                        <div className="item" v-for="item in listData">
                          <div className="column one">{{ item.villageName }}</div>
                          <div className="column one">{{ item.year }}</div>
                          <div className="column one">{{ item.difference }}元</div>
                          <div className="column one">
                            <span :className="[item.warningType == 1 ? 'red' : 'yellow']">{ item.status }</span>
                          </div>
                        </div>
                      </vue-seamless-scroll> */}
                <div v-else className="no-data">
                  暂无数据
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  componentDidMount() {
    let data = {
      redPercentage: '100%',
      redWarning: 181,
      total: 181,
      yellowPercentage: '0%',
      yellowWarning: 0,
    }
    this.warningChart(data)
  }
  render() {
    return (
      <div className="forestry">
        <div className="screen-wrap">
          <div className="head-bar">
            丽水市<span>林业领域</span>大数据监督应用
          </div>
          <div className="content">
            <SelectYear
              areaMapTitle={this.state.areaMapTitle}
              setTime={this.setTime}
            />
            <div className="inner">
              <div className="left-side">
                <div className="side-box">
                  <div className="side-title">预警情况</div>
                  <div className="line-box mt12">
                    <em></em>
                  </div>
                  <ul className="tab-wrap">
                    {this.state.modelTypeList.map((item, index) => {
                      return (
                        <li
                          onClick={() => this.modelTypeListFn(index)}
                          key={item.id}
                          className={classNames(
                            this.state.modelTypeListActive == index
                              ? 'warning-active'
                              : 'warning',
                            'disFlex',
                            'warning-text',
                            'omit'
                          )}
                        >
                          {item.name}
                        </li>
                      )
                    })}
                  </ul>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="disFlex chart-wrap">
                    <div className="title-wrap">
                      <div className="title">
                        总预警量： {this.state.warningConditionObj.total} 条
                      </div>
                      <div className="red">
                        红色预警量： {this.state.warningConditionObj.redWarning}{' '}
                        条 {this.state.warningConditionObj.redPercentage} %
                      </div>
                      <div className="yellow">
                        黄色预警量：{' '}
                        {this.state.warningConditionObj.yellowWarning} 条{' '}
                        {this.state.warningConditionObj.yellowPercentage} %
                      </div>
                    </div>
                    <div id="warning-chart"></div>
                  </div>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="alert-box">预警模型</div>
                  <div className="collapse-wrap">{this.renderCollapse}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default forestry
