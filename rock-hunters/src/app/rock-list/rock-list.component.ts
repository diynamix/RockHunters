import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-rock-list',
  templateUrl: './rock-list.component.html',
  styleUrls: ['./rock-list.component.css']
})
export class RockListComponent implements OnInit {
  constructor(private api: ApiService) {}
  ngOnInit(): void {
      this.api.getAllRocks().subscribe((rock) => {
        console.log(rock);
      });
  }
}
