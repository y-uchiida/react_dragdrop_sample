import { UniqueIdentifier } from "@dnd-kit/core";
import { dayOfTheWeek, Schedule, ScheduleOfDate } from "../types";

export const initialSchedules = [...Array(7).keys()].map<Schedule>(i => {
	return {
		uid: `schedule-${i}` as UniqueIdentifier,
		title: `予定-${i}`,
		date: i,
		startTime: i * 60,
		endTime: (i + 1) * 60,
	}
});


export const initialScheduleOfDate = [...Array(7).keys()].map<ScheduleOfDate>(i => {
	return {
		uid: i as UniqueIdentifier,
		schedules: initialSchedules.filter(schedule => schedule.date === i)
	}
});
