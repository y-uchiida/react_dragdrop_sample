import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { ScheduleItem } from "./ScheduleItem";
import { Schedule, ScheduleOfDate } from "./types";

type Props = {
	id: UniqueIdentifier,
	scheduleOfDate: ScheduleOfDate,
	setSchedules: (value: React.SetStateAction<Schedule[]>) => void
}

const gridLaneStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',
	flexGrow: 1,
	height: 16 * 4 * 24,
	zIndex: 1,
	borderLeft: '1px #666 solid',
}

export const ScheduleGridLane = ({
	id,
	scheduleOfDate,
	setSchedules
}: Props) => {
	const { setNodeRef } = useDroppable({ id, });
	return (
		<div
			style={gridLaneStyle}
			ref={setNodeRef}
		>
			{scheduleOfDate.schedules !== null && scheduleOfDate.schedules.map(schedule => {
				return <ScheduleItem
					key={schedule.uid}
					uid={schedule.uid.toString()}
					title={schedule.title}
					parent={id.toString()}
					startTime={schedule.startTime}
					endTime={schedule.endTime}
					setSchedules={setSchedules}
				/>
			})}
		</div>
	)
}
