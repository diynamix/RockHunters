import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from '../../api.service';
import { RockWithOwnerType } from '../../types/rock';

@Component({
  selector: 'app-rock-list',
  templateUrl: './rock-list.component.html',
  styleUrls: ['./rock-list.component.css']
})
export class RockListComponent implements OnInit {
  constructor(private apiService: ApiService, private userService: UserService) {}

  rocks: RockWithOwnerType[] = [];

  get userId(): string {
    return this.userService.user?._id || '';
  }

  isOwner(_ownerId: string) {
    return this.userId === _ownerId;
  }
  
  ngOnInit(): void {
    this.apiService.getAllRocks().subscribe((rocks) => {
      this.rocks = Object.values(rocks);
    });
  }
}
