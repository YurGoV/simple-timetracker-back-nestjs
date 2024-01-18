export enum ContextsTypes {
  LIFE_SPHERE = 'life',
  IMPORTANCE = 'importance',
  TAG = 'tag',
}

export enum LifeSpheres {
  HEALTH = 'health',
  SOCIAL = 'social',
  FAMILY = 'family',
  WORK = 'work',
}

export enum Importances {
  IMPORTANT_URGENT = 'important_urgent',
  IMPORTANT_NOTURGENT = 'important_noturgent',
  UNIMPORTANT_URGENT = 'unimportant_urgent',
  UNIMPORTANT_NOTURGENT = 'unimportant_noturgent',
}
// TODO: delete & check before & change to enum
export const initialUserTags = [
  'coding',
  'learn',
  'pet',
  'fiction video',
  'job',
  'physical actitity',
  'hobby',
];

// TODO: delete & check before & change to enum
export const lifeSpheres = ['health', 'social', 'family', 'work'];

// TODO: delete & check before & change to enum
export const importances = [
  'important_urgent',
  'important_noturgent',
  'unimportant_urgent',
  'unimportant_noturgent',
];
