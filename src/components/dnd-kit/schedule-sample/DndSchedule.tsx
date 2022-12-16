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
	height: 'calc(100vh - 80px)',
}

const scheduleGridStyle: CSSProperties = {
	display: 'flex',
	position: 'relative',
	flexDirection: 'row',
	width: '100%',
	overflowY: 'scroll',
	height: 'calc(100vh - 120px)'
}

export const DndSchedule = () => {
	return (
		<DndContext
			modifiers={[snapToGridModifier]}
		>
			<div style={scheduleWrapperStyle}>
				<ScheduleHeader />
				<div style={scheduleGridStyle}>
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
