import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Rock } from 'src/app/types/rock';

@Component({
  selector: 'app-rock-add',
  templateUrl: './rock-add.component.html',
  styleUrls: ['./rock-add.component.css']
})
export class RockAddComponent {
  constructor(private apiService: ApiService) {}

  addRock(event: Event, rock: {}) {
    event.preventDefault();
    this.apiService.createRock(rock).subscribe((data) => console.log({data}));
  }
}
