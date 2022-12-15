import { DndContext, DragOverlay } from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	createSnapModifier,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { CSSProperties } from 'react';
import { ScheduleGridLane } from './ScheduleGridLane';
import { ScheduleGutter } from './ScheduleGutter';

const gridSize = 16; // pixels
const snapToGridModifier = createSnapModifier(gridSize);

const scheduleGridStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	background: '#333',
	width: '100%',
}

export const DndSchedule = () => {
	return (
		<DndContext modifiers={[snapToGridModifier]}>
			<div style={scheduleGridStyle}>
				<ScheduleGutter />
				{[...new Array(7).keys()].map((i) => {
					return <ScheduleGridLane key={i} id={i} />
				})}
				<DragOverlay modifiers={[restrictToWindowEdges]}>
				</DragOverlay>
			</div>
		</DndContext>
	)
}
