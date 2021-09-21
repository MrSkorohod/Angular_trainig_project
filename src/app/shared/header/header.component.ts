import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean | null>;
  currentUserName$!: Observable<string | undefined>;

  constructor(private _authServics: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this._authServics.isAuthenticated$;
    this.currentUserName$ = this._authServics.currentUser$.pipe(map(user =>  user?.name));
  }

  logOut(): void {
    this._authServics.signOut();
    this._router.navigateByUrl('login');
  }
}
