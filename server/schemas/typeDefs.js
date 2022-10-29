const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: String!
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        book: [Book]
        user(_id: String): [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: savedBooks): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;