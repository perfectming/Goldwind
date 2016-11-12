'use strict';

var actions = require('../actions');
var _ = require('lodash');

module.exports = function (state = null, action = {}) {

    //if (action.type === actions.SET_VISITOR) {
    //  return _.assign({}, state, _.object([[ action.visitor]]));
    //}
    //
    //return state;


    if (action.type === actions.SET_VISITOR) {
        return action.visitor;
    }

    return state;
};

