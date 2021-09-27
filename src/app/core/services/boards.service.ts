import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

import { Board } from "../models";
import { AuthService } from "./auth.service";
import { FirestoreUtilsService } from "./firestore-utils.service";

@Injectable({
  providedIn: "root",
})
export class BoardsService extends FirestoreUtilsService {
  constructor(_firestore: AngularFirestore, private _authService: AuthService) {
    super(_firestore);
  }

  getBoards(): Observable<Board[]> {
    return this.getCollection<Board>("boards");
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

    return this.addDoc<Board>("boards", board as Board);
  }
}
