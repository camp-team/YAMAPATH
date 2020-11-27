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
    position: google.maps.LatLngLiteral,
    file?: string
  ): Promise<Post> {
    const postId = this.db.createId();
    let imageUrl = '';
    if (file !== undefined) {
      imageUrl = await this.setImageToStorage(postId, file);
    }
    const newValue: Post = {
      postId,
      position,
      createdAt: Date.now(),
      authorUid: this.authService.uid,
      likedCount: 0,
      imageUrl,
      ...post,
    };
    await this.db.doc<Post>(`posts/${postId}`).set(newValue);
    return newValue;
  }

  async setImageToStorage(postId: string, file: string): Promise<string> {
    const resule = await this.storage
      .ref(`posts/${postId}`)
      .putString(file, 'data_url');
    return resule.ref.getDownloadURL();
  }

  getPosts(): Observable<Post[]> {
    return this.db
      .collection<Post>('posts', (ref) => ref.where('public', '==', true))
      .valueChanges();
  }
}
