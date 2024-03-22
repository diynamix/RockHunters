import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rock-add',
  templateUrl: './rock-add.component.html',
  styleUrls: ['./rock-add.component.css']
})
export class RockAddComponent {
  // constructor(private apiService: ApiService) {}

  addRock(form: NgForm) {
    if (form.invalid) {
      return;
    }
  }

  // addRock(event: Event, rock: {}) {
  //   event.preventDefault();
  //   this.apiService.createRock(rock).subscribe((data) => console.log({data}));
  // }
}
