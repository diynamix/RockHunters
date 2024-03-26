import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { rockConstraints } from 'src/app/constraints/validation-constraints';

@Component({
  selector: 'app-rock-edit',
  templateUrl: './rock-edit.component.html',
  styleUrls: ['./rock-edit.component.css']
})
export class RockEditComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  constraints = rockConstraints;
  rockId = '';

  constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private router: Router) {}
  
  editRock(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const rock = form.value;
    
    this.apiService.editRock(this.rockId, rock).subscribe(() => {
      this.router.navigate([`/rocks/${this.rockId}`]);
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.rockId = data['rockId'];

      this.apiService.getRockForEditByRockId(this.rockId).subscribe((rock) => {
        const { name, imageUrl, origin, length, height, width, weight } = rock;
        this.form.setValue({ name, imageUrl, origin, length, height, width, weight });
      });
    });
  }
}
