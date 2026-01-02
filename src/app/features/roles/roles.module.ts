import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { RoleListComponent } from "./role-list/role-list.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [{ path: "", component: RoleListComponent }];

@NgModule({
  declarations: [RoleListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class RolesModule {}
