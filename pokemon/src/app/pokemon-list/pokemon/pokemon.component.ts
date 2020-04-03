import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  image: string;
  id: number;
  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.httpClient.get(this.url)
      .subscribe((data: any) => {
        this.image = data.sprites.front_default;
        this.id = data.id;
      })
  }

  navigate() {
    this.router.navigate(['details', this.id]);
  }

}
