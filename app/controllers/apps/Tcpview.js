import React, { Component } from 'react'
import { feedApi } from '../../apis/feed'
import Table from '../../components/Table'
import format from '../../utils/format'
import Nav from './Nav'
import Footer from './Footer'
import { drillMount } from '../../components/Drilldown'
import Chartview from './Chartview'

const tcpCols = [{
    key: 'id',
    title: __('序号'),
    width: 60,
    render:(fmtVal, rowData, rowInd)=>{
      return (
        <span>{rowInd+1}</span>
      )
    }
  }, {
    key: 'instance_id',
    title: __('实例ID'),
    width: 'auto'
  }, {
    key: 'avg_value',
    title: __('均值'),
    width: 150
  }, {
    key: 'max_value',
    title: __('最大值'),
    width: 150
  }
]

const retranTcpCols = [{
    key: 'id',
    title: __('序号'),
    width: 60,
    render:(fmtVal, rowData, rowInd)=>{
      return (
        <span>{rowInd+1}</span>
      )
    }
  }, {
    key: 'instance_id',
    title: __('实例ID'),
    width: 'auto'
  }, {
    key: 'avg_value',
    title: __('均值(%)'),
    width: 150,
    render:(fmtVal)=>fmtVal+' %'
  }, {
    key: 'max_value',
    title: __('最大值(%)'),
    width: 150,
    render:(fmtVal)=>fmtVal+' %'
  }
]

export default class Tcp extends Component {
  showChart(rowData, typeKey){
    drillMount(Chartview, {
      title: rowData.instance_id,
      renderTo: '.fullpage',
      typeKey: typeKey,
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
          <Nav type="tcp" />
          <div className="main relative">
            <div className="fullpage scroll-y flex-col-1">
              <div className="flex-row-1">
                <div className="flex-col-1">
                  <h3>{__('连接失败次数')}</h3>
                  <Table
                    className="b-r-1"
                    fetch={ feedApi }
                    paramStores = { [{
                        typeKey: 'tcpAtmpFail'
                    }] }
                    columns={ tcpCols.concat({
                      key: 'chart',
                      title: __('图表'),
                      width: 60,
                      render:(fmtVal, rowData)=>{
                        return (
                          <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'tcpAtmpFail')}>
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
                <div className="flex-col-1 padd-l-10">
                  <h3>{__('当前连接数')}</h3>
                  <Table
                    className="b-l-1"
                    fetch={ feedApi }
                    paramStores = { [{
                        typeKey: 'tcpCurrEstab'
                    }] }
                    columns={ tcpCols.concat({
                      key: 'chart',
                      title: __('图表'),
                      width: 60,
                      render:(fmtVal, rowData)=>{
                        return (
                          <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'tcpCurrEstab')}>
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
              <div className="flex-row-1">
                <div className="flex-col-1">
                  <h3 className="b-t-1">{__('重连次数')}</h3>
                  <Table
                    className="b-r-1"
                    fetch={ feedApi }
                    paramStores = { [{
                        typeKey: 'tcpReset'
                    }] }
                    columns={ tcpCols.concat({
                      key: 'chart',
                      title: __('图表'),
                      width: 60,
                      render:(fmtVal, rowData)=>{
                        return (
                          <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'tcpReset')}>
                            <i className="iconfont">&#xe71b;</i>
                          </a>
                        )
                      }
                    }) }
                    defaultExtParams={{
                      sortKey: 'day',
                      sortScend: -1,
                      limit: 10
                    }}
                  />
                </div>
                <div className="flex-col-1 padd-l-10">
                  <h3 className="b-t-1">{__('重传率')}</h3>
                  <Table
                    className="b-l-1"
                    fetch={ feedApi }
                    paramStores = { [{
                        typeKey: 'tcpRetran'
                    }] }
                    columns={ retranTcpCols.concat({
                      key: 'chart',
                      title: __('图表'),
                      width: 60,
                      render:(fmtVal, rowData)=>{
                        return (
                          <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'tcpRetran')}>
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
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
