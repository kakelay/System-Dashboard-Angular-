import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { LogoutModalComponent } from "./components/logout-modal/logout-modal.component";
import { AddCustomerModalComponent } from "./components/add-customer-modal/add-customer-modal.component";
import { NotificationContainerComponent } from "./components/notification-container/notification-container.component";

@NgModule({
  declarations: [
    DataTableComponent,
    LogoutModalComponent,
    AddCustomerModalComponent,
    NotificationContainerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableComponent,
    LogoutModalComponent,
    AddCustomerModalComponent,
    NotificationContainerComponent,
  ],
})
export class SharedModule {}
