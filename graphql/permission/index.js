const { shield, and, not, or } = require('graphql-shield')
const { isAuthenticated } = require('./rule')

module.exports = shield({
    Query: {
        hello: isAuthenticated
    }
},{
    debug: true
})
