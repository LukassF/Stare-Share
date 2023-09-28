import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreatepostService } from 'src/app/services/createPost/createpost.service';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';
import { GetpostsService } from 'src/app/services/getPosts/getposts.service';

@Component({
  selector: 'app-likedposts',
  templateUrl: './likedposts.component.html',
  styleUrls: ['./likedposts.component.scss'],
})
export class LikedpostsComponent implements OnChanges, OnDestroy {
  @Input() liked: any;
  @Input() colsAsIterable: any;
  likedPosts: Post[] | undefined;
  isActive: boolean = false;
  subscription: Subscription | undefined;
  loading: boolean = false;

  constructor(
    private currentUserS: CurrentuserService,
    private getPostsS: GetpostsService
  ) {
    this.openLiked();
  }

  openLiked() {
    this.isActive = !this.isActive;
    if (!this.isActive) this.likedPosts = undefined;
    if (this.isActive) this.fetchLikedPosts();
  }

  fetchLikedPosts() {
    if (!this.currentUserS.currentUser.value) return;

    this.loading = true;
    const user_id = this.currentUserS.currentUser.value.id;
    this.subscription = this.getPostsS
      .getLikedPosts(user_id)
      .subscribe((data) => {
        this.likedPosts = data;
        this.loading = false;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isActive) this.fetchLikedPosts();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
