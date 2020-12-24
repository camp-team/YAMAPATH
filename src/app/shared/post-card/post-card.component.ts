import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PostWithUser } from 'src/app/interfaces/post';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: PostWithUser;
  @Input() isDetail?: boolean;
  isLiked: boolean;
  isProcessing: boolean;
  likedCount: number;
  user$: Observable<UserData> = this.authService.user$;

  constructor(
    private authService: AuthService,
    private likeService: LikeService,
    private router: Router,
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        this.likeService
          .isLikedPost(this.post.postId, this.authService.uid)
          .pipe(take(1))
          .subscribe((isLiked) => {
            this.isLiked = isLiked;
          });
      });
    this.likedCount = this.post.likedCount;
  }

  editPost(postId: string) {
    this.router.navigate(['/create'], {
      queryParams: {
        id: postId,
      },
    });
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).then(() => {
      this.snackBar.open('削除しました、反映にはリロードが必要です');
    });
  }

  likePost(): void {
    this.isProcessing = true;
    this.isLiked = true;
    this.likedCount++;
    this.likeService
      .likePost(this.post.postId, this.authService.uid)
      .finally(() => (this.isProcessing = false));
  }

  unLikePost(): void {
    this.isProcessing = true;
    this.isLiked = false;
    this.likedCount--;
    this.likeService
      .unLikePost(this.post.postId, this.authService.uid)
      .finally(() => (this.isProcessing = false));
  }
}
