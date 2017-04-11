import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import {JsonApiService} from "../../core/api/json-api.service";
import {Headers, Response, Http} from '@angular/http';

@Injectable()
export class UserService {

  public user: Subject<any>;

  public userInfo = {
    username: 'Guest'
  };

  public userRoles = [];

  constructor(private http: Http) {
    this.user = new Subject();
  }

  getLoginInfo():Observable<any> {

    return this.http.get("/api/user/me").map(res => {
      return {
        "username": res.json(),
        "picture": "assets/img/avatars/male.png",
        "activity": 0
      }
    })
      .do((user) => {
        this.userInfo = user;
        this.user.next(user)
      });
   
  }

  getUserRoles():Observable<any> {
   return this.http.get("/api/user/myroles")
    .map(data => data.json());    
  }

}
