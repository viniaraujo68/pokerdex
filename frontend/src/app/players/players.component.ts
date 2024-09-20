import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Player {
  name: string;
  totalProfit: number;
  nightNumber: number;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPlayers();
  }

  fetchPlayers(): void {
    this.http.get<Player[]>('http://localhost:3000/players')
      .subscribe(
        (data) => {
          this.players = data.sort((a, b) => b.totalProfit - a.totalProfit);
        },
        (error) => {
          console.error('Error fetching players', error);
        }
      );
  }
}