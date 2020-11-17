import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;
  isProcessing: boolean;

  user$: Observable<UserData> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        this.uid = afUser.uid;
        return this.db.doc<UserData>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }),
    shareReplay(1)
  );

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth.signInWithPopup(provider);
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null);
      this.router.navigateByUrl('/welcome');
    });
  }
}
