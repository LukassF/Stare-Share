import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { SignupService } from 'src/app/services/signup/signup.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
export class SignupComponent implements OnDestroy {
  @Output() showSignup = new EventEmitter();
  @Output() showLogIn = new EventEmitter();

  subscription: Subscription | undefined;
  signInForm: FormGroup;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private signupS: SignupService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp(): void {
    this.username = this.signInForm.value.username;
    this.email = this.signInForm.value.email;
    this.password = this.signInForm.value.password;

    this.subscription = this.signupS
      .signUp(this.username, this.email, this.password)
      .subscribe((res: any) => {
        if (res && res !== 'Signup successfull!') {
          this.toastr.error(res as string);
          if (res.includes('Username')) {
            document.querySelector('#username')?.classList.add('ng-invalid');
          }
          if (res.includes('Email')) {
            document.querySelector('#email')?.classList.add('ng-invalid');
          }
          if (res.includes('password')) {
            document.querySelector('#password')?.classList.add('ng-invalid');
          }
        } else {
          this.toastr.success('Signup successfull!');
          this.showSignup.emit(false);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  hideSignUpBox(e?: Event): void {
    if (e?.target !== e?.currentTarget) return;
    this.showSignup.emit(false);
  }

  goToLogin() {
    this.showSignup.emit(false);
    this.showLogIn.emit(true);
  }

  checkInputs(e: any): void {
    e.target.classList.remove('ng-invalid');
  }
}
