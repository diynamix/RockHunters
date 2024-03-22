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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const {username, email, passGroup: {password, rePassword} = {}} = this.form.value;

    this.userService.register(email!, password!, username!).subscribe((res) => {
      const user = {
        _id: res._id,
        email: res.email,
        username: res.username,
        accessToken: res.accessToken,
      };

      localStorage.setItem('user', JSON.stringify(user));
      
      this.router.navigate(['/rocks']);
    });
  }
}
