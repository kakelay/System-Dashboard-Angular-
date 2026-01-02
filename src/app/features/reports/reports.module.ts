import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';

const routes: Routes = [{ path: '', component: ReportViewerComponent }];

@NgModule({
  declarations: [ReportViewerComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ReportsModule { }
