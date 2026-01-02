import { Component } from "@angular/core";

@Component({
  selector: "app-report-viewer",
  template: `
    <h1>System Reports</h1>
    <div class="grid-2 mt-4">
      <div class="card">
        <h3>Sales Performance</h3>
        <div class="chart-placeholder">Sales Chart (Mock)</div>
        <button class="btn btn-outline mt-4">Download PDF</button>
      </div>
      <div class="card">
        <h3>User Activity</h3>
        <div class="chart-placeholder">Activity Chart (Mock)</div>
        <button class="btn btn-outline mt-4">Download PDF</button>
      </div>
    </div>
  `,
  styles: [
    `
      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }
      .chart-placeholder {
        height: 200px;
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        border-radius: 0.5rem;
        color: #94a3b8;
        border: 2px dashed #e2e8f0;
      }
    `,
  ],
})
export class ReportViewerComponent {}
