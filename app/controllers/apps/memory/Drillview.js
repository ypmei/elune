import React, { Component } from 'react'
import FetchWidget from '../../../utils/FetchWidget'
import TimeSeriesChart from '../../../components/TimeSeriesChart'
import Card from '../../../components/Card'
import { feedMemChart, feedLoadChart } from '../../../apis/memory'

export default class Drillview extends Component {
  render(){
    return (
      <div>
        <Card title="内存使用率">
          <FetchWidget fetch={feedMemChart} >
            <TimeSeriesChart height={220} chartType="area" />
          </FetchWidget>
        </Card>
        <Card title="系统负载">
          <FetchWidget fetch={feedLoadChart} >
            <TimeSeriesChart height={220} />
          </FetchWidget>
        </Card>
      </div>
    )
  }
}
