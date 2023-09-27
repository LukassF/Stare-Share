import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Route, Router } from '@angular/router';
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
  showMore: boolean = false;
  commentQuantity: number | undefined;

  constructor(
    private createPostS: CreatepostService,
    public currentUserS: CurrentuserService,
    private router: Router
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

  get uploadDate() {
    if (this.post)
      return (
        new Date(this.post.upload_date).toDateString().slice(4) +
        ', ' +
        new Date(this.post.upload_date).getHours() +
        ':' +
        new Date(this.post.upload_date).getMinutes().toString().padStart(2, '0')
      );
    else return undefined;
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
    console.log(e);
    this.commentQuantity = e;
  }

  openComments(value: boolean) {
    this.showComments = value;
  }

  expandDescription(): void {
    this.showMore = !this.showMore;
  }

  navigateTo() {
    this.router.navigate([`users/${this.post?.user_id}`]);
  }
}
