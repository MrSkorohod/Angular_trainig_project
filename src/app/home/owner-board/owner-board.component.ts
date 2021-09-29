import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { Board } from '@app/core/models';
import { BoardsService } from '@app/core/services';

@Component({
  selector: 'app-owner-board',
  templateUrl: './owner-board.component.html',
  styleUrls: ['./owner-board.component.scss'],
})
export class OwnerBoardComponent implements OnInit {
  @Input() board!: Board;
  
  edit: boolean = true;
  form!: FormGroup;

  constructor(private _boardService: BoardsService) {}

  ngOnInit(): void {
    this._initForm();
  }

  deleteBoard(): Promise<void> {
    return this._boardService.deleteBoard(this.board.id);
  }

  cancel(): void {
    this.edit = true;
    this._initForm();
  }

  async updateBoard(): Promise<void> {
    try {
      const { title, description } = this.form.value;
      await this._boardService.updateBoard(this.board.id, title, description);
      
      this.edit = true;
      this._initForm();
    } catch(e) {
      console.log(e);
    }
  }
  
  private _initForm(): void {
    const formGroup = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });

    this.form = formGroup;
  }
}
