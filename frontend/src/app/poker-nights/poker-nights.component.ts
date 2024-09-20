import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchPokerNights();
  }

  fetchPokerNights(): void {
    this.http.get<PokerNight[]>('https://pokerdex-backend.onrender.com/pokernights') 
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
    const pokerId = {
      body: { id: id }
    };
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.delete('https://pokerdex-backend.onrender.com/pokernights/delete', { headers, body: pokerId })
      .subscribe(
        () => {
          for (const pokerNight of this.pokerNights) {
            if (pokerNight.id == id) {
              this.pokerNights.splice(this.pokerNights.indexOf(pokerNight), 1);
              break;
            }
          }
          this.successMessage = 'Pokerdex deletada com sucesso';
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting poker night', error);
          this.errorMessage = 'Erro ao deletar pokerdex';
          this.successMessage = '';
        }
      );
  }
}