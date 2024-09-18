// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Ensure this path is correct
import { AppComponent } from './app.component'; // Import your main component
import { PokerNightsComponent } from './poker-nights/poker-nights.component'; // Import your components
import { PlayersComponent } from './players/players.component'; // Import your components

@NgModule({
  declarations: [
    AppComponent, // Declare your main component
    PokerNightsComponent, // Declare PokerNightsComponent
    PlayersComponent // Declare PlayersComponent
  ],
  imports: [
    BrowserModule, // Import BrowserModule
    AppRoutingModule // Import AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Specify the bootstrap component
})
export class AppModule { }