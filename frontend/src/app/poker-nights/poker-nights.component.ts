import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Player {
  name: string;
  profit: number;
}

interface PokerNight {
  date: string;
  place: string;
  totalPot: number;
  players: Player[];
}

@Component({
  selector: 'app-poker-nights',
  templateUrl: './poker-nights.component.html',
  styleUrls: ['./poker-nights.component.css']
})
export class PokerNightsComponent implements OnInit {
  pokerNights: PokerNight[] = []; // Array to store poker night data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPokerNights(); // Fetch poker nights when the component initializes
  }

  // Method to fetch poker nights from the backend
  fetchPokerNights(): void {
    this.http.get<PokerNight[]>('http://localhost:3000/api/pokernights') // Adjust the URL to your backend endpoint
      .subscribe(
        (data) => {
          this.pokerNights = data; // Assign fetched data to pokerNights array
        },
        (error) => {
          console.error('Error fetching poker nights', error); // Log any errors
        }
      );
  }
}