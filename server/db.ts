// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://apx-dwf-m6-elg-default-rtdb.firebaseio.com",
// });

import * as admin from "firebase-admin";

import * as serviceAccount from "../key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://apx-dwf-m6-elg-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
