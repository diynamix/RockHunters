import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { RockType } from '../../types/rock';

@Component({
  selector: 'app-rock-by',
  templateUrl: './rock-by.component.html',
  styleUrls: ['./rock-by.component.css']
})
export class RockByComponent implements OnInit {
  constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private router: Router) {
    const data = this.router.getCurrentNavigation()?.extras.state;
    this.username = data!['username'];
  }

  ownerId = '';
  username = '';
  rocks: RockType[] = [];
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.ownerId = data['ownerId'];
      
      this.apiService.getAllRocksByUserId(this.ownerId).subscribe((rocks) => {
        this.rocks = Object.values(rocks);
      });
    });
  }
}
