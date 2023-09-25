import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { SignupService } from './services/signup/signup.service';
import { PostCreatorComponent } from './components/post-creator/post-creator.component';
import { CreatepostService } from './services/createPost/createpost.service';
import { CurrentuserService } from './services/currentUser/currentuser.service';
import { FeedComponent } from './components/feed/feed.component';
import { GetpostsService } from './services/getPosts/getposts.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PostComponent } from './components/post/post.component';
import { LikedpostsComponent } from './components/likedposts/likedposts.component';

import { CommentService } from './services/comment/comment.service';
import { CommentsComponent } from './components/comment/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PostCreatorComponent,
    FeedComponent,
    UserProfileComponent,
    PostComponent,
    LikedpostsComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [
    LoginService,
    SignupService,
    CreatepostService,
    CurrentuserService,
    GetpostsService,
    CommentService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
