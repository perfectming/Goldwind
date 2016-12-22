module.exports = {
  path: 'page',
  childRoutes: [{
    path: 'main',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Home'))
    })
    }
  },{
    path: 'login',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Login'))
    })
    }
  },{
    path: 'test',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Test'))
    })
    }
  }
  ]
};
