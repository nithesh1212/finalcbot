import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IntentsComponent} from './intents/intents.component'
import {IntentComponent} from './intent/intent.component';
import {TrainComponent} from './train/train.component';
import {SettingsComponent} from './settings/settings.component';
import {ChatComponent} from './chat/chat.component';
import {EntitiesComponent} from './entities/entities.component'
import {EntityComponent} from './entity/entity.component'
import {EntityResolverService} from '../services/entities.service'
import {IntentResolverService} from '../services/intent-resolver.service';
import { BotResolverService } from '../services/bot.service';

const routes: Routes = [
  { path: '', component: IntentsComponent},  
  {
    path: 'intents', component: IntentsComponent,
  },
 // {
   // path: 'create-intent', component: IntentComponent,
  //},
  {
    resolve: {
			bot: BotResolverService,
		},
    path: 'create-intent/:botId', component: IntentComponent,
  },
  {
    resolve: {
      story: IntentResolverService,
      bot: BotResolverService,
		},
    path: 'edit-intent/:botId/:intent_id', component: IntentComponent,
  },
  {
    path: 'entities', component: EntitiesComponent,
  },
  {
    resolve: {
			entity: EntityResolverService,
		},
    path: 'edit-entity/:entity_id', component: EntityComponent,
  },
  {
    resolve: {
			story: IntentResolverService,
		},
    path: 'train-intent/:intent_id', component: TrainComponent,
  },
  {
    resolve: {
			bot: BotResolverService,
		},
    path: 'settings/:botId', component: SettingsComponent,
  },
  {
    resolve: {
			bot: BotResolverService,
		},
    path: 'chat/:botId', component: ChatComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
