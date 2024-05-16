const { userData } = require('../data/user.data');

const userResolver = {
    Query: {
        allUsers: () => {
            return userData
        },
        oneUser: (_, {id}) => {
            const user = userData.find(user => user.id === id);
            return user;
        }
    },
    Mutation: {
        addUser: (parent, {name, email, password, age, gender}) => {
            const newUser = {
                id: userData.length + 1,
                name: name,
                email: email,
                password: password,
                age: age,
                gender: gender
            };

            userData.push(newUser);

            return newUser;
        },
        deleteUser: (parent, {id}) => {
            const userIndex = userData.findIndex(user => user.id === id);
            if(userIndex == -1){
                throw new Error("User not found");
            }

            return userData.splice(userIndex, 1)[0];
        },
        updateUser: (parent, {name, email, password, age, gender}) => {
            const user = userData.find(user => user.id === id);
            
            if(user === undefined){
                throw new Error("User not found");
            }

            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;
            user.age = age || user.age;
            user.gender = gender || user.email;
            
            return user;
        }
    }
}

module.exports = {
    userResolver
};
