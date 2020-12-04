import { Component, Input, OnInit } from '@angular/core';
import { Post, PostWithUser } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: PostWithUser;

  constructor() {}

  ngOnInit(): void {}
}
