const { userData } = require('../data/user.data');

const userResolver = {
    Query: {
        allUsers: () => {
            return userData
        }
    },
    Mutation: {
        addUser: (parent, {name, email, password, age}) => {
            const newUser = {
                id: userData.length + 1,
                name: name,
                email: email,
                password: password,
                age: age
            };

            userData.push(newUser);

            return newUser;
        },
        deleteUser: (parent, {id}) => {
            const userIndex = userData.findIndex(user => user.id === id);
            if(userIndex == -1){
                throw new Error("User not found");
            }

            const userDeleted = userData.splice(userIndex, 1)[0];

            return userDeleted;
        },
        updateUser: (parent, {name, email, password, age}) => {
            
        }
    }
}

module.exports = {
    userResolver
};
