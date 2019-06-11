const { rule } = require('graphql-shield')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

module.exports = {
    isAuthenticated: rule()(async (_, args, { request }, info) => {
        const bearerToken = request.headers.authorization
        const token = bearerToken && bearerToken.split(' ')[1] ? bearerToken.split(' ')[1] : undefined

        if (typeof token !== 'undefined') {
            await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log('error')
                    throw new AuthenticationError('Token Expired !')
                }
            })

            return true
        } else {
            throw new AuthenticationError('Token Invalid')
        }
    })
}