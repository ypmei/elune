import React, { Component } from 'react'
import FetchWidget from '../../../utils/FetchWidget'
import TimeSeriesChart from '../../../components/TimeSeriesChart'
import Card from '../../../components/Card'
import { feedBytoutChart, feedBytinChart } from '../../../apis/net'

export default class Drillview extends Component {
  render(){
    return (
      <div>
        <Card title="网络流入">
          <FetchWidget fetch={feedBytinChart} >
            <TimeSeriesChart height={220} />
          </FetchWidget>
        </Card>
        <Card title="网络流出">
          <FetchWidget fetch={feedBytoutChart} >
            <TimeSeriesChart height={220} />
          </FetchWidget>
        </Card>
      </div>
    )
  }
}
