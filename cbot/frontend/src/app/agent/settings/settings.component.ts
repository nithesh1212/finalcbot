import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {IntentService} from '../../services/intent.service'
import {AgentsService} from '../../services/agents.service'
import { UtilsService } from '../../services/utils.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  botId;
  fileToUpload: File = null;
  config_form =  this.fb.group({
    "confidence_threshold":[]
  });

  constructor(private intentService:IntentService,private agent_service:AgentsService,  
    public fb: FormBuilder,private utilsService:UtilsService,private _activatedRoute: ActivatedRoute) { }

  code = `
  
  <script type="text/javascript">
  !function(win,doc){"use strict";var script_loader=()=>{try
  {var head=doc.head||doc.getElementsByTagName("head")[0],script=doc.createElement("script");script.setAttribute("type","text/javascript"),script.setAttribute("src",win.iky_base_url+"assets/widget/iky_widget.js"),head.appendChild(script)}
  catch(e){}};win.chat_context={"username":"John"},win.iky_base_url="http://localhost:8080/",script_loader()}(window,document);
  </script>
  `
  ngOnInit() {
    this._activatedRoute.params.subscribe(PARAMETERS=> this.botId= PARAMETERS.botId);
    console.log(this.botId);
  }

  threshold_value_changed(){
    this.save_config()
  }
  save_config(){
    this.agent_service.update_config(this.config_form.value)
    console.log(this.config_form.value)
  }

  export(){
    window.open(environment.applicationUrl+"intents/export","_blank")
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

uploadFileToActivity() {
  this.utilsService.displayLoader(true)
  this.intentService.importIntents(this.fileToUpload, this.botId).then ((result)=>{
    this.utilsService.displayLoader(false)
    console.log(result)
  })
}

}
