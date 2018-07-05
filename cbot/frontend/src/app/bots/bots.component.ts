import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BotService } from '../services/bot.service';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss']
})
export class BotsComponent implements OnInit {
  constructor(public botService: BotService, private router : Router, private activated_route : ActivatedRoute) { }

  private userId
  bots : any;
  

  ngOnInit() {
    this.activated_route.params.subscribe(PARAMETERS=> this.userId = PARAMETERS.userId);
   // alert(this.userId);
    var userid = {"userId":this.userId};
    this.botService.getBots(userid).then((s: any) => {
      this.bots = s;
      console.log(this.bots);
    }); 

  }
  
  createBot() {
    this.router.navigate(["/createBot/"+this.userId])
  }


  ConfigureBot(botId) {
    
  
    console.log ("Bot ID", botId.$oid);
    
    this.router.navigate(["/bot/"+botId.$oid])
  }

  

}
