const authSchema = require('./auth')

const rootSchema = `
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`

module.exports = [
    rootSchema, authSchema
]