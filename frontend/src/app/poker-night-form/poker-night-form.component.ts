import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-poker-night-form',
  templateUrl: './poker-night-form.component.html',
  styleUrls: ['./poker-night-form.component.css']
})
export class PokerNightFormComponent {
  pokerNight = {
    date: '',
    place: '',
    totalPot: 0,
    players: [{ name: '', profit: 0 }]
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  addPlayer() {
    this.pokerNight.players.push({ name: '', profit: 0 });
  }

  removePlayer(index: number) {
    this.pokerNight.players.splice(index, 1);
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.pokerNight = { date: '', place: '', totalPot: 0, players: [{name: '', profit: 0}]};
    this.successMessage = '';
    this.errorMessage = '';
  }

  onProfitInput(event: any, index: number): void {
    let value = event.target.value;

    value = value.replace(',', '.');

    this.pokerNight.players[index].profit = parseFloat(value);
  }

  onSubmit(pokerNightForm: NgForm): void {
    // Prepare the data to be sent
    const pokerNightData = {
      date: this.pokerNight.date,
      place: this.pokerNight.place,
      totalPot: this.pokerNight.totalPot,
      players: this.pokerNight.players
    };

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('https://pokerdex-backend.onrender.com/pokernights', pokerNightData, { headers })
      .subscribe(
        (response) => {
          console.log('Poker night created successfully!', response);
          this.resetForm(pokerNightForm);
          this.successMessage = 'Pokerdex registrado com sucesso!';
          this.errorMessage = '';
        },
        (error) => {
          this.successMessage = '';
          this.errorMessage = 'Erro ao criar o pokerdex. Tente novamente.';
          console.error('Error creating poker night:', error);
        }
      );
  }

}