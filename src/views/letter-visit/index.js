import React, { Component } from 'react'
import classNames from 'classnames' //样式类合并器
import * as echarts from 'echarts'
import { CaretRightOutlined } from '@ant-design/icons'
import './style.scss'
import CountUp from 'react-countup'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

class letterVisit extends Component {
  constructor(porps) {
    super(porps)
    this.state = {
      areaMapTitle: '',
      conditionsObj: {
        total: 123456,
        model: [
          {
            count: 0,
            id: '1564296827496148993',
            name: '办理单位越级访、极端访预警',
          },
          {
            count: 0,
            id: '1564418680407568385',
            name: '二年级查处模型',
          },
          {
            count: 118,
            id: '1564418680424345602',
            name: '批准逮捕案件二次延期超期未移送-经济案件',
          },
        ],
      },
      fundsLatitudeObj: {
        yearTotal: 4876324,
        restore: 4876324,
        area: {
          云和: 10,
          市本级: 20,
          庆元: 30,
          景宁: 40,
          松阳: 50,
          缙云: 60,
          莲都: 70,
          遂昌: 80,
          青田: 90,
          龙泉: 120,
        },
      },
      modelTypeList: [
        {
          count: 118,
          id: '1',
          name: '信访事项办理',
        },
        {
          count: 0,
          id: '2',
          name: '化解资金使用',
        },
        {
          count: 0,
          id: '3',
          name: '信访事项督查',
        },
      ],
      petitionModelTypeId: '',
      showMaxMap: false,
      maxMapObj: {},
      areaMapList: [
        {
          id: '1',
          name: '市本级',
          nameEn: 'shibenji',
          dataList: [
            {
              name: '红色预警',
              value: [
                {
                  count: '(118)',
                  id: '1564418680424345602',
                  name: '批准逮捕案件二次延期超期未移送-经济案件',
                },
              ],
            },
          ],
        },
      ],
    }
  }

  // 增长趋势图
  leftChartBoxOne() {
    let keys = Object.keys(this.state.fundsLatitudeObj.area)
    let values = Object.values(this.state.fundsLatitudeObj.area)
    let colors = [
      ['#0262FD', '#022A7A'],
      ['#FA7524', '#232A5A'],
      ['#712CDD', '#081C65'],
      ['#BF702B', '#2E2B51'],
      ['#5FBF9B', '#163866'],
      ['#C7A122', '#24294D'],
      ['#82D1C4', '#44738E'],
      ['#5BBABF', '#0D2360'],
      ['#499DD1', '#132D70'],
      ['#57CE45', '#112E4D'],
    ]
    let datas = []
    values.map((item, index) => {
      datas.push({
        value: item,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors[index][0] },
            { offset: 1, color: colors[index][1] },
          ]),
        },
      })
    })
    let myChart = echarts.init(document.getElementById('leftChartOne'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '40',
        left: '10',
        right: '10',
        bottom: '10',
        containLabel: true,
      },
      color: ['#F3921F'],
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#61919C',
              width: 1,
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLine: {
            show: false,
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#525885',
              type: 'dotted',
            },
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
          data: keys,
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '万元',
          nameTextStyle: {
            color: '#fff',
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12,
              formatter: '{value}',
            },
          },
          axisLine: {
            show: false,
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#525885',
              type: 'dotted',
            },
          },
        },
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 16,
          data: datas,
        },
      ],
    })
  }
  // 地图模型类型切换
  modelTypeFn(id) {
    this.setState({
      showMaxMap: false,
    })
    if (this.state.petitionModelTypeId != id) {
      this.setState({
        petitionModelTypeId: id,
      })
    }
  }
  // 地图切换
  areaMapTabFn(index, item) {
    if (this.state.areaMapTabIndex != index) {
      this.setState({
        areaMapTabIndex: index,
        areaMapTitle: item.title,
        areaId: index == 0 ? '' : this.state.areaMapList[index - 1].id,
      })
      if (index != 1) {
        this.setState({
          showMaxMap: true,
          maxMapOb: item,
        })
      }
    } else {
      this.cancelMap()
    }
  }
  // 取消选中地图
  cancelMap() {
    this.setState({
      areaMapTabIndex: 0,
      areaMapTitle: '',
      areaId: '',
    })
  }

  componentDidMount() {
    this.leftChartBoxOne()
  }

  render() {
    return (
      <div className="letter-visit">
        <div className="screen-wrap">
          <div className="head-bar">
            <div className="title">
              丽水市<span>信访领域</span>大数据监督应用
            </div>
          </div>
          <div className="content">
            <div className="main-side">
              <div className="left-side">
                <div className="flex-row col-center row-center">
                  <div className="year flex-row col-center row-center">
                    <div className="all">全部</div>
                    <RangePicker
                      bordered={false}
                      inputReadOnly={true}
                      picker="year"
                      onChange={this.changeTimeFn}
                    />
                  </div>
                  <div className="city">
                    丽水市{this.state.areaMapTitle ? ' ·' : ''}
                    <span>{this.state.areaMapTitle}</span>
                  </div>
                </div>
                <div className="side-box mt">
                  <div className="toptitle">
                    <span>主要情况</span>
                  </div>
                  <div className="inner">
                    <div className="petition-number flex-row col-center">
                      <div className="icon">
                        <img
                          src={require('../../assets/images/letter-visit/petition-icon.png')}
                          alt=""
                        />
                      </div>
                      <div className="flex-col">
                        <div className="text">总上访次数</div>
                        <div className="text">
                          <span className="number">
                            <CountUp
                              start={0}
                              end={this.state.conditionsObj.total}
                              duration="3"
                              redraw={true}
                              separator=","
                            />
                          </span>
                          次
                        </div>
                      </div>
                    </div>
                    <div className="petition-list flex-row">
                      {this.state.conditionsObj.model.map((item, index) => (
                        <div className="item flex-col row-center" key={index}>
                          <p>
                            <span className="number">{item.count}</span>次
                          </p>
                          <p className="omit">{item.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="petition-total">
                      年度总化解专项资金
                      <span className="number">
                        <CountUp
                          start={0}
                          end={this.state.fundsLatitudeObj.yearTotal}
                          duration="3"
                          redraw={true}
                          separator=","
                        />
                      </span>
                      元
                    </div>
                    <div className="chart-box">
                      <div
                        id="leftChartOne"
                        style={{ width: '100%', height: '100%' }}
                      ></div>
                    </div>
                    <div className="capital-total flex-row row-center col-center">
                      <span>
                        挽回化解
                        <br />
                        专项资金
                      </span>
                      <span className="number">
                        {' '}
                        <CountUp
                          start={0}
                          end={this.state.fundsLatitudeObj.restore}
                          duration="3"
                          redraw={true}
                          separator=","
                        />
                      </span>
                      <span>
                        <br />元
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="middle-side">
                <div className="total-list flex-row">
                  {this.state.modelTypeList.map((item, index) => (
                    <div className="item flex-row col-center" key={index}>
                      <div className="icon flex-row col-center row-center">
                        <img
                          src={require('../../assets/images/letter-visit/shixiangbanli.png')}
                          alt=""
                        />
                      </div>
                      <div className="flex-col">
                        <div className="number">
                          <CountUp
                            start={0}
                            end={item.count}
                            duration="2"
                            redraw={true}
                            separator=","
                          />
                        </div>
                        <div className="name">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="map-side flex-row row-between">
                  <div className="type">
                    <div className="title">
                      <span>各区县信访类型</span>
                    </div>
                    <div
                      className={classNames(
                        this.state.petitionModelTypeId == '' ? 'active' : '',
                        'item',
                        'flex-row',
                        'row-between',
                        'col-center'
                      )}
                      onClick={() => this.modelTypeFn('')}
                    >
                      <span>全部</span>
                      <CaretRightOutlined />
                    </div>
                    {this.state.modelTypeList.map((item, index) => (
                      <div
                        className={classNames(
                          this.state.petitionModelTypeId == item.id
                            ? 'active'
                            : '',
                          'item',
                          'flex-row',
                          'row-between',
                          'col-center'
                        )}
                        key={index}
                        onClick={() => this.modelTypeFn(item.id)}
                      >
                        <span>{item.name}</span>
                        <CaretRightOutlined />
                      </div>
                    ))}
                  </div>
                  {/* 显示大图 */}
                  {/* 地图 */}
                  {this.state.showMaxMap ? (
                    <div
                      className="map-box"
                      style={{ backgroundImage: 'none', cursor: 'pointer' }}
                      onClick={() => this.setState({ showMaxMap: false })}
                    >
                      <div
                        className={classNames(
                          'item',
                          'active-map',
                          this.state.maxMapObj.nameEn
                        )}
                        id="maxMap"
                      >
                        <div className="name">{this.state.maxMapObj.name}</div>
                        <div className="more" style={{ right: '27rem' }}>
                          {this.state.maxMapObj.dataList.map((value, idx) => (
                            <dl key={idx}>
                              <dt>{value.name}</dt>
                              {value.value.map((val, idxs) => (
                                <dd key={idxs}>{val.name + ' ' + val.count}</dd>
                              ))}
                            </dl>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="map-box">
                      {this.state.areaMapList.map((item, index) => (
                        <div
                          className={classNames(
                            item.nameEn,
                            this.state.areaMapTabIndex == ++index
                              ? 'active-map'
                              : '',
                            'item'
                          )}
                          key={index}
                          onClick={() => this.areaMapTabFn(index, item)}
                        >
                          <div className="name">{item.name}</div>
                          <div className="more">
                            {item.dataList.map((value, idx) => (
                              <dl key={idx}>
                                <dt>{value.name}</dt>
                                {value.value.map((val, idxs) => (
                                  <dd key={idxs}>
                                    {val.name + ' ' + val.count}
                                  </dd>
                                ))}
                              </dl>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default letterVisit
