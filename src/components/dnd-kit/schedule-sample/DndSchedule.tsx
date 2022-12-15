import { Spacer } from './atoms/Spacer'
import { DndContext, DragOverlay } from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	createSnapModifier,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { CSSProperties } from 'react';
import { ScheduleGridLane } from './ScheduleGridLane';
import { ScheduleGutter } from './ScheduleGutter';
import { ScheduleHeader } from './ScheduleHeader';

const gridSize = 16; // pixels
const snapToGridModifier = createSnapModifier(gridSize);

const scheduleWrapperStyle: CSSProperties = {
	background: '#333',
	width: '100%',
}

const scheduleGridStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
}

export const DndSchedule = () => {
	return (
		<DndContext modifiers={[snapToGridModifier]}>
			<div style={scheduleWrapperStyle}>
				<ScheduleHeader />
				<div style={scheduleGridStyle}>
					<Spacer width={28} />
					<ScheduleGutter />
					{[...new Array(7).keys()].map((i) => {
						return <ScheduleGridLane key={i} id={i} />
					})}
				</div>
				<DragOverlay modifiers={[restrictToWindowEdges]}>
				</DragOverlay>
			</div>
		</DndContext>
	)
}
