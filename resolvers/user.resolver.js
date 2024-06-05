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
        },
        verifyUser: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return { success: false, message: "User not found", user: null };
                }
                if (user.password !== password) {
                    return { success: false, message: "Incorrect password", user: null };
                }
                return { success: true, message: "Login successful", user };
            } catch (error) {
                throw new Error("Failed to verify user");
            }
        }
    },
    Mutation: {
        addUser: async (_, { name, lastName, email, phone, password, age, gender }) => {
            try {
                const newUser = new User({
                    name,
                    lastName,
                    email,
                    phone,
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
        updateUser: async (_, { id, name, lastName, email, phone, password, age, gender }) => {
            try {
                const user = await User.findById(id);
                if (!user) {
                    throw new Error("User not found");
                }
                if (name) user.name = name;
                if (lastName) user.lastName = lastName;
                if (email) user.email = email;
                if (phone) user.phone = phone;
                if (password) user.password = password;
                if (age) user.age = age;
                if (gender) user.gender = gender;
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
