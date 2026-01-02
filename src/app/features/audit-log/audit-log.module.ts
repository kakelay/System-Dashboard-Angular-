import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogComponent } from './audit-log.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: AuditLogComponent }];

@NgModule({
  declarations: [AuditLogComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class AuditLogModule { }
