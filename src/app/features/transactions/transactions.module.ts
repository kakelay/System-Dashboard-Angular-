import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: TransactionListComponent }];

@NgModule({
  declarations: [TransactionListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class TransactionsModule { }
