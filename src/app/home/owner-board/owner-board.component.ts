import { Component, Input, OnInit } from '@angular/core';

import { Board } from '@app/core/models';
import { BoardsService } from '@app/core/services';

@Component({
  selector: 'app-owner-board',
  templateUrl: './owner-board.component.html',
  styleUrls: ['./owner-board.component.scss']
})
export class OwnerBoardComponent implements OnInit {
  @Input() board!: Board;

  constructor(private _boardService: BoardsService) { }

  ngOnInit(): void {}

  deleteBoard(id: string): Promise<void> {
    return this._boardService.deleteBoard(this.board.id);
  }
}
