import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { LogoutModalComponent } from "./components/logout-modal/logout-modal.component";

@NgModule({
  declarations: [DataTableComponent, LogoutModalComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableComponent,
    LogoutModalComponent,
  ],
})
export class SharedModule {}
