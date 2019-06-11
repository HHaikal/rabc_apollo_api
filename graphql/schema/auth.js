module.exports = `
    extend type Query{
        hello(firstName: String, lastName: String): String
    }

    extend type Mutation {
        signup(name: String, email: String, password: String, role: [String]): Token
        signin(email: String, password: String): Token
    }

    type InputSignup {
        name: String
        email: String
    }

    type Token {
        token: String
    }
`