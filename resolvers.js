/* eslint-disable no-console */
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const find = require("lodash/find");
const remove = require("lodash/remove");

const { users } = require("./data");
const serviceAccount = require("./firebase-setup.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const resolvers = {
  Query: {
    users: async () => {
      const users = [];
      const snapshot = await db.collection("users").get();
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    },

    user: (_, args) => {
      const { id } = args;
      return find(users, { id: Number(id) });
    },

    userByName: (_, args) => {
      const { name } = args;
      return find(users, { name });
    }
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
      const { input } = args;
      const keys = new Set(["name", "role"]);

      let updatedUser;
      users.forEach(user => {
        if (user.id === Number(input.id)) {
          for (const key in user) {
            if (keys.has(key)) {
              user[key] = input[key];
            }
          }
          updatedUser = user;
        }
      });
      return updatedUser;
    },

    deleteUser: (_, { id }) => {
      remove(users, user => user.id === Number(id));
      return null;
    }
  }
};

module.exports = { resolvers };
