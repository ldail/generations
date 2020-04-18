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
      `What kind of pet does he have? Choose wisely.`,
      `And what was that pet's name?`,
      `Okay. Does everything look right?`,
      `Great! It's time to go help out!`,
      `Let's go to`
    ]
  }
};

export const primaryAttributes = [
  {name: 'Agile', description: 'can move quickly', stat: 'Speed', icon: agileAttributeIcon},
  {name: 'Thoughtful', description: 'problem-solving expert', stat: 'Ability', icon: thoughtfulAttributeIcon},
  {name: 'Attractive', description: 'can make matches easily', stat: 'Likeability', icon: attractiveAttributeIcon},
  {name: 'Hearty', description: 'can handle radiation well', stat: 'Deradiate', icon: heartyAttributeIcon}
];

export const gender = {
  male: 'male',
  female: 'female',
  other: 'other'
}


export const INITIAL_GAME_TIME = 0; //Year 5000, January 1 12:00AM
export const INCREMENT_GAME_TIME_AMOUNT = 1 //One month