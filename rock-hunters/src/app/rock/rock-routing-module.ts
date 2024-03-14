import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RockAddComponent } from "./rock-add/rock-add.component";
import { RockDetailsComponent } from "./rock-details/rock-details.component";
import { RockListComponent } from "./rock-list/rock-list.component";


const routes: Routes = [
    { path: 'rocks', children: [
        { path: '', pathMatch: 'full', component: RockListComponent },
        { path: 'add', component: RockAddComponent },
        // RockDetails path MUST stay after RockAdd path
        { path: ':rockId', component: RockDetailsComponent },
    ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RockRoutingModule {}