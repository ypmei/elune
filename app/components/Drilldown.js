import '../styles/components/drilldown.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const zIndex = 1
class DrillContainer extends Component {
  static defaultProps = {
    modal: true,
    resizable: false,
    renderTo: '.drilldown',
    defaultSize: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      right: 0,
      bottom: 0,
      top: 0,
      left: 0
    },
    onResume: () => {},
    onMinimize: () => {}
  }
  constructor(props, context){
    super(props, context)
    this.close = this.close.bind(this)
    this.state = {
      minimized: false,
      style: Object.assign({zIndex: zIndex}, this.props.defaultSize)
    }
  }
  close(){
    const content = document.querySelector('.drill-container')
    ReactDOM.unmountComponentAtNode(content)
  }
  render(){
    return(
      <div className="flex-col-1">
        <div className="modal-content modal-shadow flex-col-1" style={this.state.style}>
          <div className="modal-header">
            <div className="close" onClick={() => this.close()}>
              <i className="iconfont">&#xe604;</i>
            </div>
            <div className="modal-title">{this.props.title}</div>
          </div>
          <div className="modal-body scroll-y flex-col-1" id="drill-content">
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    )
  }
}

export function drillMount(Component, props){
  var content = document.querySelector('.drill-container')
  if(content){
    ReactDOM.unmountComponentAtNode(content)
  }else{
    content = document.createElement('div')
    content.className = 'drill-container'
    props.renderTo = props.renderTo || '.drilldown'
    document.querySelector(props.renderTo).appendChild(content)
  }
  ReactDOM.render((
    <DrillContainer {...props} >
      <Component {...props} />
    </DrillContainer>
  ), content)
}
