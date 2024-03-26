import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthActivate } from "../guards/auth.activate";
import { RockAddComponent } from "./rock-add/rock-add.component";
import { RockDetailsComponent } from "./rock-details/rock-details.component";
import { RockEditComponent } from "./rock-edit/rock-edit.component";
import { RockFavouriteComponent } from "./rock-favourite/rock-favourite.component";
import { RockListComponent } from "./rock-list/rock-list.component";


const routes: Routes = [
    {
        path: 'rocks', children: [
            {
                path: '',
                pathMatch: 'full',
                component: RockListComponent
            },
            {
                path: 'favourite',
                component: RockFavouriteComponent,
                canActivate: [AuthActivate]
            },
            {
                path: 'add',
                component: RockAddComponent,
                canActivate: [AuthActivate]
            },
            {
                path: ':rockId', children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: RockDetailsComponent
                    },
                    {
                        path: 'edit',
                        component: RockEditComponent,
                        canActivate: [AuthActivate]
                    }
                ]
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RockRoutingModule {}