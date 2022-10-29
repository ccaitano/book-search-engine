const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: [String]!
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
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    input inputSavedBooks {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        # book: [Book]
        user(_id: String): [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: inputSavedBooks): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;