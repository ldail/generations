import dogIcon from './dog-icon.png';
import catIcon from './cat-icon.png';
import rabbitIcon from './rabbit-icon.png';
import lizardIcon from './lizard-icon.png';
import pigIcon from './pig-icon.png';
import birdIcon from './bird-icon.png';


const animalStats = {
  get types() {
    return {
    dog: {name: 'dog', icon: dogIcon, id: 0, stats: this.growthRates.dog},
    cat: {name: 'cat', icon: catIcon, id: 1, stats: this.growthRates.cat},
    rabbit: {name: 'rabbit', icon: rabbitIcon, id: 2, stats: this.growthRates.rabbit},
    lizard: {name: 'lizard', icon: lizardIcon, id: 3, stats: this.growthRates.lizard},
    bird: {name: 'bird', icon: birdIcon, id: 4, stats: this.growthRates.bird},
    pig: {name: 'pig', icon: pigIcon, id: 5, stats: this.growthRates.pig}
    }
  },
  get starterTypeChoices() {
    return [this.types.dog, this.types.cat, this.types.rabbit,this.types.lizard,this.types.bird,this.types.pig]
  },
  growthRateStats: {
    H: {abbreviation: 'H', name: 'high', initialValue: 22},
    M: {abbreviation: 'M', name: 'medium', initialValue: 16},
    L: {abbreviation: 'L', name: 'low', initialValue: 16}
  },
  get growthRates() {
    return {
      dog: {
        attack: this.growthRateStats.H,
        defense: this.growthRateStats.M,
        speed: this.growthRateStats.M,
        deradiate: this.growthRateStats.L,
        ability: this.growthRateStats.H,
        hp: this.growthRateStats.H,
      },
      cat: {
        attack: this.growthRateStats.M,
        defense: this.growthRateStats.H,
        speed: this.growthRateStats.H,
        deradiate: this.growthRateStats.L,
        ability: this.growthRateStats.L,
        hp: this.growthRateStats.M,
      },
      rabbit: {
        attack: this.growthRateStats.L,
        defense: this.growthRateStats.L,
        speed: this.growthRateStats.M,
        deradiate: this.growthRateStats.H,
        ability: this.growthRateStats.H,
        hp: this.growthRateStats.L,
      },
      lizard: {
        attack: this.growthRateStats.H,
        defense: this.growthRateStats.L,
        speed: this.growthRateStats.L,
        deradiate: this.growthRateStats.H,
        ability: this.growthRateStats.M,
        hp: this.growthRateStats.M,
      },
      bird: {
        attack: this.growthRateStats.M,
        defense: this.growthRateStats.M,
        speed: this.growthRateStats.H,
        deradiate: this.growthRateStats.M,
        ability: this.growthRateStats.M,
        hp: this.growthRateStats.L,
      },
      pig: {
        attack: this.growthRateStats.L,
        defense: this.growthRateStats.H,
        speed: this.growthRateStats.L,
        deradiate: this.growthRateStats.M,
        ability: this.growthRateStats.L,
        hp: this.growthRateStats.H,
      }
    }
  },
  descriptions: {
    attack: 'Strength and damage',
    defense: 'Ability to block damage',
    speed: 'Movement capabilities',
    deradiate: 'Ability to deradiate land',
    ability: 'Alternate skills',
    hp: 'Health against radiation'
  },
}

export default animalStats;