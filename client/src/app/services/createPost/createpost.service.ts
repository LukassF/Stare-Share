import { HttpClient } from '@angular/common/http';
import { DoCheck, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BACKEND_URL } from '../signup/signup.service';
import { CurrentuserService } from '../currentUser/currentuser.service';

@Injectable({
  providedIn: 'root',
})
export class CreatepostService implements OnDestroy {
  likedPosts = new BehaviorSubject<string[] | null>(
    JSON.parse(window.localStorage.getItem('currentUser') || 'null').liked
  );
  subscription: Subscription | undefined;

  constructor(private httpClient: HttpClient) {}

  setLikedPosts() {
    this.likedPosts.next(
      JSON.parse(window.localStorage.getItem('currentUser') || 'null').liked
    );
  }

  uploadImage(image: string, desc: string, user_id: number): Observable<any> {
    return this.httpClient.post(BACKEND_URL + 'post/create.php', {
      image,
      desc,
      user_id,
    });
  }

  likeOrDislikePost(post_id: number, user_id: number) {
    //liking
    if (
      !this.likedPosts.value ||
      !this.likedPosts.value.includes(`${post_id}`)
    ) {
      this.subscription = this.httpClient
        .post(BACKEND_URL + 'post/create.php', {
          post_id,
          user_id,
          like: true,
        })
        .subscribe((data) => {
          if (data) this.likedPosts.next(data as string[]);
        });

      //disliking
    } else if (this.likedPosts.value.includes(`${post_id}`)) {
      this.subscription = this.httpClient
        .post(BACKEND_URL + 'post/create.php', {
          post_id,
          user_id,
          like: false,
        })
        .subscribe((data) => {
          if (data) this.likedPosts.next(data as string[]);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
