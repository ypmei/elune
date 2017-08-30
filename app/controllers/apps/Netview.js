import React, { Component } from 'react'
import { feedApi } from '../../apis/feed'
import Table from '../../components/Table'
import format from '../../utils/format'
import Nav from './Nav'
import Footer from './Footer'
import { drillMount } from '../../components/Drilldown'
import Chartview from './Chartview'

const netCols = [{
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
    title: __('日期')
  }, {
    key: 'instance_id',
    title: __('节点'),
    width: '20%'
  }, {
    key: 'avg_value',
    title: __('日均值(kb)')
  }, {
    key: 'max_value',
    title: __('日峰值(kb)')
  }, {
    key: 'occur_last_time',
    title: __('最后发生时间')
  }, {
    key: 'occur_times',
    title: __('峰值发生次数')
  }
]

export default class Net extends Component {
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
          <Nav type="net" />
          <div className="main relative">
            <div className="fullpage scroll-y flex-col-1">
              <h3>{__('网络流入')}</h3>
              <Table
                fetch={ feedApi }
                paramStores = { [{
                    typeKey: 'bytin'
                }] }
                columns={ netCols.concat({
                  key: 'chart',
                  title: __('图表'),
                  width: 150,
                  render:(fmtVal, rowData)=>{
                    return (
                      <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'bytin')}>
                        <i className="iconfont">&#xe71b;</i>
                      </a>
                    )
                  }
                }) }
                defaultExtParams={{
                  sortKey: 'day',
                  sortScend: -1,
                  limit:10
                }}
              />
              <h3 className="b-t-1">{__('网络流出')}</h3>
              <Table
                fetch={ feedApi }
                paramStores = { [{
                    typeKey: 'bytout'
                }] }
                columns={ netCols.concat({
                  key: 'chart',
                  title: __('图表'),
                  width: 150,
                  render:(fmtVal, rowData)=>{
                    return (
                      <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'bytout')}>
                        <i className="iconfont">&#xe71b;</i>
                      </a>
                    )
                  }
                }) }
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
