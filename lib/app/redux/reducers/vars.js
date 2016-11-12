'use strict';

var _ = require('lodash');
var actions = require('../actions');

module.exports = function (state = {}, action = {}) {

  if (action.type === actions.SET_VARS) {
    return _.assign({}, state, _.object([[action.key, action.value]]));
  }

  return state;
};

