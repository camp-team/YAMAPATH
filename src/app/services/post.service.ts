import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  async createPost(
    post: Omit<Post, 'postId' | 'createdAt' | 'authorUid'>,
    position: google.maps.LatLngLiteral
  ): Promise<Post> {
    const postId = this.db.createId();
    const newValue: Post = {
      postId,
      position,
      createdAt: Date.now(),
      authorUid: this.authService.uid,
      likedCount: 0,
      ...post,
    };
    await this.db.doc<Post>(`posts/${postId}`).set(newValue);
    return newValue;
  }

  getPosts(): Observable<Post[]> {
    return this.db
      .collection<Post>('posts', (ref) => ref.where('public', '==', true))
      .valueChanges();
  }
}
