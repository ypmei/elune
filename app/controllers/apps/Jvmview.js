import React, { Component } from 'react'
import { feedApi } from '../../apis/feed'
import Table from '../../components/Table'
import format from '../../utils/format'
import Nav from './Nav'
import Footer from './Footer'
import { drillMount } from '../../components/Drilldown'
import Chartview from './Chartview'

const jvmCols = [{
    key: 'id',
    title: __('序号'),
    width: 60,
    render:(fmtVal, rowData, rowInd)=>{
      return (
        <span>{rowInd+1}</span>
      )
    }
  },{
    key: 'date',
    title: __('日期')
  }, {
    key: 'tag1',
    title: __('IP')
  },{
    key: 'tag2',
    title: __('进程'),
    width: '20%'
  }, {
    key: 'metric_id',
    title: __('指标项')
  }, {
    key: 'avg_time',
    title: __('平均gc时间(ms)')
  }, {
    key: 'totle_gc',
    title: __('总gc次数')
  }, {
    key: 'max_time',
    title: __('最长gc时间(ms)')
  }
]

const oldCols = [{
    key: 'id',
    title: __('序号'),
    width: 60,
    render:(fmtVal, rowData, rowInd)=>{
      return (
        <span>{rowInd+1}</span>
      )
    }
  },{
    key: 'date',
    title: __('日期')
  }, {
    key: 'tag1',
    title: __('IP')
  },{
    key: 'tag2',
    title: __('进程'),
    width: '20%'
  }, {
    key: 'avg_use_pct',
    title: __('平均使用(%)'),
    render:(fmtVal)=>fmtVal+' %'
  }, {
    key: 'over_75_cnt',
    title: __('百分数占比_75(%)'),
    render:(fmtVal)=>fmtVal+' %'
  }
]

export default class Net extends Component {
  showChart(rowData, typeKey){
    drillMount(Chartview, {
      title: `${rowData.tag2}(${rowData.tag1})`,
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
          <Nav type="jvm" />
          <div className="main relative">
            <div className="fullpage scroll-y flex-col-1">
              <h3>{__('JVM GC信息')}</h3>
              <Table
                fetch={ feedApi }
                paramStores = { [{
                    typeKey: 'jvmGc'
                }] }
                columns={ jvmCols.concat({
                   key: 'chart',
                   title: __('图表'),
                   width: 150,
                   render:(fmtVal, rowData)=>{
                   return (
                     <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'jvmGc')}>
                       <i className="iconfont">&#xe71b;</i>
                     </a>
                     )
                   }
                 })
                }
                defaultExtParams={{
                  sortKey: 'day',
                  sortScend: -1,
                  limit: 10
                }}
              />
              <h3 className="b-t-1">{__('Memory Old信息')}</h3>
              <Table
                fetch={ feedApi }
                paramStores = { [{
                    typeKey: 'oldMem'
                }] }
                columns={ oldCols.concat({
                   key: 'chart',
                   title: __('图表'),
                   width: 150,
                   render:(fmtVal, rowData)=>{
                   return (
                     <a href={'javascript:;'} onClick={this.showChart.bind(this, rowData, 'oldMem')}>
                       <i className="iconfont">&#xe71b;</i>
                     </a>
                     )
                   }
                 })
                }
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
