import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from '../../api.service';
import { Rock } from '../../types/rock';

@Component({
  selector: 'app-rock-my',
  templateUrl: './rock-my.component.html',
  styleUrls: ['./rock-my.component.css']
})
export class RockMyComponent implements OnInit {
  constructor(private apiService: ApiService, private userService: UserService) {}

  rocks: Rock[] = [];

  get userId(): string {
    return this.userService.user?._id || '';
  }

  get username(): string {
    return this.userService.user?.username || '';
  }
  
  ngOnInit(): void {
    this.apiService.getAllRocksByUserId(this.userId).subscribe((rocks) => {
      this.rocks = Object.values(rocks);
    });
  }
}
