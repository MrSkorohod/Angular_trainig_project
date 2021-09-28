import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { BoardsService } from "@app/core/services";

@Component({
  selector: "app-add-board",
  templateUrl: "./add-board.component.html",
  styleUrls: ["./add-board.component.scss"],
})
export class AddBoardComponent implements OnInit {
  form!: FormGroup;

  substitution: boolean = true;

  constructor(private _boardService: BoardsService) {}

  async addBoard(): Promise<void> {
    try {
      const { title, description } = this.form.value;
      await this._boardService.addBoard(title, description);
      this.substitution = !this.substitution;
      this.initForm();
    } catch (e) {
      console.error(e);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const formGroup = new FormGroup({
      title: new FormControl(""),
      description: new FormControl(""),
    });

    this.form = formGroup;
  }
}
