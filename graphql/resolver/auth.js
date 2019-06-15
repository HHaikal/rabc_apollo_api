const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Op = require('sequelize').Op
const bcrypt = require('bcryptjs')

module.exports = {
    Query: {
        hello: async (_, {firstName, lastName}) => {
            return firstName + ' ' + lastName
        }
    },
    Mutation: {
        /**
         * Register
         *
         * @return Object
         */
        signup: async (_, {name, email, password, role}, {models}) => {

            try {

                // check if email exist
                await models.users.findOne({
                    where: { email: email }
                }).then(user => {
                    // throw error if existt
                    if (user !== null) {
                        throw new AuthenticationError('Email already used!')
                    }
                }).catch(async err => {
                    throw new AuthenticationError(err)
                })

                // check if role exists
                await models.roles.findAll({
                    where: {
                        slug: {
                            [Op.or]: role
                        }
                    }
                }).then(async data => {
                    if(data.length !== role.length){
                        // TODO: what role
                        throw new AuthenticationError('One of role not found')
                    }
                })

                // set variable for jwt payload
                let payload

                // create new user
                await models.users.create({
                    name, email, password
                }).then(async user => {

                    // TODO: Instance
                    // foreach array role
                    role.map(async (slug, key) => {
                        await models.roles.findOne({
                            where: {
                                slug: slug
                            }
                        })
                        .then(async data => {
                            // attach / assign role to user
                            user.addRoles(data)
                        })
                    })

                    // set jwt payload
                    payload = {
                        id: user.id,
                        email: user.email
                    }

                }).catch(err => {
                    throw new AuthenticationError(err)
                })

                 // generate token & return response
                return {
                    token: await jwt.sign(payload, process.env.JWT_SECRET)
                }

            } catch (error) {
                throw new AuthenticationError(error)
            }

        },
        /**
         * Login
         *
         * @return Object
         */
        signin: async (_, {email, password}, {models}) => {
            try {
                let payload

                // check if email exists
                await models.users.findOne({
                    where: {
                        email: email
                    }
                }).then(async user => {
                    // throw error if user not found
                    if(!user){
                        throw new AuthenticationError('No user found with this login credentials')
                    }

                    // verify password
                    const isValid = await bcrypt.compare(password, user.password);

                    if (!isValid) { // throw error if password not valid
                        throw new AuthenticationError('No user found with this login credentials');
                    }

                    payload = {
                        id: user.id,
                        email: user.email
                    }
                }).catch(async err => {
                    // throw error something not fine
                    throw new AuthenticationError(err)
                })

                // generate token & return response
                return {
                    token: await jwt.sign(payload, process.env.JWT_SECRET)
                }
            } catch (error) {
                throw new AuthenticationError(error)
            }
        }
    }
}
