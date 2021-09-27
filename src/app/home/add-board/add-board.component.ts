import { Component, OnInit } from '@angular/core';
import { BoardsService } from '@app/core/services';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent implements OnInit {

  constructor(private _boardService: BoardsService) { }

  ngOnInit(): void {  }

  addBoard() {
    return this._boardService.addBoard('title', 'description');
  }

}
