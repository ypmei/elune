import _ from 'lodash'
import format from '../../utils/format'

export const parseToChart = (data) => {
    return {
      series: [{
        name: data[0].instance_id,
        data:_.chain(data).map(({occur_last_time, avg_value}) => {
          return {
            x: format.timestamp(occur_last_time),
            y: parseFloat(avg_value)
          }
        }).sortBy((v) => v.x).value()
      }]
    }
}
