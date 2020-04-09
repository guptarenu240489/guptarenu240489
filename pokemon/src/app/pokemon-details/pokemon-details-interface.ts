import { IPokemonListResult } from '../pokemon-list/pokemon-list.interface';

export interface IPokemonSpecies {
    base_happiness:number;
    capture_rate: number;
    egg_groups: IPokemonListResult[];
    evolution_chain:{
        url: string
    };
    gender_rate:number;
    hatch_counter: number;
    id: number;
    name: string;
}

export interface IPokemonEvolutionChain {
    chain : {
        evolves_to: [
            {
                evolves_to: [
                    {
                        evolution_details: IPokemonEvoltionDetails[]
                    }
                ];
                species: {
                    name: string;
                    url: string;
                }
            }
        ]
    }
}

export interface IPokemonEvoltionDetails {
    min_level: number,
}