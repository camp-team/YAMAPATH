import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fns: AngularFireFunctions,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.deleteUser(this.authService.uid).finally(() => {
            this.snackBar.open('アカウントを削除しました');
            this.router.navigateByUrl('/welcome');
          });
        }
      });
  }

  deleteUser(uid: string) {
    const callable = this.fns.httpsCallable('deleteUser');
    return callable(uid).toPromise();
  }
}
