import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PokerNightsComponent } from './poker-nights/poker-nights.component';
import { PlayersComponent } from './players/players.component';
import { PokerNightFormComponent } from './poker-night-form/poker-night-form.component';
import { FormsModule } from '@angular/forms';
import { CommaDecimalPipe } from './pipes/comma-decimal.pipe';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PokerNightsComponent,
    PlayersComponent,
    PokerNightFormComponent,
    CommaDecimalPipe,
    LoginComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }