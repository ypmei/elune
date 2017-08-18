import React, { Component } from 'react'
import FetchWidget from '../../utils/FetchWidget'
import TimeSeriesChart from '../../components/TimeSeriesChart'
import Card from '../../components/Card'
import _ from 'lodash'
import { feedChart } from '../../apis/chart'
import { typeConfig } from '../../apis/config'

const omitKeys = ['day', 'avg_value', 'max_value', 'occur_last_time', 'occur_times', 'avg_time', 'max_time','date', 'totle_gc', 'over_75_cnt', 'avg_use_pct']

export default class Chartview extends Component {
  render(){
    return (
      <div className="chart-info">
        <ul>
          {
            _.map(_.omit(this.props.store, omitKeys), (v,k) => {
              return (
                <li key={k}><span>{k} : </span>{v}</li>
              )
            })
          }
          <li key='topic'><span>topic : </span>{ typeConfig[this.props.typeKey].topic }</li>
        </ul>
        <Card>
          <FetchWidget
            fetch={ feedChart }
            paramStores={[ this.props.store, {
              typeKey: this.props.typeKey
            }]}
            >
            {({ data })=>{
              return (
                <div>
                  <TimeSeriesChart
                    data={data}
                    height={300}
                    chartType="line"
                  />
                  {
                    this.props.typeKey === 'jvmGc' ?
                      <Card title="GC">
                        <TimeSeriesChart
                          data = {data.totleGc}
                          height={300} chartType="area"
                        />
                      </Card>
                    : null
                  }
                </div>
              )
            }}
          </FetchWidget>
        </Card>
      </div>
    )
  }
}
