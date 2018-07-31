import { Component, OnInit } from '@angular/core';
import { IntentService } from '../../services/intent.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public botId;
  intents : any;

  constructor(public intentService : IntentService, public _activatedRoute : ActivatedRoute, public _router : Router) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe(PARAMETERS=> this.botId= PARAMETERS.botId);
    console.log(this.botId);
    
  }

  getIntents() {
    console.log("In getIntents")
    //var botid = {"botId" : this.botId};
    console.log(this.botId)
    this._router.navigate(["/bot/"+this.botId]);

}
getEntities() {
  console.log("In getIntents")
  //var botid = {"botId" : this.botId};
  console.log(this.botId)
  this._router.navigate(["/bot/"+this.botId+"/entities"]);

}
chat() {
  console.log("In chat")
  //var botid = {"botId" : this.botId};
  console.log(this.botId)
  this._router.navigate(["/bot/"+this.botId+"/chat/"+this.botId]);

}

fileUpload() {
  console.log("In chat")
  //var botid = {"botId" : this.botId};
  console.log(this.botId)
  this._router.navigate(["/bot/"+this.botId+"/settings/"+this.botId]);

}
}


