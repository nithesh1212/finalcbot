import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule}        from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



/* Material UI imports begins here */
/* Material UI imports begins here */
import {MatIconModule,MatCardModule,MatInputModule,
  MatOptionModule,MatSelectModule,MatCheckboxModule,MatButtonModule} from '@angular/material';
  import {MatGridListModule} from '@angular/material/grid-list';
  import {MatDividerModule} from '@angular/material/divider';
  import {MatExpansionModule} from '@angular/material/expansion';
  import {MatSliderModule} from '@angular/material/slider';
  import {MatChipsModule} from '@angular/material/chips';
  import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
/* Material UI imports ends here */


/* Project Components imports begins here */
import {CommonsModule} from './commons/commons.module'
import { DashboardModule } from './dashboard/dashboard.module';
import { UserComponent } from './user/user.component';
import { BotComponent } from './bot/bot.component';
import {UserService} from './services/user.service';
import { BotsComponent } from './bots/bots.component';
import { BotService, BotResolverService } from './services/bot.service';
import { IntentService } from './services/intent.service';
/* Project Components imports ends here */


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BotComponent,
    BotsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonsModule.forRoot(),
    DashboardModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    MatSliderModule,
    MatChipsModule,
    MatAutocompleteModule

  ],
  providers: [UserService,BotService,BotResolverService,IntentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
