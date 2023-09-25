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
  pusherChannel: any;
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

    //initializing pusher for websocket connection
    var pusher = new pusherJs('5f08c4ab1ae08966f7f9', {
      cluster: 'eu',
    });

    this.pusherChannel = pusher.subscribe('comment-section');
    this.pusherChannel.bind('new-comment', (lastComment: any) => {
      this.postComments.push(lastComment);
      this.numOfComments.emit(this.postComments.length);
    });
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
      .subscribe((data) => console.log(data));

    this.commentForm.reset();
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
    if (this.pusherChannel) this.pusherChannel.unsubscribe('comment-section');
  }
}
