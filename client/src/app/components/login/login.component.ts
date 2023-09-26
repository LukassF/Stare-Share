import { CurrentuserService } from './../../services/currentUser/currentuser.service';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.4 }),
        animate(200, style({ opacity: 1, scale: 1 })),
      ]),
      transition(':leave', [animate(200, style({ opacity: 0, scale: 0 }))]),
    ]),
  ],
})
export class LoginComponent implements OnDestroy {
  @Output() showLogin = new EventEmitter();
  @Output() showSignup = new EventEmitter();

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
        if (item.session_logs === 'Login successfull!') {
          this.toastr.success('Login successfull!');
          this.showLogin.emit(false);
        } else if (
          item.session_logs &&
          item.session_logs !== 'Login successfull!'
        ) {
          if (item.session_logs.includes('username'))
            document.querySelector('#username')?.classList.add('ng-invalid');
          if (item.session_logs.includes('Password'))
            document.querySelector('#password')?.classList.add('ng-invalid');
          this.toastr.error(item.session_logs);
        }

        delete item.session_logs;

        this.currentUserS.changeCurrentUser(item);
        this.logInForm.reset();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  hideLogInBox(e?: Event) {
    if (e?.target !== e?.currentTarget) return;
    this.showLogin.emit(false);
  }

  goToSignUp() {
    this.showSignup.emit(true);
    this.showLogin.emit(false);
  }

  checkInputs(e: any): void {
    e.target.classList.remove('ng-invalid');
  }
}
