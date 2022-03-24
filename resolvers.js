const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const find = require("lodash/find");

const serviceAccount = require("./firebase-setup.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const usersCol = db.collection("users"); // Col for collection

const snapshotToArray = snapshot => {
  const array = [];
  snapshot.forEach(doc => {
    array.push({ id: doc.id, ...doc.data() });
  });
  return array;
};

const resolvers = {
  Query: {
    users: async () => {
      const snapshot = await usersCol.get();
      return snapshotToArray(snapshot);
    },

    user: async (_, { id }) => {
      const user = await usersCol.doc(id).get();
      return { id, ...user.data() };
    },

    userByName: async (_, args) => {
      const { name } = args;
      const snapshot = await usersCol.get();
      return find(snapshotToArray(snapshot), { name });
    }
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const res = await usersCol.add({ ...input });
      return { id: res.id, ...input };
    },

    updateUser: async (_, args) => {
      const { input } = args;
      const user = usersCol.doc(input.id);
      const res = await user.set({ ...input }, { merge: true });

      if (res) {
        return input;
      }
    },

    deleteUser: async (_, { id }) => {
      const res = await usersCol.doc(id).delete();
      if (res) {
        return null;
      }
    }
  }
};

module.exports = { resolvers };
