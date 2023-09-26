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
  showLogInBox: boolean = false;
  showSignUpBox: boolean = false;

  constructor(
    private currentUserS: CurrentuserService,
    private createPostsS: CreatepostService
  ) {
    console.log(this.createPostsS.likedPosts.value);
    this.currentUserS.getUserInfo();
    console.log(this.createPostsS.likedPosts.value);
  }

  ngOnInit(): void {}

  openLogIn(e: boolean): void {
    this.showLogInBox = e;
  }

  openSignUp(e: boolean): void {
    this.showSignUpBox = e;
  }
}
