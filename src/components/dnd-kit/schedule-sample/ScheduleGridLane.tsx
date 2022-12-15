import { background } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { ScheduleItem } from "./ScheduleItem";
import { v4 as uuid } from 'uuid';


type Props = {
	id: number
}

const gridLaneStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
	height: 16 * 4 * 24,
	zIndex: 1
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
