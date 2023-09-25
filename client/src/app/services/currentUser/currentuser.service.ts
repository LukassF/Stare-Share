import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BACKEND_URL } from '../signup/signup.service';
import { CreatepostService } from '../createPost/createpost.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentuserService implements OnDestroy {
  currentUser = new BehaviorSubject<User | null>(
    JSON.parse(window.localStorage.getItem('currentUser') || 'null')
  );
  subscription: Subscription | undefined;

  constructor(
    private httpClient: HttpClient,
    private createPostS: CreatepostService
  ) {}

  changeCurrentUser(user: User) {
    user.liked = (user.liked as string).split(',');
    window.localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
    this.createPostS.setLikedPosts();
  }

  getUserInfo() {
    if (!this.currentUser.value) return;
    this.subscription = this.httpClient
      .post(BACKEND_URL + 'users/users.php', {
        user_id: this.currentUser.value.id,
      })
      //@ts-ignore
      .subscribe((data: User[]) => {
        data[0].liked = (data[0].liked as string).split(',');
        window.localStorage.setItem('currentUser', JSON.stringify(data[0]));
        this.currentUser.next(data[0]);
        this.createPostS.setLikedPosts();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
