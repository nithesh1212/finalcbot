import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BotComponent}  from './bot/bot.component';
import {UserComponent}  from './user/user.component';
import {LayoutComponent} from './dashboard/layout/layout.component'
import { BotsComponent } from './bots/bots.component';
const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{
		path: 'login',
    component: UserComponent
    
	},
	{
		path: 'createBot/:userId',
    component: BotComponent
    
	},
	{
		path: 'bots/:userId',
    component: BotsComponent
    
	},
	{
		path: 'bot/:botId',
    component: LayoutComponent,
    loadChildren: './agent/agent.module#AgentModule' 
	},
	{
		path: '**',
		redirectTo: '/login'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
