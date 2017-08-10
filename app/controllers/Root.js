import React, { Component } from 'react'
import { bindStores } from './provider'
import RefreshStore from '../stores/RefreshStore'

@bindStores({
  refreshStore: RefreshStore
})
export default class Root extends Component {
  render(){
    return (
      <div>
        {
          this.renderChildren()
        }
      </div>
    )
  }
}
