import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const BACKEND_URL = 'https://janflo.ct8.pl/test/api/';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private httpClient: HttpClient) {}

  signUp(username: string, email: string, password: string) {
    return this.httpClient.post(BACKEND_URL + 'signup/signup.php', {
      username: username,
      email: email,
      password: password,
    });
  }
}
