import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router:Router) {}

  loginMatch = true;

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const {email, password} = form.value;

    this.userService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('accessToken', res.accessToken!);
        this.router.navigate(['/rocks']);
        this.loginMatch = true;
      },
      error: (err) => {
      },
      complete: () => {
        this.loginMatch = false;
      }
    });
  }
}
