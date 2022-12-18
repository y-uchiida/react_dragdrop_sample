import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { ScheduleItem } from "./ScheduleItem";
import { ScheduleOfDate } from "./types";

type Props = {
	id: UniqueIdentifier,
	scheduleOfDate: ScheduleOfDate,
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

export const ScheduleGridLane = ({ id, scheduleOfDate }: Props) => {
	const { setNodeRef } = useDroppable({ id, });
	return (
		<div
			style={gridLaneStyle}
			ref={setNodeRef}
		>
			{scheduleOfDate.schedules !== null && scheduleOfDate.schedules.map(schedule => {
				return <ScheduleItem
					uid={schedule.uid.toString()}
					title={schedule.title}
					parent={id.toString()}
					key={schedule.uid}
				/>
			})}
		</div>
	)
}
