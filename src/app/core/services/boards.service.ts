import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreUtilsService } from './firestore-utils.service';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';
import { Board } from '../models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    return this.getCollection<Board>('boards').pipe(
      tap((res) => this._spinner.hide())
    );
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

  updateBoard(id: string, title: string, description: string) {
    const data = {
      title,
      description,
    };
    return this.updateDoc(`boards/${id}`, data);
  }
}
