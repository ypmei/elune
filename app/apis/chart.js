import _ from 'lodash'
import { fetch } from '../utils/ApiFetch'
import { parseToChart } from './parse/parseToChart'
import { typeConfig } from './config'

const omitKeys = ['day', 'avg_value', 'max_value', 'occur_last_time', 'occur_times', 'typeKey',
'avg_time', 'max_time','date', 'totle_gc', 'over_75_cnt', 'avg_use_pct'
]

export function feedChart(store){
  const { typeKey } = store
  return fetch(`${YPMEI.urlPrefix}/line.do`,{
    body: Object.assign({}, _.omit(store, omitKeys), {
      topic: typeConfig[typeKey].topic,
      nday: 30
    })
  }).then((data)=>{
    return {data: parseToChart(data, typeKey)}
  })
}
