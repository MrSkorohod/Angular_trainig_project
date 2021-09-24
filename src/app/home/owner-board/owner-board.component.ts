import { Component, Input, OnInit } from '@angular/core';

import { Board } from '@app/core/models';

@Component({
  selector: 'app-owner-board',
  templateUrl: './owner-board.component.html',
  styleUrls: ['./owner-board.component.scss']
})
export class OwnerBoardComponent implements OnInit {
  @Input() board!: Board;

  constructor() { }

  ngOnInit(): void {}
}
