import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Rock } from '../../types/rock';
import { RockRecord } from '../../types/rock-record';

@Component({
  selector: 'app-rock-list',
  templateUrl: './rock-list.component.html',
  styleUrls: ['./rock-list.component.css']
})
export class RockListComponent implements OnInit {
  isLoggedIn = false;
  isOwner = false;
  isLiked = false;

  rocks: Rock[] = [];

  constructor(private api: ApiService) {}
  
  ngOnInit(): void {
      this.api.getAllRocks().subscribe((rocks) => {
        this.rocks = Object.values(rocks);
      });
  }
}
