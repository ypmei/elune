import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export function mountService(Component, props = {}, parent = document.body){
  var content = document.createElement('div')
  parent.appendChild(content)
  ReactDOM.render((
    <Component {...props}/>
  ), content)
  return () => {
    ReactDOM.unmountComponentAtNode(content)
    parent.removeChild(content)
  }
}
