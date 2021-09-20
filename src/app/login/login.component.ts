import { Component, OnInit} from '@angular/core';
import { 
  FormControl,
  FormGroup,
  Validators 
} from '@angular/forms';

import { requiredError, invalidEmailError} from './login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isRegistration: boolean = false;
  hide: boolean = true;

  form!: FormGroup;

  constructor( ) { }

  get errorEmailMessage(): string {
    if (this.email.hasError('email')) {
      return invalidEmailError;
    }

    return requiredError;
  }

  get errorMessage(): string {
    return requiredError;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get emailInvalid(): boolean {
    return this.email.invalid;
  }

  get passwordInvalid(): boolean {
    return this.password.invalid;
  }

  handleTabChange(tabIndex: number): void {
    this.isRegistration = tabIndex !== 0;
    this.initForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.isRegistration) {
      formGroup.registerControl('name', new FormControl('', [Validators.required]));
    }

    this.form = formGroup;
  }

}
