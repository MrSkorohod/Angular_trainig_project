import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { Board } from '../models';
import { FirestoreUtilsService } from './firestore-utils.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService extends FirestoreUtilsService {

  constructor(_firestore: AngularFirestore) {
    super(_firestore);
  }

  getBoards(): Observable<Board[]> {
    return this.getCollection<Board>('boards');
  }
}
