import BaseApplication  from "./base/BaseApplication";

module.exports = {
  name: 'app',
  path: '/app/',
  component: BaseApplication,
  childRoutes: [
    require('./pages'),
    require('./404')
  ]
};
