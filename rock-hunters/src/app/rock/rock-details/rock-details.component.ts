import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { RockWithOwnerType } from 'src/app/types/rock';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-rock-details',
  templateUrl: './rock-details.component.html',
  styleUrls: ['./rock-details.component.css']
})
export class RockDetailsComponent implements OnInit {
  rock = {
    imageUrl: 'template.jpg',
    owner: {
        username: '',
    },
  } as RockWithOwnerType;

  likeId: string | undefined;
  likesCount = 0;

  constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get isOwner(): boolean {
    return this.userId === this.rock._ownerId;
  }

  get isLiked(): boolean {
    return !!(this.likeId);
  }

  get likes(): number {
    return this.likesCount;
  }
  
  get userId(): string {
    return this.userService.user?._id || '';
  }

  likeHandler() {
    if (!this.isLoggedIn || this.isOwner) {
      return;
    }

    if (!this.likeId) {
      this.apiService.like(this.rock._id).subscribe((data) => {
        this.likeId = data._id;
        this.likesCount++;
      });
    } else {
      this.apiService.unlike(this.likeId).subscribe(() => {
        this.likeId = undefined;
        this.likesCount--;
      });
    }
  };

  delete() {
    const hasConfirmed = confirm(`Are you sure you want to delete ${this.rock.name}`);

    if (hasConfirmed) {
      this.apiService.deleteRock(this.rock._id).subscribe();
      this.router.navigate(['/rocks']);
    }
  }
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const rockId = data['rockId'];      
      
      this.apiService.getRockByRockId(rockId).subscribe((rock) => {
        this.rock = rock;

        this.apiService.getLikeId(this.userId, this.rock._id).subscribe((likes) => {
          this.likeId = likes.find(like => like?._ownerId === this.userId)?._id;
        });
        
        this.apiService.getAllLikesByRockId(this.rock._id).subscribe((likesCount) => {
          this.likesCount = likesCount
        });
      });
    });
  }
}
