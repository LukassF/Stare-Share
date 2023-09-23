import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { SignupService } from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signInForm: FormGroup;
  data: any = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private signupS: SignupService,
    private formBuilder: FormBuilder
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

    this.data = this.signupS.signUp(this.username, this.email, this.password);

    // .pipe(map((item: any) => item.username));
  }
}
