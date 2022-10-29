const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {

    }

    type User {

    }

    type Query {
        book: [Book]
        user(_id: String): [User]
    }

    type Mutation {

    }
`;

module.exports = typeDefs;