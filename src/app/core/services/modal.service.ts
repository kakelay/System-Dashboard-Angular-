import { Injectable, ComponentRef, Injector } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private modalSubject = new Subject<{ component: any; data: any }>();
  public modal$ = this.modalSubject.asObservable();

  private activeModalRef: ComponentRef<any> | null = null;

  constructor(private injector: Injector) {}

  open(component: any, data: any): void {
    this.activeModalRef = this.injector.get(
      "MODAL_COMPONENT_REF",
    ) as ComponentRef<any>;
    this.modalSubject.next({ component, data });
  }

  close(): void {
    if (this.activeModalRef) {
      this.activeModalRef.destroy();
      this.activeModalRef = null;
    }
  }
}
