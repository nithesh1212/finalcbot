import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingService {

  constructor(public http: HttpClient) {}

  saveTrainingData(intent_id,data) {
    return this.http.post(environment.applicationUrl + `train/${intent_id}/data`, data).toPromise();
  }

  getTrainingData(intent_id) {
    return this.http.get(environment.applicationUrl + `train/${intent_id}/data`).toPromise();
  }

  trainModels(botId) {
    return this.http.post(environment.applicationUrl + `nlu/build_models/${botId}`, {}).toPromise();
  }

}


