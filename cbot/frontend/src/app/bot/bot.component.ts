import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BotService} from '../services/bot.service'
import { HttpResponse } from 'selenium-webdriver/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  private BotName;
  private BotDescription;
  private userId;

  constructor( private botService : BotService , private activated_route : ActivatedRoute, private router : Router) { }
  
  ngOnInit() {}
  CreateBot(){
    this.activated_route.params.subscribe(PARAMETERS=> this.userId = PARAMETERS.userId);
    console.log(this.BotName);
    console.log(this.BotDescription);
    
    var botDetails={
      "botName":this.BotName,
      "botDescription": this.BotDescription,
      "userId": this.userId
      };
    console.log(botDetails);
   // alert("login");
    this.botService.createBot(botDetails).then(
      (result)=>{
        console.log(result);
      if(result["statusCode"] == "200")
      {
        //alert("Valid user"); 
        this.router.navigate(["/bots/"+this.userId]);  
      }    
      else
      {
        alert("In else");
        this.router.navigate(["/bot"]);
      }
    });
  
}
}