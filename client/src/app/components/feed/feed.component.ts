import { Observable } from 'rxjs';
import { GetusersService } from 'src/app/services/getUsers/getusers.service';
import { GetpostsService } from './../../services/getPosts/getposts.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  posts$: Observable<Post[]> | undefined;
  constructor(
    private getPostsS: GetpostsService,
    private getUsersS: GetusersService
  ) {
    this.posts$ = this.getPostsS.getAllPosts();
    this.getUsersS.getUsers().subscribe((data) => console.log(data));
  }
}
