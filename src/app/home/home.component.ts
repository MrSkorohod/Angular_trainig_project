import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Board } from '@app/core/models';
import { BoardsService } from '@app/core/services';
import { trackById } from '@app/core/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  boards$!: Observable<Board[]>;

  trackById = trackById;
  
  constructor(private _boardService: BoardsService) { }

  ngOnInit(): void {
    this.boards$ = this._boardService.getBoards();
  }

}
