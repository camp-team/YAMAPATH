import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  changeUserName(uid: string, name: string): Promise<void> {
    return this.db.doc(`users/${uid}`).update({
      name,
    });
  }

  async changeUserAvatar(uid: string, url: string): Promise<void> {
    const result = await this.storage
      .ref(`users/${uid}`)
      .putString(url, 'data_url');
    const avatarURL = await result.ref.getDownloadURL();
    return this.db.doc(`users/${uid}`).update({
      avatarURL,
    });
  }

  getUserByUid(uid: string): Observable<UserData> {
    return this.db.doc<UserData>(`users/${uid}`).valueChanges();
  }
}
