import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {

  constructor(public http: HttpClient,) { }
  login(userDetails){

   
    return this.http.post(environment.applicationUrl+'user/login', userDetails).toPromise();
  }

}
