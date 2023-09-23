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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PostCreatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginService,
    SignupService,
    CreatepostService,
    CurrentuserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
