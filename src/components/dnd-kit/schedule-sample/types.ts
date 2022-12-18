import { UniqueIdentifier } from "@dnd-kit/core";

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


export type Schedule = {
	uid: UniqueIdentifier,
	title: string,
	date: number,
	startTime: number,
	endTime: number,
}

export type ScheduleOfDate = {
	uid: UniqueIdentifier,
	schedules: Schedule[],
}
