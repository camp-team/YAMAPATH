import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  $user: Observable<UserData> = this.authService.user$;
  imageFile: string;
  nameForm = new FormControl('', [
    Validators.maxLength(30),
  ]);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onCroppedImage(image: string) {
    this.imageFile = image;
  }

  chengeUserAvatar() {
    return this.userService
      .changeUserAvater(this.authService.uid, this.imageFile)
      .then(() => {
        this.snackBar.open('変更されました', null);
        this.imageFile = null;
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null);
      });
  }

  chengeUserName(): Promise<void> {
    const newUserName = this.nameForm.value;
    return this.userService
      .changeUserName(this.authService.uid, newUserName)
      .then(() => {
        this.snackBar.open('変更されました', null);
        this.nameForm.reset();
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null);
      });
  }

}
