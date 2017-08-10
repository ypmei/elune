import _ from 'lodash'

function isHeadOrGet(opts) {
  return _.isUndefined(opts) ? false : (_.isUndefined(opts.method) || /^get|head$/i.test(opts.method)) && !_.isUndefined(opts.body)
}

function getOpts(opts) {
  return isHeadOrGet(opts) ? _.chain(opts).omit('body').value() : (() => {
    return _.chain(opts).mapValues((val, key) => {
      if(key === 'body'){
        if(opts.contentType && opts.contentType === 'application/json'){
          return JSON.stringify(opts.body)
        }
        var data = new FormData();
        _.forEach(val, (v, k) => {
          if(!_.isUndefined(v)) {
            data.append(k, v)
          }
        })
        return data
      }
      return val
    }).value()
  })()
}

function getUrl(url, opts) {
  return isHeadOrGet(opts) ? url + (/\?/.test(url) ? '&' : '?') + _.chain(opts.body).flatMap((val, key) => {
    return _.isNull(val) || _.isUndefined(val) ? '' : (() => {
      if(_.isArray(val)){
        return val.map(v => `${key}=${v}`)
      }
      return `${key}=${val}`
    })()
  }).flattenDeep().value().filter(v => v !== '').join('&') : url
}

function fetchApi(url, options){
  var opts = Object.assign({}, {credentials: 'include'}, getOpts(options))
  return fetch(getUrl(url, options), opts).then((res) => {
    if(res.status >= 200 && res.status < 300){
      return res.json()
    }else{
      var error = new Error(res.statusText)
      error.response = res
      throw error
    }
  })
}

export { fetchApi as fetch }
