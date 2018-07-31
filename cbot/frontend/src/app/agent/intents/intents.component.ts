import { Component, OnInit, Inject, Input } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { IntentService } from '../../services/intent.service';
import {TrainingService} from '../../services/training.service'
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-intents',
  templateUrl: './intents.component.html',
  styleUrls: ['./intents.component.scss']
})
export class IntentsComponent implements OnInit {


  private botId
  intents: any;

  constructor(public intentService: IntentService, private _activatedRoute: ActivatedRoute,
     private _router: Router,private trainingService:TrainingService, private coreService: UtilsService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(PARAMETERS=> this.botId= PARAMETERS.botId);
    console.log(this.botId);
    var botid = {"botId" : this.botId};
    this.intentService.getIntents(botid).then((s: any) => {
      this.intents = s;
      //console.log(this.intents);
    });
  }


  add() {
    console.log("In Add")
    this._router.navigate(["bot/"+this.botId+"/create-intent",this.botId])
  }

  edit(intent) {

    console.log(intent);
    this._router.navigate(["/bot/"+this.botId+"/edit-intent", this.botId,intent._id.$oid,])
  }

  train(intent) {
    this._router.navigate(["/bot/"+this.botId+"/train-intent", intent._id.$oid])
  }

  delete(intent) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.intentService.delete_intent(intent._id.$oid).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

  trainModels() {
    this.coreService.displayLoader(true);
    this.trainingService.trainModels(this.botId).then((s: any) => {
      this.coreService.displayLoader(false);
    });
  }
}
