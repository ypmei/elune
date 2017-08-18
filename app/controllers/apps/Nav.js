import "../../styles/nav.css";
import React, { Component } from 'react'
import cx from 'classnames'

const navs = [
  {
    url: '#/disk',
    key: 'disk',
    title: '磁盘使用'
  },
  {
    url: '#/memory',
    key: 'memory',
    title: '内存和负载'
  },
  {
    url: '#/net',
    key: 'net',
    title: '网络流量'
  },
  {
    url: '#/tcp',
    key: 'tcp',
    title: 'TCP'
  },
  {
    url: '#/jvm',
    key: 'jvm',
    title: 'JVM垃圾回收'
  }
]

export default class Nav extends Component {
  state = {
    index: 2
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  componentDidMount(){
    this.timer = setInterval(() => {
      let { index } = this.state
      index = index >= 4 ? 0 : index
      this.setState({
        index: index + 1
      })
    }, 60 * 1000)
  }
  render(){
    return (
      <div className={cx('nav', 'navbg-color', `nav-bg-${this.state.index}`)}>
        {
          navs.map((nav)=>{
            return (
              <a href={`#/${nav.key}`} key={nav.key} className={cx('item',{
                active: nav.key === this.props.type
              })}>{nav.title}</a>
            )
          })
        }
      </div>
    )
  }
}
