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
  pokerNights: PokerNight[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchPokerNights();
  }

  fetchPokerNights(): void {
    this.http.get<PokerNight[]>('http://localhost:3000/pokernights') 
      .subscribe(
        (data) => {
            this.pokerNights = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        },
        (error) => {
          console.error('Error fetching poker nights', error);
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
          console.error('Error deleting poker night', error);
        }
      );
  }

  
}