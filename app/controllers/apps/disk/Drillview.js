import React, { Component } from 'react'
import FetchWidget from '../../../utils/FetchWidget'
import TimeSeriesChart from '../../../components/TimeSeriesChart'
import Card from '../../../components/Card'
import { feedDiskChart, feedDiskIOChart } from '../../../apis/disk'

export default class Drillview extends Component {
  render(){
    return (
      <div>
        <Card title="磁盘使用率">
          <FetchWidget fetch={feedDiskChart} >
            <TimeSeriesChart height={220} chartType="area" />
          </FetchWidget>
        </Card>
        <Card title="磁盘IO使用率">
          <FetchWidget fetch={feedDiskIOChart} >
            <TimeSeriesChart height={220} />
          </FetchWidget>
        </Card>
      </div>
    )
  }
}
