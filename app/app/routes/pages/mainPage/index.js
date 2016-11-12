module.exports = {
  path: 'mainpage',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Home'))
      })
    }
  }
};
