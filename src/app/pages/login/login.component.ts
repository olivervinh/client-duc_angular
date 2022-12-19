import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Chart from 'chart.js';
import { LoginService } from './login.service';


@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
})
@Injectable()
export class LoginComponent implements OnInit{
  public newForm: FormGroup;
  constructor(public loginService: LoginService){}
    ngOnInit(){
      this.newForm = new FormGroup({
        userName: new FormControl(null),
        passWord: new FormControl(null),
      })
    }
   
    onSubmit = (data) => {
      this.loginService.login(data.userName, data.passWord)
    }
}
