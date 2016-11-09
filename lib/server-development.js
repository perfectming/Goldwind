'use strict';
let config = require('config');

require("./server")({
  defaultPort: config.devPort,
});
