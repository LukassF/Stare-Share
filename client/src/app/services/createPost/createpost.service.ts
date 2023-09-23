import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BACKEND_URL = 'http://localhost/angularXphp/api/';

@Injectable({
  providedIn: 'root',
})
export class CreatepostService {
  constructor(private httpClient: HttpClient) {}

  uploadImage(image: string, desc: string, user_id: number): Observable<any> {
    // console.log({ image });
    return this.httpClient.post(BACKEND_URL + 'post/image.php', {
      image,
      desc,
      user_id,
    });
  }
}
