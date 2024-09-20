import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  successMessage: string | null = null;

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
    this.successMessage = null;
  }

  onProfitInput(event: any, index: number): void {
    let value = event.target.value;

    value = value.replace(',', '.');

    this.pokerNight.players[index].profit = parseFloat(value);
  }

  closeAlert(): void {
    this.successMessage = null;
  }

  onSubmit(pokerNightForm: NgForm): void {
    // Prepare the data to be sent
    const pokerNightData = {
      date: this.pokerNight.date,
      place: this.pokerNight.place,
      totalPot: this.pokerNight.totalPot,
      players: this.pokerNight.players
    };

    // Make a POST request to the backend to save the poker night
    this.http.post('http://localhost:3000/api/pokernights', pokerNightData)
      .subscribe(
        (response) => {
          console.log('Poker night created successfully!', response);
          this.resetForm(pokerNightForm);
          this.successMessage = 'Pokerdex registrado com sucesso!';
        },
        (error) => {
          console.error('Error creating poker night:', error);
        }
      );
  }

}