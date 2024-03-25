import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-rock-add',
  templateUrl: './rock-add.component.html',
  styleUrls: ['./rock-add.component.css']
})
export class RockAddComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addRock(form: NgForm) {
    // event.preventDefault();

    if (form.invalid) {
      return;
    }

    const rock = form.value;
    
    this.apiService.createRock(rock).subscribe(() => {
      this.router.navigate(['/rocks']);
    });
  }
}
