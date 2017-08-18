import _ from 'lodash'
import format from '../../utils/format'

const getSeriesData = (data, xv, yv) => {
  return _.chain(data).map((point) => {
    return {
      x: format.timestamp(point[xv]),
      y: parseFloat(point[yv])
    }
  }).sortBy((v) => v.x).value()
}

export const parseToChart = (data, typeKey) => {
    if(typeKey === 'jvmGc'){
      return {
        totleGc:{
          series: [{
            name: 'totle_gc',
            data: getSeriesData(data, 'date', 'totle_gc')
          }]
        },
        series: [{
          name: 'avg_time',
          data: getSeriesData(data, 'date', 'avg_time')
        },{
          name: 'max_time',
          data: getSeriesData(data, 'date', 'max_time')
        }]
      }
    }
    if(typeKey === 'oldMem'){
      return {
        series: [{
          name: 'over_75_cnt',
          data: getSeriesData(data, 'date', 'over_75_cnt')
        },{
          name: 'avg_use_pct',
          data: getSeriesData(data, 'date', 'avg_use_pct')
        }]
      }
    }
    if(['tcpAtmpFail', 'tcpCurrEstab','tcpReset','tcpRetran'].includes(typeKey)){
      return {
        series: [{
          name: 'avg_value',
          data: getSeriesData(data, 'date', 'avg_value')
        },{
          name: 'max_value',
          data: getSeriesData(data, 'date', 'max_value')
        }]
      }
    }
    return {
      series: [{
        name: 'avg_value',
        data: getSeriesData(data, 'day', 'avg_value')
      },{
        name: 'max_value',
        data: getSeriesData(data, 'day', 'max_value')
      }]
    }
}
