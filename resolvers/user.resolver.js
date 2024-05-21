const User = require('../models/user');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const userResolver = {
    Query: {
        allUsers: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error("Failed to fetch users");
            }
        },
        oneUser: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            } catch (error) {
                throw new Error("Failed to fetch user");
            }
        }
    },
    Mutation: {
        addUser: async (_, { name, email, password, age, gender }) => {
            try {
                const newUser = new User({
                    name,
                    email,
                    password,
                    age,
                    gender
                });
                await newUser.save();
                pubsub.publish('USER_CREATED', { userCreated: newUser });
                return newUser;
            } catch (error) {
                throw new Error("Failed to add user");
            }
        },
        deleteUser: async (_, { id }) => {
            try {
                const user = await User.findByIdAndDelete(id);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            } catch (error) {
                throw new Error("Failed to delete user");
            }
        },
        updateUser: async (_, { id, name, email, password, age, gender }) => {
            try {
                const user = await User.findById(id);
                if (!user) {
                    throw new Error("User not found");
                }
                user.name = name || user.name;
                user.email = email || user.email;
                user.password = password || user.password;
                user.age = age || user.age;
                user.gender = gender || user.gender;
                await user.save();
                return user;
            } catch (error) {
                throw new Error("Failed to update user");
            }
        }
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator('USER_CREATED')
        }
    }
};

module.exports = {
    userResolver
};
