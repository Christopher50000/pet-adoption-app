import { Component } from '@angular/core';


interface Pet {
  name: string;
  description: string;
  image: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  pets: Pet[] = [
    { name: 'Snowball', description: '2-year-old playful cat who loves cuddles.', image: '/assets/pets/cat1.jpg' },
    { name: 'Buster', description: '3-year-old energetic cat ready for adventure.', image: '/assets/pets/cat2.jpg' },
    { name: 'Luna', description: 'Sweet cat who loves to play.', image: '/assets/pets/cat3.jpg' }
  ];
}
