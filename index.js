const { GraphQLServer } = require('graphql-yoga')
const models = require('./models')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolver')
const permission = require('./graphql/permission')
require('dotenv').config()


const server = new GraphQLServer({
    typeDefs, 
    resolvers, 
    middlewares: [permission],
    context: req => {
        return {
            models: models,
            ...req
        }
    }
})

server.start(() => console.log('Server is running on localhost:4000'))