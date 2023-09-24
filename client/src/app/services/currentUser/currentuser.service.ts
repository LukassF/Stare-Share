import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentuserService {
  currentUser = new BehaviorSubject<User | null>(
    JSON.parse(window.localStorage.getItem('currentUser') || 'null')
  );

  constructor() {}

  changeCurrentUser(user: User) {
    window.localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
  }
}
