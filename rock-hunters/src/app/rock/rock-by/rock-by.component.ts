import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from '../../api.service';
import { Rock } from '../../types/rock';

@Component({
  selector: 'app-rock-by',
  templateUrl: './rock-by.component.html',
  styleUrls: ['./rock-by.component.css']
})
export class RockByComponent {
  constructor(private apiService: ApiService, private userService: UserService, private activeRoute: ActivatedRoute, private router: Router) {
    const data = this.router.getCurrentNavigation()?.extras.state;
    this.username = data!['username'];
  }

  ownerId = '';
  username = '';
  rocks: Rock[] = [];
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.ownerId = data['ownerId'];
      
      this.apiService.getAllRocksByUserId(this.ownerId).subscribe((rocks) => {
        this.rocks = Object.values(rocks);
      });
    });
  }
}
