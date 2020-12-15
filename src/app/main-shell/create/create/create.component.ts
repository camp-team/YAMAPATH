import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  isChecked = true;
  isPosition = true;
  isEdit: boolean;
  imageFile: string;
  oldImage: string;

  private subscriptions: Subscription = new Subscription();
  private currentPosition: google.maps.LatLngLiteral;
  private post: Post;

  form = this.fb.group({
    category: [
      '',
      [
        Validators.required,
        Validators.pattern(/danger|view|toilet|water|rest|other/),
      ],
    ],
    text: ['', [Validators.required, Validators.maxLength(500)]],
    isPublic: [true],
    isPosition: [true],
  });

  get textControl(): FormControl {
    return this.form.get('text') as FormControl;
  }

  get categoryControl(): FormControl {
    return this.form.get('category') as FormControl;
  }

  readonly categoryOptions: {
    label: string;
    value: string;
  }[] = [
    {
      label: '危険箇所',
      value: 'danger',
    },
    {
      label: '絶景ポイント',
      value: 'view',
    },
    {
      label: 'お手洗い',
      value: 'toilet',
    },
    {
      label: '水場',
      value: 'water',
    },
    {
      label: '休憩ポイント',
      value: 'rest',
    },
    {
      label: 'その他',
      value: 'other',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getLocation();
  }

  initForm() {
    this.route.queryParamMap.subscribe((map) => {
      const id = map.get('id');
      if (id) {
        this.isEdit = true;
        this.subscriptions.add(
          this.postService
            .getPostById(id)
            .pipe(take(1))
            .subscribe((post) => {
              console.log(post);
              this.form.setValue({
                category: post.category,
                text: post.text,
                isPublic: post.isPublic,
                isPosition: post.isPosition,
              });
              this.oldImage = post.imageUrl;
              this.post = post;
            })
        );
      }
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  onCroppedImage(image: string): void {
    this.imageFile = image;
  }

  submit(): void {
    if (!this.currentPosition) {
      this.currentPosition = null;
    }
    if (!this.form.value.isPosition) {
      this.currentPosition = null;
    }
    if (this.isEdit) {
      this.postService
        .updatePost(this.form.value, this.imageFile, this.post.postId)
        .then(() => {
          this.snackBar.open('更新しました');
          this.router.navigateByUrl('/');
        });
    } else {
      this.postService
        .createPost(this.form.value, this.currentPosition, this.imageFile)
        .then(() => {
          this.snackBar.open('投稿しました', null);
          this.router.navigateByUrl('/');
        });
    }
  }
}
