import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { ScheduleItem } from "./ScheduleItem";

type Props = {
	id: number
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

export const ScheduleGridLane = ({ id }: Props) => {
	const { setNodeRef } = useDroppable({ id, });
	return (
		<div
			style={gridLaneStyle}
			ref={setNodeRef}
		>
			<ScheduleItem
				uid={id.toString()}
				title='schedule'
				parent={id.toString()}
			></ScheduleItem>
		</div>
	)
}