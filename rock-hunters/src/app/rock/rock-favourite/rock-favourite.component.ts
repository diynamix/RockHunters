import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from '../../api.service';
import { RockType } from '../../types/rock';

@Component({
  selector: 'app-rock-favourite',
  templateUrl: './rock-favourite.component.html',
  styleUrls: ['./rock-favourite.component.css']
})
export class RockFavouriteComponent implements OnInit {
  constructor(private apiService: ApiService, private userService: UserService) {}

  rocks: RockType[] = [];

  get userId(): string {
    return this.userService.user?._id || '';
  }

  isOwner(_ownerId: string) {
    return this.userId === _ownerId;
  }
  
  ngOnInit(): void {
    this.apiService.getFavouriteRocks(this.userId).subscribe((rocks) => {
      this.rocks = Object.values(rocks).map(r => r.rock);
    });
  }
}