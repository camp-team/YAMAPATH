import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Post, PostWithUser } from '../interfaces/post';
import { UserData } from '../interfaces/user-data';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private userService: UserService
  ) {}

  async createPost(
    post: Omit<Post, 'postId' | 'createdAt' | 'authorUid'>,
    position?: google.maps.LatLngLiteral,
    file?: string
  ): Promise<Post> {
    const postId = this.db.createId();
    let imageUrl = '';
    if (file !== undefined) {
      imageUrl = await this.setImageToStorage(postId, file);
    }
    if (!position) {
      const position = null;
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
    const result = await this.storage
      .ref(`posts/${postId}`)
      .putString(file, 'data_url');
    return result.ref.getDownloadURL();
  }

  getPosts(): Observable<Post[]> {
    return this.db
      .collection<Post>('posts', (ref) => ref.where('isPublic', '==', true))
      .valueChanges();
  }

  getPostById(postId: string): Observable<Post> {
    return this.db.doc<Post>(`posts/${postId}`).valueChanges();
  }

  getPostWithUserById(id: string): Observable<PostWithUser> {
    return this.db
      .doc<Post>(`posts/${id}`)
      .valueChanges()
      .pipe(
        switchMap((post: Post) => {
          const user$ = this.userService.getUserByUid(post.authorUid);
          return combineLatest([of(post), user$]);
        }),
        map(([post, user]) => {
          return {
            ...post,
            user,
          };
        })
      );
  }

  deletePost(id: string): Promise<void> {
    return this.db.doc<Post>(`posts/${id}`).delete();
  }

  async updatePost(
    post: Omit<Post, 'postId' | 'createdAt' | 'authorUid'>,
    file: string,
    postId: string
  ) {
    let imageUrl = '';
    if (file !== undefined) {
      imageUrl = await this.setImageToStorage(postId, file);
    }
    const newValue: Omit<Post, 'postId' | 'createdAt' | 'authorUid'> = {
      imageUrl,
      updateAt: Date.now(),
      ...post,
    };
    return this.db.doc<Post>(`posts/${postId}`).update(newValue);
  }
}
