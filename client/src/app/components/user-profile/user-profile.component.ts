import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CreatepostService } from 'src/app/services/createPost/createpost.service';
import { GetpostsService } from 'src/app/services/getPosts/getposts.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userId: number | undefined;
  userPosts$: Observable<Post[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private getPostsS: GetpostsService,
    private createPostS: CreatepostService
  ) {}

  get liked() {
    return this.createPostS.likedPosts.value;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => {
      let id = value.get('id');
      this.userId = Number(id);
    });

    this.getUserPosts();
  }

  getUserPosts() {
    if (this.userId)
      this.userPosts$ = this.getPostsS.getPostsByUserId(this.userId);
  }
}
