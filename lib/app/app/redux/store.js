'use strict';

var {createStore, combineReducers} = require('redux');
var visitor = require('./reducers/visitor');
var vars = require('./reducers/vars');
var objs = require('./reducers/objs');
var lists = require('./reducers/lists');
var banners = require('./reducers/banners');

var mainReducer = combineReducers({
  visitor,
  vars,
  banners,
  lists,
  objs,
});

module.exports = createStore(mainReducer);
