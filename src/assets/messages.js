import animalStats from './animalStats';
import heartyAttributeIcon from './hearty-attribute-icon.png';
import thoughtfulAttributeIcon from './brain-attribute-icon.png';
import attractiveAttributeIcon from './attractive-attribute-icon.png';
import agileAttributeIcon from './agile-attribute-icon.png';


export const promptMessages = {
  introPage: {
    messages: [
      `Press any key to continue...`,
      `Huh?`,
      `Where am I?`,
      `It feels like I've been sleeping...`,
      `A really long time....`,
      ``,
      `Huh?`,
      `Who is that?`,
      `He looks so familiar...`,
      `But I can't quite...`,
      `---`,
      `!!!`,
    ]
  },
  familySetup: {
    messages: [
      `What is your family's name?`,
      `And what was that boy's name? The one you held so tightly?`,
      `What is your family's primary attribute?`,
      
    ]
  }
};

export const primaryAttributes = [
  {name: 'Agile', description: 'can move quickly', stat: '+ Speed', icon: agileAttributeIcon},
  {name: 'Thoughtful', description: 'problem-solving expert', stat: '+ Ability', icon: thoughtfulAttributeIcon},
  {name: 'Attractive', description: 'can make matches easily', stat: '+ Likeability', icon: attractiveAttributeIcon},
  {name: 'Hearty', description: 'can handle radiation well', stat: '+ Deradiate', icon: heartyAttributeIcon}
];

export const petData = [
  //Example: {name: 'dog', icon: '../../', stats: {attack: {value: 10, abbreviation: 'H'}, defense: {...}}}
  animalStats.starterTypeChoices.map(animal => {
    const stats = {};
    for (let [key,value] of animalStats.growthRates[animal.name]) {
      stats[key] = {value: value.initialValue, growthRate: value.abbreviation};
    }
    const animalObject = {name: animal.name, icon: animal.icon, stats};
    return animalObject;
  })
];
