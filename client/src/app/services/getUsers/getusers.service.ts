import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../signup/signup.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetusersService {
  constructor(private httpCLient: HttpClient) {}

  getUsers() {
    return this.httpCLient.get(BACKEND_URL + 'users/users.php');
  }

  getOneUser(user_id: number): Observable<any> {
    return this.httpCLient.post(BACKEND_URL + 'users/users.php', { user_id });
  }
}
