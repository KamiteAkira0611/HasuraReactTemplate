import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
global.fetch = require("node-fetch");

admin.initializeApp();

const client = new ApolloClient({
  uri: `${process.env.HASURA_ENDPOINT}`,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`,
  },
});

// サインアップ時
export const setCustomClaims = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  try {
    // ユーザー作成時にroleを付与
    await admin.auth().setCustomUserClaims(user.uid, customClaims);

    // Hasura側のUserを作成
    await client.mutate({
      variables: { uid: user.uid, name: user.displayName || "unknown" },
      mutation: gql`
        mutation InsertUsers($uid: String, $name: String) {
          insert_users(objects: { uid: $uid, name: $name }) {
            returning {
              id
              uid
              name
              created_at
            }
          }
        }
      `,
    });

    // メタデータをFirebaseStoreに保存
    await admin.firestore().collection("user_meta").doc(user.uid).create({
      refreshTime: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
});

// ユーザー削除時
export const deleteCustomClaims = functions.auth
  .user()
  .onDelete(async (user) => {
    // Hasura側のUserを削除
    try {
      await client.mutate({
        variables: { uid: user.uid },
        mutation: gql`
          mutation DeleteUsers($uid: String) {
            delete_users(where: { uid: { _eq: $uid } }) {
              returning {
                id
                uid
                name
                created_at
              }
            }
          }
        `,
      });

      // FirebaseStoreのメタデータを削除
      await admin.firestore().collection("user_meta").doc(user.uid).delete();
    } catch (error) {
      console.error(error);
    }
  });
