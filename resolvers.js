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
    createUser: (_, args) => {
      const user = args.input;
      const lastId = users[users.length - 1].id;
      user.id = lastId + 1;
      users.push(user);
      return user;
    },

    deleteUser: (_, args) => {
      const { id } = args;
      remove(users, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
