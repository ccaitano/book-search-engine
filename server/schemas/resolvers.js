const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            const userData = await User.findOne({ _id: context.user._id });
            return userData;
        },
    },
    Mutation: {
        loginUser: async(parent, { email, password }, context) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Can't Find this User");
            };
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Wrong Password!');
            };
            const token = signToken(user);
            return { token, user };
        },
        addUser: async(parent, { username, email, password }, context) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            if (!user) {
                throw new AuthenticationError('Something is Wrong!');
            }
            return { token, user };
        },
        saveBook: async(parent, { book } , context) => {
            console.log( book );
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: { book }}},
                    { new: true },
                );
                console.log(updatedUser);
                return updatedUser;
            }
            throw new AuthenticationError('Unable to Save Book');
        },
        removeBook: async(parent, { bookId }, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId }}},
                    { new: true },
                );
                return updatedUser;
            }
            throw new AuthenticationError("Couldn't Find a User with this ID!");
        },
    },
};

module.exports = resolvers; 