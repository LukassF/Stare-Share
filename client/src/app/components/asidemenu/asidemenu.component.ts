import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';
import { GetusersService } from 'src/app/services/getUsers/getusers.service';

@Component({
  selector: 'app-asidemenu',
  templateUrl: './asidemenu.component.html',
  styleUrls: ['./asidemenu.component.scss'],
})
export class AsidemenuComponent {
  @Output() showLogin = new EventEmitter();
  @Output() showSignup = new EventEmitter();
  searchOpen: boolean = false;
  searchPhrase: string | undefined;
  allUsers: any;
  foundUsers: any[] | undefined;
  constructor(
    private currentUserS: CurrentuserService,
    private toastr: ToastrService,
    private getUsersS: GetusersService
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

  startSearch() {
    this.searchOpen = !this.searchOpen;
    this.allUsers = [];
    this.searchPhrase = '';

    if (this.searchOpen)
      this.getUsersS
        .getUsers()
        .subscribe((data) => (this.allUsers = data as Array<any>));
  }

  search(e: any) {
    this.searchPhrase = e.target.value;
    console.log(this.searchPhrase);

    if (this.searchPhrase && this.allUsers)
      this.foundUsers = this.allUsers.filter((item: User) =>
        item.username
          .toUpperCase()
          .includes((this.searchPhrase as string).toUpperCase())
      );

    if (!this.searchPhrase) this.foundUsers = [];
  }
}
