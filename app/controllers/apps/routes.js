export default [{
  path: 'disk',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./Diskview')))
    }
  },
  childRoutes:[]
},{
  path: 'memory',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./Memoryview')))
    }
  }
},{
  path: 'net',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./Netview')))
    }
  }
},{
  path: 'tcp',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./Tcpview')))
    }
  }
},{
  path: 'jvm',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./Jvmview')))
    }
  }
}]
