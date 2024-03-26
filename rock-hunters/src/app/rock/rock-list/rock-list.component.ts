import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from '../../api.service';
import { Rock } from '../../types/rock';

@Component({
  selector: 'app-rock-list',
  templateUrl: './rock-list.component.html',
  styleUrls: ['./rock-list.component.css']
})
export class RockListComponent implements OnInit {
  constructor(private apiService: ApiService, private userService: UserService) {}
  
  isLiked = false;

  rocks: Rock[] = [];

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }

  isOwner(_ownerId: string) {
    return this.userId === _ownerId;
  }

  // isLiked(_ownerId: string) {}
  
  ngOnInit(): void {
    this.apiService.getAllRocks().subscribe((rocks) => {
      this.rocks = Object.values(rocks);
        // .map(rock => { return rock;});
      // this.apiService.getAllLikesByRockId(rock._id).subscribe((likesCount) => rock.likes = likesCount);
    });
  }
}
