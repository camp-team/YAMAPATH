import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import {
  deleteCollectionByReference,
  deleteCollectionByPath,
} from './util/delete';
import { shouldEventRun, markEventTried } from './util/firebase-util';
const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user, context) => {
    const eventId = context.eventId;
    const should = await shouldEventRun(eventId);
    if (should) {
      await db.doc(`users/${user.uid}`).set({
        uid: user.uid,
        name: user.displayName,
        avatarURL: user.photoURL,
        email: user.email,
      });
      return markEventTried(eventId);
    } else {
      return true;
    }
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .https.onCall((data, _) => {
    return admin.auth().deleteUser(data);
  });

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, _) => {
    const uid = user.uid;
    const posts = db.collection(`posts`).where('authorUid', '==', uid);
    const deleteUserData = db.doc(`users/${uid}`).delete();
    const deleteAllPosts = deleteCollectionByReference(posts);
    const deleteAllLikedPosts = deleteCollectionByPath(
      `users/${uid}/likePosts`
    );
    return Promise.all([deleteAllPosts, deleteAllLikedPosts, deleteUserData]);
  });
