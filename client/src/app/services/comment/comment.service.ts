import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../signup/signup.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  sendComment(
    comment: string,
    user_id: number,
    post_id: number
  ): Observable<any> {
    return this.httpClient.post(BACKEND_URL + 'comments/comment.php', {
      comment,
      post_id,
      user_id,
      send: true,
    });
  }

  getComments(
    comment: string,
    user_id: number,
    post_id: number
  ): Observable<any> {
    return this.httpClient.post(BACKEND_URL + 'comments/comment.php', {
      comment,
      post_id,
      user_id,
      send: false,
    });
  }
}
