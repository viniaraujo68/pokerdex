// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokerNightsComponent } from './poker-nights/poker-nights.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  { path: 'poker-nights', component: PokerNightsComponent },
  { path: 'players', component: PlayersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }