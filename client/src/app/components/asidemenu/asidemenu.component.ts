import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';

@Component({
  selector: 'app-asidemenu',
  templateUrl: './asidemenu.component.html',
  styleUrls: ['./asidemenu.component.scss'],
})
export class AsidemenuComponent {
  @Output() showLogin = new EventEmitter();
  @Output() showSignup = new EventEmitter();
  constructor(
    private currentUserS: CurrentuserService,
    private toastr: ToastrService
  ) {}

  get currentUser() {
    return this.currentUserS.currentUser.value;
  }

  logOut() {
    this.currentUserS.logOut();
    this.toastr.success('Logged out!');
  }

  openLogIn() {
    this.showLogin.emit(true);
  }

  openSignUp() {
    this.showSignup.emit(true);
  }
}
