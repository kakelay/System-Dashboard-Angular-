import { Component } from "@angular/core";

@Component({
  selector: "app-report-viewer",
  templateUrl: "./report-viewer.component.html",
  styleUrls: ["./report-viewer.component.scss"],
})
export class ReportViewerComponent {
  onRefresh(): void {
    console.log("Refreshing reports...");
    // Simulate API call
  }

  onExportAll(): void {
    console.log("Exporting all reports...");
    // Trigger export functionality
  }

  onDownload(reportType: string): void {
    const timestamp = new Date().getTime();
    console.log(`Downloading ${reportType} report...`);
    // Simulate PDF download
  }
}
