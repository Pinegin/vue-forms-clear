const VueFormsClear = require('./src/VueFormsClear.js')
VueFormsClear.install = (vue, options = {}) =>
  vue.directive('forms-clear', VueFormsClear(vue, options))
// VueFormsClear.version = proccess.env.VERSION

module.exports = VueFormsClear
