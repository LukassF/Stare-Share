import { CurrentuserService } from './../../services/currentUser/currentuser.service';
import { Component, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  logInForm: FormGroup;
  subscription: Subscription | undefined;
  data: { username: string; session_logs: string } = {
    username: '',
    session_logs: '',
  };
  username: string = '';
  password: string = '';

  constructor(
    private loginS: LoginService,
    private formBuilder: FormBuilder,
    private currentUserS: CurrentuserService,
    private toastr: ToastrService
  ) {
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logIn(): void {
    this.username = this.logInForm.value.username;
    this.password = this.logInForm.value.password;
    this.subscription = this.loginS
      .logIn(this.username, this.password)
      .subscribe((item) => {
        if (item.session_logs === 'Login successfull!')
          this.toastr.success('Login successfull!');
        else if (
          item.session_logs &&
          item.session_logs !== 'Login successfull!'
        )
          this.toastr.error(item.session_logs);

        delete item.session_logs;
        console.log(item);
        this.currentUserS.changeCurrentUser(item);
        this.logInForm.reset();
      });
  }

  logOut() {
    this.currentUserS.logOut();
    this.toastr.success('Logged out!');
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
