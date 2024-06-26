import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { rockConstraints } from 'src/app/constraints/validation-constraints';

@Component({
  selector: 'app-rock-add',
  templateUrl: './rock-add.component.html',
  styleUrls: ['./rock-add.component.css']
})
export class RockAddComponent {
  constraints = rockConstraints;

  constructor(private apiService: ApiService, private router: Router) {}
  
  addRock(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const rock = form.value;
    
    this.apiService.createRock(rock).subscribe(() => {
      this.router.navigate(['/rocks']);
    });
  }
}
