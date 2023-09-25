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

  getPostsByUserId(user_id: number): Observable<Post[]> {
    //@ts-ignore
    return this.httpClient.post(BACKEND_URL + 'post/getposts.php', {
      user_id,
      liked: false,
    });
  }

  getLikedPosts(user_id: number): Observable<Post[]> {
    //@ts-ignore
    return this.httpClient.post(BACKEND_URL + 'post/getposts.php', {
      user_id,
      liked: true,
    });
  }
}
