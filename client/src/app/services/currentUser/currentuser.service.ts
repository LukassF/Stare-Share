import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentuserService {
  currentUser = new BehaviorSubject<User | null>(null);

  constructor() {}

  changeCurrentUser(user: User) {
    this.currentUser.next(user);
  }
}
