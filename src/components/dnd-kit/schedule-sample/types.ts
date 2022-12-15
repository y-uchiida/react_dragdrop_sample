export const dayOfTheWeek = [
	'日',
	'月',
	'火',
	'水',
	'木',
	'金',
	'土'
] as const;

export type DayOfTheWeek = typeof dayOfTheWeek[keyof typeof dayOfTheWeek];
