import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleDetailComponent } from "./role-detail/role-detail.component";
import { RoleCreateComponent } from "./role-create/role-create.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  { path: "", component: RoleListComponent },
  { path: "create", component: RoleCreateComponent },
  { path: ":id", component: RoleDetailComponent },
];

@NgModule({
  declarations: [RoleListComponent, RoleDetailComponent, RoleCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RolesModule {}
