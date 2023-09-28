import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../signup/signup.service';

@Injectable({
  providedIn: 'root',
})
export class GetpostsService {
  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    //@ts-ignore
    return this.httpClient.get(BACKEND_URL + 'post/getposts.php');
  }

  getPostsSegmented(start: number, offset: number): Observable<any> {
    return this.httpClient.post(BACKEND_URL + 'post/getposts.php', {
      start,
      offset,
      type: 'segmented',
    });
  }

  getPostsByUserId(user_id: number): Observable<Post[]> {
    //@ts-ignore
    return this.httpClient.post(BACKEND_URL + 'post/getposts.php', {
      user_id,
      type: 'userId',
    });
  }

  getLikedPosts(user_id: number): Observable<Post[]> {
    //@ts-ignore
    return this.httpClient.post(BACKEND_URL + 'post/getposts.php', {
      user_id,
      liked: true,
      type: 'liked',
    });
  }
}
