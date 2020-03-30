export class PokemonProfileModel {
    public height;
    public weight;
    public catchRate;
    public genderRatio;
    public eggGroup;
    public hatchSteps;
    public abilities;
    public ev;
    constructor(height, weight,catchRate, genderRatio, eggGroup, hatchSteps, abilites, ev) {
        this.height = {key: 'Height', value: height + 'm'};
        this.weight = {key: 'Weight', value: weight + 'kg'};
        this.catchRate = {key: 'Catch Rate', value: catchRate + '%'};
        this.genderRatio = {key: 'Gender Ratio', value: genderRatio+ '%'};
        this.eggGroup = {key: 'Egg Groups', value: eggGroup};
        this.hatchSteps = {key: 'Hatch Steps', value: hatchSteps};
        this.abilities = {key: 'Abilities', value: abilites};
        this.ev = {key: 'Evs', value:ev};

    }
}