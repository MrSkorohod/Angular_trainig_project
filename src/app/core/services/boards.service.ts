import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FirestoreUtilsService } from './firestore-utils.service';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';
import { Board } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BoardsService extends FirestoreUtilsService {
  constructor(
    _firestore: AngularFirestore,
    private _authService: AuthService,
    private _spinner: SpinnerService
  ) {
    super(_firestore);
  }

  getBoards(): Observable<Board[]> {
    this._spinner.show();
    const boards$ = this.getCollection<Board>('boards');
    boards$
      .pipe(take(1))
      .subscribe(() => this._spinner.hide());
    return boards$;
  }

  deleteBoard(id: string): Promise<void> {
    return this.deleteDoc(`boards/${id}`);
  }

  addBoard(title: string, description: string): Promise<string> {
    const board = {
      title,
      description,
      owner_id: this._authService.currentUserId,
    };

    return this.addDoc<Board>('boards', board as Board);
  }

  updateBoard(id: string, title: string, description: string): Promise<void> {
    const data = {
      title,
      description,
    };
    return this.updateDoc(`boards/${id}`, data);
  }
}
