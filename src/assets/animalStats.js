import dogIcon from './dog-icon.png';
import catIcon from './cat-icon.png';
import rabbitIcon from './rabbit-icon.png';
import lizardIcon from './lizard-icon.png';
import pigIcon from './pig-icon.png';
import birdIcon from './bird-icon.png';

const animalStats = {
  types: {
    dog: {name: 'dog', icon: dogIcon},
    cat: {name: 'cat', icon: catIcon},
    rabbit: {name: 'rabbit', icon: rabbitIcon},
    lizard: {name: 'lizard', icon: lizardIcon},
    bird: {name: 'bird', icon: birdIcon},
    pig: {name: 'pig', icon: pigIcon}
  },
  startingStats: {
    H: {abbreviation: 'H', value: 22},
    M: {abbreviation: 'M', name: 'medium', value: 16},
    L: {abbreviation: 'L', name: 'low', value: 16}
  },
  get growthRates() {
    return {
      dog: {
        attack: this.startingStats.H,
        defense: this.startingStats.M,
        speed: this.startingStats.M,
        deradiate: this.startingStats.L,
        ability: this.startingStats.H,
        hp: this.startingStats.H,
      },
      cat: {
        attack: this.startingStats.M,
        defense: this.startingStats.H,
        speed: this.startingStats.H,
        deradiate: this.startingStats.L,
        ability: this.startingStats.L,
        hp: this.startingStats.M,
      },
      rabbit: {
        attack: this.startingStats.L,
        defense: this.startingStats.L,
        speed: this.startingStats.M,
        deradiate: this.startingStats.H,
        ability: this.startingStats.H,
        hp: this.startingStats.L,
      },
      lizard: {
        attack: this.startingStats.H,
        defense: this.startingStats.L,
        speed: this.startingStats.L,
        deradiate: this.startingStats.H,
        ability: this.startingStats.M,
        hp: this.startingStats.M,
      },
      bird: {
        attack: this.startingStats.M,
        defense: this.startingStats.M,
        speed: this.startingStats.H,
        deradiate: this.startingStats.M,
        ability: this.startingStats.M,
        hp: this.startingStats.L,
      },
      pig: {
        attack: this.startingStats.L,
        defense: this.startingStats.H,
        speed: this.startingStats.L,
        deradiate: this.startingStats.M,
        ability: this.startingStats.L,
        hp: this.startingStats.H,
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