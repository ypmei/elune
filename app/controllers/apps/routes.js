export default {
  path: 'apps',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => cb(null, require('./Overview')))
    }
  },
  childRoutes:[]
}
