import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  public pokemonForm: FormGroup;
  public pokemonDetails: FormArray;
  public count = 0;
  isValidFormSubmitted = null;
  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService ) {
    this.pokemonForm = this.fb.group({
      pokemonDetails: this.fb.array([this.createPokemon()])
    })
  }

  ngOnInit(): void {
  }

  createPokemon(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-z0-9]+$/i)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-z0-9]+$/i)]],
      price: ['',[Validators.required, Validators.pattern(/^[0-9]*\.[0-9]{2}$/)]],
      category: ['', Validators.required],
      imageUrl: ['',[Validators.required, Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9]+$/i)]],
      select: ['', Validators.required]
    });
  }

  addPokemon() {
    this.pokemonDetails = this.pokemonForm.get('pokemonDetails') as FormArray;
    this.pokemonDetails.push(this.createPokemon());
    this.count++;
  }

  get pokemonControls() {
    return this.pokemonForm.get('pokemonDetails')['controls'];
  }

  submitForm() {
    this.spinnerService.show();
    this.isValidFormSubmitted= false;
    if(this.pokemonForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    setTimeout(() => {
      localStorage.setItem('form',JSON.stringify(this.pokemonForm.value));
      this.pokemonForm.reset();
      this.spinnerService.hide();
      alert('Pokemon Details Saved');
    }, 2000);
  }
  resetForm() {
    this.pokemonForm.reset();
  }
}
