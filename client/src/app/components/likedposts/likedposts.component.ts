import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatepostService } from 'src/app/services/createPost/createpost.service';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';
import { GetpostsService } from 'src/app/services/getPosts/getposts.service';

@Component({
  selector: 'app-likedposts',
  templateUrl: './likedposts.component.html',
  styleUrls: ['./likedposts.component.scss'],
})
export class LikedpostsComponent implements OnChanges {
  @Input() liked: any;
  likedPosts$: Observable<Post[]> | undefined;
  isActive: boolean = false;

  constructor(
    private currentUserS: CurrentuserService,
    private getPostsS: GetpostsService
  ) {}

  openLiked() {
    this.isActive = !this.isActive;
    if (!this.isActive) this.likedPosts$ = undefined;
    if (this.isActive) this.fetchLikedPosts();
  }

  fetchLikedPosts() {
    if (!this.currentUserS.currentUser.value) return;

    const user_id = this.currentUserS.currentUser.value.id;
    this.likedPosts$ = this.getPostsS.getLikedPosts(user_id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isActive) this.fetchLikedPosts();
  }
}
