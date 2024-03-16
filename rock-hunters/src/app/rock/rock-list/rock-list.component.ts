import { Component, OnInit } from '@angular/core';
import { Like } from 'src/app/types/like';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from '../../api.service';
import { Rock } from '../../types/rock';

@Component({
  selector: 'app-rock-list',
  templateUrl: './rock-list.component.html',
  styleUrls: ['./rock-list.component.css']
})
export class RockListComponent implements OnInit {
  constructor(private api: ApiService, private userServic: UserService) {}

  isOwner = false;
  isLiked = false;

  rocks: Rock[] = [];
  likes: Like[] = [];

  get isLoggedIn(): boolean {
    return this.userServic.isLogged;
  }

  get userId(): string {
    return this.userServic.user?._id || '';
  }
  
  ngOnInit(): void {
    this.api.getAllLikes().subscribe((likes) => {
      this.likes = Object.values(likes);
    });

    this.api.getAllRocks().subscribe((rocks) => {
      this.rocks = Object.values(rocks).map(rock => {
        rock.likes = this.likes.filter((like) => like['rockId'] === rock._id).length;
        return rock;
      });
    });

  }
}
