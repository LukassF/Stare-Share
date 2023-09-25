import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  postComments: Array<Comment> | undefined;
  subscription: Subscription | undefined;
  sendCommentSubs: Subscription | undefined;
  @Input() post: Post | undefined;
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
    console.log(this.commentForm);
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
      .subscribe((data) => console.log(data));
  }

  getComments() {
    if (!this.post) return;
    this.subscription = this.commentS
      .getComments('', 0, this.post.id)
      .subscribe((data) => {
        this.postComments = data;
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.sendCommentSubs) this.sendCommentSubs.unsubscribe();
  }
}
