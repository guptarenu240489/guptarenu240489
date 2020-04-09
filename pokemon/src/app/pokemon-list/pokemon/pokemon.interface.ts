import { IPokemonListResult } from '../pokemon-list.interface';

export interface IPokemon {
    abilities: any[];
    base_experience: number;
    forms:any[];
    game_indices: any[];
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order:number;
    species: IPokemonListResult;
    sprites: IPokemonSprites;
    stats: IPokemonStats[];
    types: any[];
    weight: number;
}

export interface IPokemonSprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export interface IPokemonStats{
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}