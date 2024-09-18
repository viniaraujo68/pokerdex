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
  players: Player[] = []; // Array to store player data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPlayers(); // Fetch players when the component initializes
  }

  // Method to fetch players from the backend
  fetchPlayers(): void {
    this.http.get<Player[]>('http://localhost:3000/api/players') // Adjust the URL to your backend endpoint
      .subscribe(
        (data) => {
          this.players = data; // Assign fetched data to players array
        },
        (error) => {
          console.error('Error fetching players', error); // Log any errors
        }
      );
  }
}