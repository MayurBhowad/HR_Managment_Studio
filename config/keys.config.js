
if (process.env.NODE_ENV === 'developer') {
    module.exports = require('./dev.config');
} else if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod.config');
} else if (process.env.NODE_ENV === 'test') {
    module.exports = require('./test.config');
}