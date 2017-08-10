import React, { Component } from 'react'
import { Success } from '../../components/Notify'

export default class AppList extends Component {
  componentDidMount(){
    Success('提示的成功！')
  }
  render(){
    return (
      <div className="margin-20" data-tip="tooltip" data-place="bottom">
        Hello World!
      </div>
    )
  }
}
