import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated$ = new BehaviorSubject<boolean | null>(null);
  private _currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private _currentUserId!: string;
  private _destroySubject = new Subject<void>();

  isAuthenticated$ = this._isAuthenticated$.asObservable().pipe(distinctUntilChanged());
  currentUser$ = this._currentUser$.asObservable();

  constructor(private _authService: AngularFireAuth, private _firestore: AngularFirestore) {
    this.checkIsAuth();
  }

  checkIsAuth(): void {
    this._authService.onAuthStateChanged((user) => {
      this._isAuthenticated$.next(!!user);

      if (user && user.displayName) {
        this.initUser(user.displayName);
      }
    });
  }

  async signInByEmailAndPssword(email: string, password: string): Promise<void> {
    try {
      const result = await this._authService.signInWithEmailAndPassword(email, password);
      if (!result.user || !result.user.displayName) return;

      this.initUser(result.user.displayName);
    } catch (error: any) {
      console.log('Something went wrong: ', error.message);
    }
  }

  async signUpByEmailAndPassword(email: string, password: string, userName: string): Promise<void> {
    try {
      const result = await this._authService.createUserWithEmailAndPassword(email, password);
      if (!result.user) return;

      const userId = await this.addUser(result.user, email, userName);
      this.initUser(userId);
    } catch (error: any) {
      console.log('Something went wrong: ', error.message);
    }
  }

  signOut(): void {
    this._authService.signOut();
    this._currentUser$.next(undefined);
    this._destroySubject.next();
    localStorage.clear();
    this._isAuthenticated$.next(false);
  }

  getUser(): void {
    if (!this._currentUserId) return;
    
    const user$ = this._firestore.doc<User>(`users/${this._currentUserId}`).valueChanges() as Observable<User>;
    user$.pipe(takeUntil(this._destroySubject)).subscribe(user => {
      this._isAuthenticated$.next(!!user);
      this._currentUser$.next(user);
    });
  }

  setUserToLocalStorage(): void {
    localStorage.setItem('userId', this._currentUserId);
  }

  private initUser(userId: string): void {
    this._currentUserId = userId;
    this.setUserToLocalStorage();
    this.getUser();
  }

  private async addUser(user: firebase.User, email: string, name: string): Promise<string> {
    const userId = (await this._firestore.collection('users').add({ email, name })).id;
    
    // to be able to get user forom the database
    await user.updateProfile({
      displayName: userId
    });

    return userId;
  }
}
