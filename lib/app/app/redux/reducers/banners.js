'use strict';

var _ = require('lodash');
var actions = require('../actions');

module.exports = function (state = {}, action = {}) {

  if (action.type === actions.SET_BANNERS) {
    return _.assign({}, state, _.object([[action.bannerType, action.banners]]));
  }

  return state;
};

