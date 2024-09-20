import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

interface Player {
  playerName: string;
  profit: number;
}

interface PokerNight {
  id: string;
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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchPokerNights();
  }

  // Method to fetch poker nights from the backend
  fetchPokerNights(): void {
    this.http.get<PokerNight[]>('http://localhost:3000/pokernights') // Adjust the URL to your backend endpoint
      .subscribe(
        (data) => {
          this.pokerNights = data; // Assign fetched data to pokerNights array
        },
        (error) => {
          console.error('Error fetching poker nights', error); // Log any errors
        }
      );
  }

  deletePokerNight(id: string): void {
    const options = {
      body: { id: id }
    };
  
    this.http.delete('http://localhost:3000/pokernights/delete', options)
      .subscribe(
        () => {
          for (const pokerNight of this.pokerNights) {
            if (pokerNight.id == id) {
              this.pokerNights.splice(this.pokerNights.indexOf(pokerNight), 1);
              break;
            }
          }
        },
        (error) => {
          console.error('Error deleting poker night', error); // Log any errors
        }
      );
  }

  
}