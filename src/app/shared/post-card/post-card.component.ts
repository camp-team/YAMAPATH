import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PostWithUser } from 'src/app/interfaces/post';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: PostWithUser;
  isLiked: boolean;
  likedCount: number;
  user$: Observable<UserData> = this.authService.user$;

  constructor(
    private authService: AuthService,
    private likeService: LikeService
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

  likePost(): void {
    this.isLiked = true;
    this.likedCount++;
    this.likeService.likePost(this.post.postId, this.post.user.uid);
  }

  unLikePost(): void {
    this.isLiked = false;
    this.likedCount--;
    this.likeService.unLikePost(this.post.postId, this.post.user.uid);
  }
}
