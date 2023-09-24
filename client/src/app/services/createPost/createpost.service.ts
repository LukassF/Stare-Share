import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../signup/signup.service';

@Injectable({
  providedIn: 'root',
})
export class CreatepostService {
  constructor(private httpClient: HttpClient) {}

  uploadImage(image: string, desc: string, user_id: number): Observable<any> {
    // console.log({ image });
    return this.httpClient.post(BACKEND_URL + 'post/create.php', {
      image,
      desc,
      user_id,
    });
  }

  likePost(post_id: number) {
    return this.httpClient.post(BACKEND_URL + 'post/create.php', {
      post_id,
    });
  }
}
