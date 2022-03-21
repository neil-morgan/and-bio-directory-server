const find = require("lodash/find");
const remove = require("lodash/remove");

const { users } = require("./data");

const resolvers = {
  Query: {
    users: () => {
      return users;
    },

    user: (_, args) => {
      const { id } = args;
      return find(users, { id: Number(id) });
    },

    userByName: (_, args) => {
      const { name } = args;
      return find(users, { name });
    },
  },

  Mutation: {
    createUser: (_, { input }) => {
      const user = input;

      if (users.length === 0) {
        user.id = 1;
        users.push(user);
        return user;
      }

      user.id = users[users.length - 1].id + 1;
      users.push(user);
      return user;
    },

    updateUser: (_, args) => {
      const { id, newUser } = args.input;
      let updatedUser;
      users.forEach((user) => {
        if (user.id === Number(id)) {
          user.name = newUser.name;
          user.jobTitle = newUser.jobTitle;
          updatedUser = user;
        }
      });
      return updatedUser;
    },

    deleteUser: (_, { id }) => {
      remove(users, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
