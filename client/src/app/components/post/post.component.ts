import { Component, Input } from '@angular/core';
import { CreatepostService } from 'src/app/services/createPost/createpost.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post | undefined;

  constructor(private createPostS: CreatepostService) {}

  likePost() {
    if (!this.post) return;
    this.createPostS
      .likePost(this.post.id)
      .subscribe((item) => console.log(item));
  }
}
