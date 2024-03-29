import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../signup/signup.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  // getData(): Observable<any> {
  //   return this.httpClient.get(BACKEND_URL + 'index.php');
  //   // .pipe(map((item) => item));
  // }
  logIn(username: string, password: string): Observable<any> {
    return this.httpClient.post(BACKEND_URL + 'login/login.php', {
      username: username,
      password: password,
    });
  }
}
