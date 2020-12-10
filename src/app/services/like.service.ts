import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private db: AngularFirestore) {}

  likePost(postId: string, uid: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`users/${uid}/likePosts/${postId}`).set({ postId }),
      this.db.doc(`posts/${postId}/likedUserIds/${uid}`).set({ uid }),
    ]);
  }

  unLikePost(postId: string, uid: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`users/${uid}/likePosts/${postId}`).delete(),
      this.db.doc(`posts/${postId}/likedUserIds/${uid}`).delete(),
    ]);
  }

  isLikedPost(postId: string, uid: string): Observable<boolean> {
    return this.db
      .doc(`posts/${postId}/likedUserIds/${uid}`)
      .valueChanges()
      .pipe(map((post) => !!post));
  }
}
