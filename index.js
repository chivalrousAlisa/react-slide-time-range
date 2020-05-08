"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/slide-time-range.min.js");
} else {
  module.exports = require("./cjs/slide-time-range.js");
}