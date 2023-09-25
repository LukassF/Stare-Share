import { Component, OnInit } from '@angular/core';
import { CurrentuserService } from './services/currentUser/currentuser.service';
import { CreatepostService } from './services/createPost/createpost.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private currentUserS: CurrentuserService,
    private createPostsS: CreatepostService
  ) {
    console.log(this.createPostsS.likedPosts.value);
    this.currentUserS.getUserInfo();
    console.log(this.createPostsS.likedPosts.value);
  }

  ngOnInit(): void {}
}
