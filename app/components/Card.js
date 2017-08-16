import '../styles/components/card.css'
import React, { Component } from 'react'

export default class Card extends Component {
  static defaultProps = {
    title: null,
  }
  render() {
    return (
      <div className="card">
        <div className="card-title">
          {this.props.title}
        </div>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}
