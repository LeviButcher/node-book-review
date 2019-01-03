// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

// Moment JS for dates in views
exports.moment = require('moment')
