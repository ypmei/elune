import React, { Component } from 'react'
import { feedDisk, feedDiskIO, feedMem, feedLoad, feedBytout, feedBytin } from '../../apis/overview'
import FetchWidget from '../../utils/FetchWidget'
import TimeSeriesChart from '../../components/TimeSeriesChart'
import { Success } from '../../components/Notify'

const navs = [
  {
    url: '#/disk',
    key: 'disk',
    title: '磁盘'
  },
  {
    url: '#/memory',
    key: 'memory',
    title: '内存'
  },
  {
    url: '#/net',
    key: 'net',
    title: '网络'
  }
]

export default class Overview extends Component {
  render(){
    return (
      <div className="flex">
        <header>
          <div className="logo" data-tip="tooltip" data-place="bottom"></div>
        </header>
        <div className="flex-body">
          <div className="main relative">
            <div className="fullpage scroll-y">
              <FetchWidget fetch={feedDisk} >
                <TimeSeriesChart height={165} chartType="area" />
              </FetchWidget>
            </div>
          </div>
          <div className="nav navbg-color">
            {
              navs.map((nav)=>{
                return (
                  <a key={nav.key} className="item">{nav.title}</a>
                )
              })
            }
          </div>
        </div>
        <footer>
          2017 &copy; 北京蓝海讯通科技股份有限公司
        </footer>
      </div>
    )
  }
}
