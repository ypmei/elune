export default {
  path: '/',
  component: require('./controllers/Root'),
  indexRoute: {
    onEnter(nextState, replace) {
      replace('apps')
    }
  },
  childRoutes: [
    require('./controllers/apps/routes')
  ]
}
