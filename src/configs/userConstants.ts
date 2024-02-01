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
  UNDEFINED = 'other',
}

export enum Importances {
  IMPORTANT_URGENT = 'important urgent',
  IMPORTANT_NOTURGENT = 'important noturgent',
  UNIMPORTANT_URGENT = 'unimportant urgent',
  UNIMPORTANT_NOTURGENT = 'unimportant noturgent',
}
// TODO: delete & check before & change to enum
export const initialUserTags = [
  'coding',
  'learn',
  'walking',
  'meeting',
  'pet',
  'fiction',
  'video',
  'job',
  'physical actitity',
  'hobby',
  'js',
  'ts',
  'node',
  'vue',
  'dance',
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
