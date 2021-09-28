import { SpinnerService } from "./core/services/spinner.service";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  showSpinner$: Observable<boolean>;

  constructor(private spinner: SpinnerService) {
    this.showSpinner$ = this.spinner.getValue();
  }
}
