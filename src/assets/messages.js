import attributeIcon from './attribute-icon.png';
import animalStats from './animalStats';

const messageGroupings = {
  intro: {
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
    primaryAttributes: 
      {
        messages: [
          {name: 'Agile', description: 'can move quickly', stat: '+ Speed', icon: attributeIcon},
          {name: 'Thoughtful', description: 'problem-solving expert', stat: '+ Ability', icon: attributeIcon},
          {name: 'Attractive', description: 'can make matches easily', stat: '+ Likeability', icon: attributeIcon},
          {name: 'Hearty', description: 'can handle radiation well', stat: '+ Deradiate', icon: attributeIcon}
        ],
        prompt: `What is your family's primary attribute?`
      },
    startingPet:
    {
      messages:
        //Example: {name: 'dog', icon: '../../', stats: {attack: {value: 10, abbreviation: 'H'}, defense: ...}}
        Object.keys(animalStats.types).map(animalType => {
          const statCategories = Object.entries(animalStats.growthRates[animalType]);
          const animalObject = {name: animalType, stats: {}};
          for (let [key, value] of statCategories) {
            animalObject.stats[key] = {value: value.value, growthRate: value.abbreviation}
            animalObject['icon'] = animalType.icon;
          }
          return animalObject;
          }),
        prompt: 'What kind of pet does he have? Choose wisely.'
      }
  }
};

export default messageGroupings;