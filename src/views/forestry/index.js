import React, { Component } from 'react'
import classNames from 'classnames' //样式类合并器
import * as echarts from 'echarts'
import './style.scss'
import JsSeamlessScroll from '../../components/JsSeamlessScroll'
import SelectYear from '../../components/SelectYear'
import ProgressBar from '../../components/ProgressBar'

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
      collapseList: [
        {
          count: 145,
          id: '2',
          name: '代持公益林',
          total: 145,
          warningType: 2,
          isDropup: true,
        },
        {
          count: 120,
          id: '3',
          name: '代持公益林',
          total: 145,
          warningType: 2,
          isDropup: false,
        },
      ],
      forestryModelId: '',
      listData: [
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
        {
          villageName: '666',
          year: '2022',
          difference: '888',
          warningType: '1',
          status: '状态',
        },
      ],
      areaMapList: [
        {
          id: '1',
          name: '市本级',
          nameEn: 'shibenji',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '9',
          name: '莲都',
          nameEn: 'liandu',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '11',
          name: '龙泉',
          nameEn: 'longquan',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '6',
          name: '青田',
          nameEn: 'qingtian',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '5',
          name: '云和',
          nameEn: 'yunhe',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '7',
          name: '庆元',
          nameEn: 'qinyuan',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '4',
          name: '缙云',
          nameEn: 'jinyun',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '2',
          name: '遂昌',
          nameEn: 'suichang',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '3',
          name: '松阳',
          nameEn: 'songyang',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
        {
          id: '8',
          name: '景宁',
          nameEn: 'jinning',
          dataList: [
            {
              name: '公益林补偿金',
              count: 99,
            },
          ],
        },
      ],
      areaMapTabIndex: 0,
      areaMapTitle: '',
      areaId: '',
      showMaxMap: false,
      maxMapObj: {},
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
    let collapseList = this.state.collapseList
    collapseList[index].isDropup = !collapseList[index].isDropup
    if (collapseList[index].isDropup) {
      this.listData = []
      // this.getWarningModelPageFn()
    }
    collapseList = collapseList.map((item, idx) => {
      if (index != idx) {
        item.isDropup = false
      }
      return item
    })
    this.setState({
      forestryModelId: this.state.collapseList[index].id,
      collapseList,
    })
  }
  // 渲染-预警模型
  renderCollapse() {
    return this.state.collapseList.map((item, index) => {
      return (
        <div key={index}>
          <div className="collapse disFlex">
            <div
              onClick={() => this.showModalFn(item.id)}
              style={{ width: '45%' }}
            >
              {item.name}
            </div>
            <div className="disFlex row-between" style={{ width: '55%' }}>
              <ProgressBar
                progressBar={'progress-bar' + item.id}
                data={[item.count, item.total]}
              />
              <div className="disFlex" style={{ marginLeft: '0.75rem' }}>
                {item.count}条
                <i
                  className={classNames(
                    'down iconfont',
                    item.isDropup ? 'icon-shangla' : 'icon-xiala'
                  )}
                  onClick={() => this.isDropupFn(index)}
                ></i>
              </div>
            </div>
          </div>
          {item.isDropup && (
            <div className="table-box">
              <div className="thead">
                <div className="column one">村名</div>
                <div className="column one">年度</div>
                <div className="column one">差额</div>
                <div className="column one">状态</div>
              </div>
              <div className="tbody">
                {this.state.listData.length > 0 ? (
                  <JsSeamlessScroll
                    className="seamless-warp list"
                    datas={this.state.listData}
                    singleHeight={41}
                    singleWaitTime={2000}
                    hover={true}
                  >
                    {this.state.listData.map((value, index) => {
                      return (
                        <div className="item" key={index}>
                          <div className="column one">{value.villageName}</div>
                          <div className="column one">{value.year}</div>
                          <div className="column one">{value.difference}元</div>
                          <div className="column one">
                            <span
                              className={classNames(
                                value.warningType == 1 ? 'red' : 'yellow'
                              )}
                            >
                              {value.status}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </JsSeamlessScroll>
                ) : (
                  <div v-else className="no-data">
                    暂无数据
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )
    })
  }
  // 地图切换
  areaMapTabFn(index, item, flag) {
    if (flag) {
      if (this.state.areaMapTabIndex != index) {
        this.setState({
          areaMapTabIndex: index,
          areaMapTitle: item.title,
          areaId: index == 0 ? '' : this.state.areaMapList[index - 1].id,
        })
        if (index != 1) {
          this.setState({
            showMaxMap: true,
            maxMapObj: item,
          })
        }
      } else {
        this.cancelMap()
      }
    } else {
      if (this.state.areaMapTabIndex != index) {
        this.setState({
          areaMapTabIndex: index,
          areaMapTitle: item.title,
          areaId: index == 0 ? '' : this.state.areaMapList[index - 1].id,
        })
      }
      this.setState({
        showMaxMap: false,
      })
    }
  }
  // 取消选中地图
  cancelMap() {
    this.areaMapTabIndex = 0
    this.areaMapTitle = ''
    this.areaId = ''
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
                  <div className="collapse-wrap">{this.renderCollapse()}</div>
                </div>
              </div>
              <div className="middle-side">
                <div className="side-box">
                  <div className="side-title">各区县林业预警统计</div>
                  <div className="flex-row row-between col-center">
                    {/* 导航线 */}
                    <div className="map-type">
                      <div
                        className={classNames(
                          this.state.areaMapTabIndex == 0 ? 'active' : '',
                          'item',
                          'flex-row',
                          'col-center'
                        )}
                        onClick={() => this.areaMapTabFn(0, '')}
                      >
                        <em></em>
                        <span>丽水市</span>
                      </div>
                      {this.state.areaMapList.map((item, index) => (
                        <div
                          key={item.id}
                          className={classNames(
                            this.state.areaMapTabIndex == ++index
                              ? 'active'
                              : '',
                            'item',
                            'flex-row',
                            'col-center'
                          )}
                          onClick={() => this.areaMapTabFn(index, item)}
                        >
                          <em></em>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
