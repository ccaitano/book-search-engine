const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, {_id}) => {
            const params = _id ? { _id }: {};
            return User.find(params);
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        saveBook: async (parent, args, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedBooks: book }},
                    { new: true }
                )
                return updatedUser;
            }
        },
        deleteBook: async(parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: {savedBooks: { bookId: bookId }}},
                    { new: true }
                )
                return updatedUser;
            }
        },
    },
}
module.exports = resolvers;