var SET_VISITOR = exports.SET_VISITOR = 'SET_VISITOR';

var SET_VARS = exports.SET_VARS = 'SET_VARS';

var SET_BANNERS = exports.SET_BANNERS = 'SET_BANNERS';

var SET_LISTS = exports.SET_LISTS = 'SET_LISTS';
var APPEND_LISTS = exports.APPEND_LISTS = 'APPEND_LISTS';
var UPDATE_LIST_ITEM = exports.UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
var REMOVE_ITEM = exports.REMOVE_ITEM = 'REMOVE_ITEM';

var SET_OBJS = exports.SET_OBJS = 'SET_OBJS';

var APPEND_OBJS = exports.APPEND_OBJS = 'APPEND_OBJS';

exports.setVisitor = function (visitor) {
  return {
    type: SET_VISITOR,
    visitor: visitor
  };
};

exports.logout = function () {
  return {
    type: SET_VISITOR,
    visitor: {
      isLogin: false,
    }
  };
};

exports.setVars = function (key, value) {
  return {
    type: SET_VARS,
    key,
    value
  };
};

exports.setBanners = function (bannerType, banners) {
  return {
    type: SET_BANNERS,
    bannerType,
    banners
  }
};

exports.setLists = function (key, list) {
  return {
    type: SET_LISTS,
    key,
    list
  }
};

exports.appendLists = function (key, list) {
  return {
    type: APPEND_LISTS,
    key,
    list
  }
};

exports.updateListItem = function (key, index, item) {
  return {
    type: UPDATE_LIST_ITEM,
    key,
    index,
    item
  }

};

exports.removeItem = function (key, index) {
  return {
    type: REMOVE_ITEM,
    key,
    index
  }
};
exports.setObjs = function (key, value) {
  return {
    type: SET_OBJS,
    key,
    value
  }
};

exports.appendObjs = function (key, value) {
  return {
    type: SET_OBJS,
    key,
    value
  }
};

exports.appendObjs = function (key, objKey, objValue) {
  return {
    type: APPEND_OBJS,
    key,
    value: (typeof objKey === 'object') ? objKey : _.object([[objKey, objValue]])
  }
};
