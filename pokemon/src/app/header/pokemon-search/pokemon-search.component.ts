import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)])
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log('[Search Form]',this.searchForm.value);
    if(this.searchForm.valid) {
      this.router.navigate(['list', this.searchForm.value.name]);
    }
  }
}
