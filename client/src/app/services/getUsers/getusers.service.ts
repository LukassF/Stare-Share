import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../signup/signup.service';

@Injectable({
  providedIn: 'root',
})
export class GetusersService {
  constructor(private httpCLient: HttpClient) {}

  getUsers() {
    return this.httpCLient.get(BACKEND_URL + 'users/users.php');
  }
}
