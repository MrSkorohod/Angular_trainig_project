import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUtilsService {

  constructor(private _firestore: AngularFirestore) { }

  getCollection<T>(path: string): Observable<T[]> {
    return this._firestore.collection<T>(path).snapshotChanges().pipe(map(snapshots => snapshots.map(snapshot => ({
      ...snapshot.payload.doc.data() as T,
      id: snapshot.payload.doc.id
    }))));
  }
  
  getDoc<T>(path: string): Observable<T> {
    return this._firestore.doc<T>(path).snapshotChanges().pipe(map(snapshot => ({
      ...snapshot.payload.data() as T,
      id: snapshot.payload.id
    })));
  }
}