import { Injectable, ComponentRef, Injector } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LogoutModalService {
  private modalComponentRef: ComponentRef<any> | null = null;
  private confirmSubject = new Subject<boolean>();
  public confirm$ = this.confirmSubject.asObservable();

  constructor(private injector: Injector) {}

  open(callbacks: { onConfirm: () => void; onCancel: () => void }): void {
    // For now, create a simple implementation
    // This will be enhanced with proper modal service integration
    this.confirmSubject.next(true);
  }

  close(): void {
    if (this.modalComponentRef) {
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
  }
}
