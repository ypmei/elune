import React, { Component } from 'react'
import { feedApi } from '../../apis/feed'
import { drillMount } from '../../components/Drilldown'
import Table from '../../components/Table'
import format from '../../utils/format'
import Chartview from './Chartview'
import Nav from './Nav'
import Footer from './Footer'

const diskCols = [{
    key: 'id',
    title: __('序号'),
    width: 60,
    render:(fmtVal, rowData, rowInd)=>{
      return (
        <span>{rowInd+1}</span>
      )
    }
  },{
    key: 'day',
    title: __('日期'),
    width: 120
  }, {
    key: 'instance_id',
    title: __('节点'),
    width: 450
  }, {
    key: 'avg_value',
    title: __('日均值'),
    width: 150
  }, {
    key: 'max_value',
    title: __('日峰值'),
    width: 150
  }, {
    key: 'occur_last_time',
    title: __('最后发生时间'),
    width: 200
  }, {
    key: 'occur_times',
    title: __('峰值发生次数'),
    width: 150
  }
]

export default class Disk extends Component {
  showChart(rowData, typeKey){
    drillMount(Chartview, {
      title: rowData.instance_id,
      typeKey: typeKey,
      renderTo: '.fullpage',
      store: rowData
    })
  }
  render(){
    return (
      <div className="flex">
        <header>
          <div className="logo"></div>
        </header>
        <div className="flex-body">
          <Nav type="disk" />
          <div className="main relative">
            <div className="fullpage scroll-y flex-col-1">
              <h3>{__('磁盘使用率')}</h3>
              <Table
                fetch={ feedApi }
                paramStores = { [{
                    typeKey: 'disk'
                }] }
                columns={diskCols.concat([{
                  key: 'tag',
                  title: __('盘符')
                }, {
                  key: 'chart',
                  title: __('图表'),
                  width: 150,
                  render:(fmtVal, rowData)=>{
                    return (
                      <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'disk')}>
                        <i className="iconfont">&#xe71b;</i>
                      </a>
                    )
                  }
                }])}
                defaultExtParams={{
                  sortKey: 'day',
                  sortScend: -1,
                  limit:10
                }}
              />
              <h3 className="b-t-1">{__('磁盘IO使用率')}</h3>
              <Table
                fetch={ feedApi }
                paramStores = { [{
                    typeKey: 'diskIO'
                }] }
                columns={diskCols.concat([{
                  key: 'tag',
                  title: __('设备')
                }, {
                  key: 'chart',
                  title: __('图表'),
                  width: 150,
                  render:(fmtVal, rowData)=>{
                    return (
                      <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'diskIO')}>
                        <i className="iconfont">&#xe71b;</i>
                      </a>
                    )
                  }
                }])}
                defaultExtParams={{
                  sortKey: 'day',
                  sortScend: -1,
                  limit:10
                }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
