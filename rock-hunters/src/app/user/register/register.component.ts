import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { matchPasswordsValidator } from './match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required]],
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

  emailOk = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  clearEmailOk() {
    this.emailOk = true;
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const {username, email, passGroup: {password, rePassword} = {}} = this.form.value;

    if (password !== rePassword) {
      return;
    }

    this.userService.register(email!, password!, username!)
    .subscribe({
      next: (res) => {
        localStorage.setItem('accessToken', res.accessToken!);
        this.router.navigate(['/rocks']);
        this.emailOk = true;
      },
      error: (err) => {
      },
      complete: () => {
        this.emailOk = false;
      }
    });
  }
}
