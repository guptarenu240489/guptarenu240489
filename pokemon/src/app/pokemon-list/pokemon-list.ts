export interface IPokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemonListResult[];
}

export interface IPokemonListResult {
    name: string;
    url: string;
}