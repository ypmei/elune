export default {
  path: '/',
  component: require('./controllers/Root'),
  indexRoute: {
    onEnter(nextState, replace) {
      replace('disk')
    }
  },
  childRoutes: require('./controllers/apps/routes')
}
