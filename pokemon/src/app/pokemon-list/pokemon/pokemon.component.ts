import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPokemon } from './pokemon.interface';

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
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show(this.name);
    this.httpClient.get(this.url)
      .subscribe((data: IPokemon) => {
        this.image = data.sprites.front_default;
        this.id = data.id;
        this.spinner.hide(this.name);
      });
  }

  navigate() : void {
    this.router.navigate(['details', this.id]);
  }

}
