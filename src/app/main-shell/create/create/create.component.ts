import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  isChecked = true;
  isPosition = true;

  private currentPosition: google.maps.LatLngLiteral;

  form = this.fb.group({
    category: [
      '',
      [
        Validators.required,
        Validators.pattern(/danger|view|toilet|water|rest|other/),
      ],
    ],
    content: ['', [Validators.required, Validators.maxLength(500)]],
    public: [true],
    isPosition: [true],
  });

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  // 送信ボタンが押されたときに発動
  submit() {
    this.postService
      .createPost(this.form.value, this.currentPosition)
      .then(() => {
        this.snackBar.open('投稿しました、反映にはリロードが必要です', null);
        this.router.navigateByUrl('/');
      });
  }
}
