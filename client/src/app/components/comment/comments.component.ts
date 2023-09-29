import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';
import pusherJs from 'pusher-js';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() post: Post | undefined;
  @Output() numOfComments = new EventEmitter();
  @Output() showComments = new EventEmitter();

  postComments: Array<Comment> = [];
  subscription: Subscription | undefined;
  sendCommentSubs: Subscription | undefined;

  commentForm: FormGroup = this.formB.group({
    comment: ['', Validators.required],
  });

  constructor(
    private formB: FormBuilder,
    private commentS: CommentService,
    private currentUserS: CurrentuserService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  sendComment() {
    if (
      !this.commentForm.value ||
      !this.currentUserS.currentUser.value ||
      !this.post
    )
      return;

    this.sendCommentSubs = this.commentS
      .sendComment(
        this.commentForm.value.comment,
        this.currentUserS.currentUser.value.id,
        this.post.id
      )
      .subscribe((data) => {
        console.log(data);
        this.postComments.push(data);
        this.sortComments();
        this.numOfComments.emit(this.postComments.length);
      });

    this.commentForm.reset();
  }

  getComments() {
    if (!this.post) return;
    this.subscription = this.commentS
      .getComments('', 0, this.post.id)
      .subscribe((data) => {
        this.postComments = data;
        this.sortComments();
      });
  }

  sortComments() {
    this.postComments.sort(
      (a, b) =>
        Number(new Date(b.comment_date)) - Number(new Date(a.comment_date))
    );
  }

  hideCommentsBox(e?: Event) {
    if (e?.target !== e?.currentTarget) return;
    this.showComments.emit(false);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.sendCommentSubs) this.sendCommentSubs.unsubscribe();
    // if (this.pusherChannel) this.pusherChannel.unsubscribe('comment-section');
  }
}
