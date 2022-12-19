import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

//import * as _ from 'lodash';
// Add the RxJS Observable operators we need in this app.
@Injectable({
    providedIn:'root'
  })  
export class LoginService {
  baseUrl: string = 'https://localhost:44302/api/';
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;
  constructor(private http: HttpClient, public router: Router) {

  }
  login(userName, password) {
    console.log('user',userName,password)
    return this.http
      .post(
        this.baseUrl + 'auth/login',
        JSON.stringify({ userName, password }),
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }
          )
        }).subscribe(
          (res: any) => {
            localStorage.setItem('auth_token', res.auth_token);
            localStorage.setItem('idUser', res.id);
            localStorage.setItem('fullname', res.fullname);
            if (res.quyen == 'Admin') {
              this.router.navigate(['']);
            }
            this.loggedIn = true;
            this._authNavStatusSource.next(true);
            return true;
          })
  }
}