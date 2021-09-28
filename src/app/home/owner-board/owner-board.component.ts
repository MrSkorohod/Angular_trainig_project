import { FormGroup, FormControl } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";

import { Board } from "@app/core/models";
import { BoardsService } from "@app/core/services";

@Component({
  selector: "app-owner-board",
  templateUrl: "./owner-board.component.html",
  styleUrls: ["./owner-board.component.scss"],
})
export class OwnerBoardComponent implements OnInit {
  @Input() board!: Board;
  edit: boolean = true;
  form!: FormGroup;

  constructor(private _boardService: BoardsService) {}

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

  deleteBoard(id: string): Promise<void> {
    return this._boardService.deleteBoard(this.board.id);
  }

  async updateBoard(id: string) {
    const { title, description } = this.form.value;
    await this._boardService.updateBoard(this.board.id, title, description);
    this.edit = !this.edit;
    this.initForm();
  }
}
