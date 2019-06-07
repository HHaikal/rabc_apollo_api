const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
    type Query {
        hello(name: String): String!
    }
`

const resolvers = {
    Query: {
        hello: (_, {name}, context, info) => {
            return 'Hello ' + name
        }
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(() => console.log('Server is running on localhost:4000'))