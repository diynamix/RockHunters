import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Rock as Rock } from 'src/app/types/rock';

@Component({
  selector: 'app-rock-details',
  templateUrl: './rock-details.component.html',
  styleUrls: ['./rock-details.component.css']
})
export class RockDetailsComponent implements OnInit {
  rock = {} as Rock;
  
  constructor(private apiService: ApiService, private activeRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const rockId = data['rockId'];
      
      this.apiService.getRockByRockId(rockId).subscribe((rock) => {
        this.apiService.getAllLikesByRockId(rock._id).subscribe((likesCount) => rock.likes = likesCount);
        this.rock = rock;
      });
    });
  }
}
