import React, { Component } from 'react'
import { feedBytout, feedBytin } from '../../../apis/net'
import Table from '../../../components/Table'
import format from '../../../utils/format'
import Nav from '../Nav'
import Footer from '../Footer'
import { drillMount } from '../../../components/Drilldown'
import Drillview from './Drillview'

export default class Net extends Component {
  netCols = [{
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
      key: 'callCountPerMin',
      title: __('日均值(kb)'),
      format: format.numberic,
      width: 150
    }, {
      key: 'max_value',
      title: __('日峰值(kb)'),
      width: 150
    }, {
      key: 'occur_last_time',
      title: __('最后发生时间'),
      width: 200
    }, {
      key: 'occur_times',
      title: __('峰值发生次数'),
      width: 150
    }, {
      key: 'chart',
      title: __('图表'),
      width: 150,
      render:(fmtVal, rowData)=>{
        return (
          <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData)}>
            <i className="iconfont">&#xe71b;</i>
          </a>
        )
      }
    }
  ]
  showChart(rowData){
    drillMount(Drillview, {
      title: rowData.instance_id,
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
                fetch={ feedBytin }
                columns={ this.netCols }
                defaultExtParams={{
                  sortKey: 'day',
                  sortScend: -1,
                  limit:10
                }}
              />
              <h3 className="b-t-1">{__('网络流出')}</h3>
              <Table
                fetch={ feedBytout }
                columns={ this.netCols }
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
