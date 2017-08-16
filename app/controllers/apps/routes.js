export default [{
  path: 'disk',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./disk/Mainview')))
    }
  },
  childRoutes:[]
},{
  path: 'memory',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./memory/Mainview')))
    }
  }
},{
  path: 'net',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./net/Mainview')))
    }
  }
}]
