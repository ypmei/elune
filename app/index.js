import './styles/styles.css'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import history from './history'
import Tooltip from './components/Tooltip'
import { mountService } from './utils/mountService'
import { NoticeContainer } from './components/Notify'
import routes from './routes'

mountService(NoticeContainer)

ReactDOM.render((
  <Router
    history={history}
    routes={routes}
  />
), document.getElementById('layout'))
