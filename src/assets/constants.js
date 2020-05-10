import heartyAttributeIcon from './hearty-attribute-icon.png';
import thoughtfulAttributeIcon from './brain-attribute-icon.png';
import attractiveAttributeIcon from './attractive-attribute-icon.png';
import agileAttributeIcon from './agile-attribute-icon.png';
import { pages, VIEW } from './pages';


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
};

export const characterColors = {
  RED: {displayText: 'Red', hexCode: '#cc2512'},
  ORANGE: {displayText: 'Orange', hexCode: '#ebc017'},
  YELLOW: {displayText: 'Yellow', hexCode: '#d7e605'},
  GREEN: {displayText: 'Green', hexCode: '#0dbd45'},
  BLUE: {displayText: 'Blue', hexCode: '#0e22b5'},
  PURPLE: {displayText: 'Purple', hexCode: '#850db5'},
};

export const characterStates = {
  MOVING: 'Moving',
  IN_CITY: 'In city',
  DERADIATING: 'Deradiating',
  PLANTING: 'Planting',
  HARVESTING: 'Harvesting',
  IDLING: 'Idling'
};



export const INITIAL_GAME_TIME = 0; //Year 5000, January 1 12:00AM
export const INCREMENT_GAME_TIME_AMOUNT = 1 //One month
export const MAX_TIME_BEFORE_IDLE_HALT = 1 // One month
export const MAP_MOVEMENT_DISTANCE = 5; // distance on the SVG map the characters moves per time.
export const MAP_MOVEMENT_TIME_PER_MOVE = 5000; // 5000 milliseconds and the movement updates


/* DEV ONLY BELOW */


export const seedCharacterData = [
  {
    name: 'Abby',
    gender: gender.female,
    parentId: 'ROOT',
    partnerId: 1,
    partnerLeader: true,
    petId: 0,
    id: 0,
    age: 87,
    lastCityPosition: {x: 3300, y: 4200, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: -18, y: 120, nextLocation: {x: 150, y: 0}},
    currentView: VIEW.MAP,
    color: characterColors.RED
  },
  {
    name: 'Billy',
    gender: gender.male,
    parentId: null,
    partnerId: 0,
    partnerLeader: false,
    petId: 1,
    id: 1,
    age: 85,
  },
  {
    name: 'Carlos',
    gender: gender.male,
    parentId: 0,
    partnerId: 3,
    partnerLeader: true,
    petId: 2,
    id: 2,
    age: 66,
    lastCityPosition: {x: 2200, y: 1000, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 25, y: 25, nextLocation: {x: 25, y: 35}},
    currentView: VIEW.MAP,
    color: characterColors.ORANGE
  },
  {
    name: 'Dandelo',
    gender: gender.male,
    parentId: null,
    partnerId: 2,
    partnerLeader: false,
    petId: 3,
    id: 3,
    age: 65,
  },
  {
    name: 'Elijah',
    gender: gender.male,
    parentId: 0,
    partnerId: 6,
    partnerLeader: true,
    petId: 2,
    id: 4,
    age: 66,
    lastCityPosition: {x: 1000, y: 3000, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 100, y: 100},
    currentView: VIEW.HOME,
    color: characterColors.YELLOW
  },
  {
    name: 'Helga',
    gender: gender.female,
    parentId: 2,
    partnerId: 7,
    partnerLeader: true,
    petId: 5,
    id: 5,
    age: 47,
    lastCityPosition: {x: 1300, y: 3200, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 89, y: -40, nextLocation: {x: 120, y: 120}},
    currentView: VIEW.HOME,
    color: characterColors.GREEN
  },
  {
    name: 'Frank',
    gender: gender.male,
    parentId: 0,
    partnerId: 9,
    partnerLeader: true,
    petId: 6,
    id: 6,
    age: 62,
    lastCityPosition: {x: 2300, y: 2200, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 100, y: -88, nextLocation: {x: 28, y: -88}},
    currentView: VIEW.MAP,
    color: characterColors.BLUE
  },
  {
    name: 'Integra',
    gender: gender.female,
    parentId: null,
    partnerId: 5,
    partnerLeader: false,
    petId: 7,
    id: 7,
    age: 42
  },
  {
    name: 'Jose',
    gender: gender.male,
    parentId: 2,
    partnerId: 10,
    partnerLeader: true,
    petId: 8,
    id: 8,
    age: 49,
    lastCityPosition: {x: 5300, y: 3208, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 12, y: 55},
    currentView: VIEW.HOME,
    color: characterColors.PURPLE
  },
  {
    name: 'Gessica',
    gender: gender.female,
    parentId: null,
    partnerId: 6,
    partnerLeader: false,
    petId: 9,
    id: 9,
    age: 65,
  },
  {
    name: 'Kelly',
    gender: gender.female,
    parentId: null,
    partnerId: 8,
    partnerLeader: false,
    petId: 10,
    id: 10,
    age: 48,
  },
  {
    name: 'Louis',
    gender: gender.male,
    parentId: 6,
    partnerId: 12,
    partnerLeader: true,
    petId: 11,
    id: 11,
    age: 47,
    lastCityPosition: {x: 4300, y: 1200, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 90, y: -70},
    currentView: VIEW.MAP,
    color: characterColors.RED
  },
  {
    name: 'Marty',
    gender: gender.male,
    parentId: null,
    partnerId: 11,
    partnerLeader: false,
    petId: 12,
    id: 12,
    age: 45,
  },
  {
    name: 'Noel',
    gender: gender.male,
    parentId: 5,
    partnerId: null,
    partnerLeader: true,
    petId: 13,
    id: 13,
    age: 38,
    lastCityPosition: {x: 5000, y: 1100, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: -90, y: 90, nextLocation: {x: 90, y: -90}},
    currentView: VIEW.MAP,
    color: characterColors.ORANGE
  },
  {
    name: 'Olga',
    gender: gender.female,
    parentId: 8,
    partnerId: 15,
    partnerLeader: true,
    petId: 14,
    id: 14,
    age: 32,
    lastCityPosition: {x: 5600, y: 1830, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 133, y: -52, nextLocation: {x: 122, y: -130}},
    currentView: VIEW.MAP,
    color: characterColors.YELLOW
  },
  {
    name: 'Prince',
    gender: gender.male,
    parentId: null,
    partnerId: 14,
    partnerLeader: false,
    petId: 15,
    id: 15,
    age: 31,
  },
  {
    name: 'Quasar',
    gender: gender.male,
    parentId: 11,
    partnerId: null,
    partnerLeader: true,
    petId: 16,
    id: 16,
    age: 32,
    lastCityPosition: {x: 2700, y: 1833, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 15, y: 22, nextLocation: {x: 78, y: -55}},
    currentView: VIEW.MAP,
    color: characterColors.GREEN
  },
  {
    name: 'Rich',
    gender: gender.male,
    parentId: 14,
    partnerId: null,
    partnerLeader: true,
    petId: 17,
    id: 17,
    age: 16,
    lastCityPosition: {x: 3700, y: 2833, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 250, y: 250},
    currentView: VIEW.HOME,
    color: characterColors.BLUE
  },
  {
    name: 'Steve',
    gender: gender.male,
    parentId: 14,
    partnerId: 20,
    partnerLeader: true,
    petId: 18,
    id: 18,
    age: 19,
    lastCityPosition: {x: 1700, y: 1839, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: 96, y: 34, nextLocation: {x: 65, y: 21}},
    currentView: VIEW.HOME,
    color: characterColors.BLUE
  },
  {
    name: 'Tegan',
    gender: gender.female,
    parentId: null,
    partnerId: 18,
    partnerLeader: false,
    petId: 20,
    id: 20,
    age: 19,
  },
  {
    name: 'Undula',
    gender: gender.female,
    parentId: 14,
    partnerId: 21,
    partnerLeader: true,
    petId: 19,
    id: 19,
    age: 22,
    lastCityPosition: {x: 3700, y: 2839, location: pages.PAGE_CITY_ONE},
    lastMapPosition: {x: -140, y: -140, nextLocation: {x: -150, y: 160}},
    currentView: VIEW.HOME,
    color: characterColors.PURPLE
  },
  {
    name: 'Vega',
    gender: gender.male,
    parentId: null,
    partnerId: 19,
    partnerLeader: false,
    petId: 21,
    id: 21,
    age: 17,
  },
];

export const seededPetData = [
  {
    name: 'Addle',
    type: 0,
    ownerId: 0,
    id: 0
  },
  {
    name: 'Bryantt',
    type: 1,
    ownerId: 1,
    id: 1
  },
  {
    name: 'Cuddles',
    type: 2,
    ownerId: 2,
    id: 2
  },
  {
    name: 'Digger',
    type: 3,
    ownerId: 3,
    id: 3
  },
  {
    name: 'Effy',
    type: 4,
    ownerId: 4,
    id: 4
  },
  {
    name: 'Fella',
    type: 5,
    ownerId: 6,
    id: 6
  },
  {
    name: 'Grady',
    type: 0,
    ownerId: 9,
    id: 9
  },
  {
    name: 'Himmy',
    type: 1,
    ownerId: 5,
    id: 5
  },
  {
    name: 'Icky',
    type: 2,
    ownerId: 7,
    id: 7
  },
  {
    name: 'Jilly',
    type: 3,
    ownerId: 8,
    id: 8
  },
  {
    name: 'Kooky',
    type: 2,
    ownerId: 10,
    id: 10
  },
  {
    name: 'Lillly',
    type: 2,
    ownerId: 11,
    id: 11
  },
  {
    name: 'Missy',
    type: 4,
    ownerId: 12,
    id: 12
  },
  {
    name: 'Nestor',
    type: 5,
    ownerId: 13,
    id: 13
  },
  {
    name: 'Oppa',
    type: 0,
    ownerId: 14,
    id: 14
  },
  {
    name: 'Pal',
    type: 1,
    ownerId: 15,
    id: 15
  },
  {
    name: 'Quippy',
    type: 2,
    ownerId: 16,
    id: 16
  },
  {
    name: 'Racy',
    type: 3,
    ownerId: 17,
    id: 17
  },
  {
    name: 'Sal',
    type: 4,
    ownerId: 18,
    id: 18
  },
  {
    name: 'Teddy',
    type: 5,
    ownerId: 20,
    id: 20
  },
  {
    name: 'Ummm',
    type: 0,
    ownerId: 19,
    id: 19
  },
  {
    name: 'Viggy',
    type: 1,
    ownerId: 21,
    id: 21
  }
]