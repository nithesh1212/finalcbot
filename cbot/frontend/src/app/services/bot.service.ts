import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class BotService {

  constructor(public http: HttpClient,) { }
  createBot(botDetails){   
    return this.http.post(environment.applicationUrl+'bot/create', botDetails).toPromise();
  }

  getBots(userId){  
    //alert(userId); 
    return this.http.post(environment.applicationUrl+'bot/list',userId).toPromise();
  }

  getBot(id){  
    //alert(userId); 
    return this.http.get(environment.applicationUrl+`bot/getBot/${id}`).toPromise();
  }

}
import {Resolve, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class BotResolverService implements Resolve<any>  {

    constructor(private _router: Router,private botService: BotService) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return new Promise((resolve,reject)=>{
            console.log("In Bot resolver", route.params['botId']);
            this.botService.getBot(route.params['botId']).then(
            (result) => {
                //console.log("bot details resolved")
              resolve(result)
            },
            (err)=>{
              new Error("Could'nt get bot details")
            }
          )
        });
    }
}