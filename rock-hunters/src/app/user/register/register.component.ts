import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from './match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['george@abv.bg', [Validators.required]],
    passGroup: this.fb.group({
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]]
    },
    {
      validators: [matchPasswordsValidator('password', 'rePassword')]
    }),
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  constructor(private fb: FormBuilder) {}

  register(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
