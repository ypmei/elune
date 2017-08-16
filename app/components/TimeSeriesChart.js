import React, { Component } from 'react'
import Highcharts from 'highcharts'
import _ from 'lodash'
import $ from 'jquery'

Highcharts.setOptions({
  global: {
    useUTC: false
  },
  // colors:['#56bc76','#eac85e','#32adfa','#c596fa','#70e0e0','#a1e55c','#f2a38d','#ffe9a6','#7aa9ff','#e5603b'],
  colors: [ '#0873b9', '#f78e2f', '#11c583', '#ffcf68', '#7964ad', '#2ea8ed', '#b07964', '#0a4e78', '#6ddbe1', '#db4c58' ],
  lang: {
    weekdays: [
      __('星期日'),
      __('星期一'),
      __('星期二'),
      __('星期三'),
      __('星期四'),
      __('星期五'),
      __('星期六')
    ],
    shortMonths: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
    months: [
      __('一月'),
      __('二月'),
      __('三月'),
      __('四月'),
      __('五月'),
      __('六月'),
      __('七月'),
      __('八月'),
      __('九月'),
      __('十月'),
      __('十一月'),
      __('十二月')
    ],
    noData: __('暂无数据')
  }
})
export default class TimeSeriesChart extends Component {
  static defaultProps = {
    options: {},
    data: [],
    yAxis: [ {} ],
    height: 180,
    tooltipTemplate: '',
    title: '',
    plotOptions: {},
  }
  render(){
    return (
      <div ref="root" style={{width: '100%', height: '100%'}}></div>
    )
  }
  componentDidMount(){
    var options = Object.assign({
      chart: Object.assign({}, {
        spacing: [ 15, 10, 10, 10 ],
        height: this.props.height,
        type: this.props.chartType,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        plotBorderWidth: 0,
        zoomType: 'x',
        style: {
          fontFamily: '"Microsoft Yahei","Open Sans", "Hiragino Sans GB",  sans-serif'
        }
      }, {
        renderTo: this.refs.root
      }, this.props.chart),
      title: Object.assign({}, {
        text: this.props.title || null,
        align: 'left',
        style: {
          color: '#757575',
          fontSize: '1.4rem',
          fontWeight: 700
        }
      }, this.props.options.title),
      credits: {
        enabled: false,
        text: 'OneAPM',
        href: 'http://www.oneapm.com'
      },
      xAxis: Object.assign({}, {
        type: 'datetime',
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 60 * 1000,
        labels: {
          style: {
            color: '#757575',
            fontWeight: '300',
            fontSize: 11,
            whiteSpace: 'nowrap',
            fontFamily: '"Microsoft Yahei","Open Sans", sans-serif'
          }
        },
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%b/%e',
          week: '%b/%e',
          month: '%Y/%b',
          year: '%Y'
        }
      }, this.props.xAxis, this.props.options.xAxis),
      yAxis: Object.assign({}, {
          title: {
            text: null
          },
          min: 0,
          labels: {
            align: 'left',
            x: 0,
            y: -2,
            style: {
              color: '#757575',
              whiteSpace: 'nowrap',
              fontSize: 11,
              fontWeight: '400',
              fontFamily: '"Microsoft Yahei","Open Sans", sans-serif'
            }
          },
          tickColor: "#888888",
          gridLineColor: '#EAEAEA',
          offset: 0,
          minPadding: 0,
          tickPosition: 'outside'
        }, this.props.yAxis, this.props.options.yAxis),
      series: this.props.data.series,
      plotOptions: Object.assign({}, {
        pie: {
          animation: false,
          dataLabels: {
            color: '#666666',
            shadow: false,
            fontWeight: 'normal',
            padding: 0,
            connectorPadding: 0,
            style: {
              width: 40
            }
          },
          stickyTracking: true
        },
        spline: {
          lineWidth: 2.5,
          marker: {
            radius: 1,
            lineWidth: 1
          }
        },
        line: {
          lineWidth: 2.5,
          marker: {
            radius: 2.5,
            lineWidth: 1,
            lineColor: 'transparent'
          }
        },
        area: {
          lineColor: 'rgba(0,0,0,0.1)',
          connectEnds: false,
          fillOpacity: 0.9,
          lineWidth: 0.5,
          stacking: 'normal',
          marker: {
            radius: 2,
            lineWidth: 1,
            symbol: "circle"
          }
        },
        series: {
          dashStyle: "solid",
          pointInterval: 60000,
          borderColor: '#fff'
        },
        bar: {
          stacking: 'percent',
          pointInterval: 1
        },
        columnrange: {
          pointInterval: 1
        },
        column: {
          pointWidth: this.props.pointWidth || 20,
          stacking: this.props.stacking
        }
      }, this.props.plotOptions),
      tooltip: {
        crosshairs: true,
        shared: true
      },
      noData: {
        style: {
          fontSize: '12px',
          fontWeight: 'normal',
          color: '#999999'
        }
      }
    })
    this.__chart = new Highcharts.Chart(options)
  }
  componentWillReceiveProps(nextProps){
    var oldSeriesNames = _.map(this.__chart.series, 'name')
    var newSeriesNames = _.map(nextProps.data.series, 'name')
    this.__chart.series.filter((s) => {
      return _.includes(newSeriesNames, s.name) === false
    }).forEach((s) => {
      s.remove();
    });
    var partNew = _.partition(nextProps.data.series, (s) => {
      return _.includes(oldSeriesNames, s.name)
    });
    var existedSeries = partNew[0]
      , newSeries = partNew[1]

    existedSeries.forEach((serie) => {
      var oldSerie = _.find(this.__chart.series, {'name': serie.name})
      oldSerie.update(serie, false);
    });
    newSeries.forEach((s) => {
      this.__chart.addSeries(s, false, false);
    });
    this.__chart.redraw();
  }
  componentWillUnmount(){
    this.__chart.destroy()
    this.__chart = null;
  }
}
