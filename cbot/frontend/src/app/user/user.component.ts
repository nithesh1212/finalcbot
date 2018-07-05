import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import { HttpResponse } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import {BotComponent} from '../bot/bot.component'
//import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private username;
  private password;

  constructor(public userService: UserService, private router : Router) { }

  ngOnInit() {}
  login(){
    console.log(this.username);
    console.log(this.password)
    var userDetails={
      "username" : window.btoa(this.username),
      "password" : window.btoa(this.password)
      };
    console.log(userDetails);
   // alert("login");
    this.userService.login(userDetails).then(
      (result)=>{
      if(result["statusCode"] == "200")
      {
        console.log(result["userId"]);
        this.router.navigate(["/bots/"+result["userId"]]);  
      }    
      else
      {
   //     alert("In else");
        
        this.router.navigate(["/login"]);
      }
    });
    
    
   /*.catch((err:HttpResponse) => {
      // simple logging, but you can do a lot more, see below
      
        console.error('An error occurred:', err);
      
    });*/
      
		}

}
