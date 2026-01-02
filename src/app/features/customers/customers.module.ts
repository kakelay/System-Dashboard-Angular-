import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: CustomerListComponent }];

@NgModule({
  declarations: [CustomerListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class CustomersModule { }
