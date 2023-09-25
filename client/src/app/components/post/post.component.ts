import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CreatepostService } from 'src/app/services/createPost/createpost.service';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnChanges {
  @Input() post: Post | undefined;
  showComments: boolean = false;
  commentQuantity: number | undefined;

  constructor(
    private createPostS: CreatepostService,
    public currentUserS: CurrentuserService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.commentQuantity = this.post?.comments;
  }

  get isMine() {
    if (this.currentUserS.currentUser.value && this.post)
      return this.currentUserS.currentUser.value.id === this.post.user_id;
    else return true;
  }

  get isLiked() {
    if (this.createPostS.likedPosts.value && this.post)
      return this.createPostS.likedPosts.value.includes(`${this.post.id}`);
    else return false;
  }

  likePost() {
    if (!this.post || !this.currentUserS.currentUser.value) return;

    if (!this.isLiked) this.post.likes++;
    else this.post.likes--;

    this.createPostS.likeOrDislikePost(
      this.post.id,
      this.currentUserS.currentUser.value.id
    );
  }

  updateCommentQuantity(e: any) {
    this.commentQuantity = e;
  }

  openComments() {
    this.showComments = !this.showComments;
  }
}
