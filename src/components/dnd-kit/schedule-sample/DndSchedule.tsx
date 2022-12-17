import { Spacer } from './atoms/Spacer'
import { DndContext, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	createSnapModifier,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { CSSProperties, useState } from 'react';
import { ScheduleGridLane } from './ScheduleGridLane';
import { ScheduleGutter } from './ScheduleGutter';
import { ScheduleHeader } from './ScheduleHeader';

const gridSize = 16; // pixels
const snapToGridModifier = createSnapModifier(gridSize);

const scheduleWrapperStyle: CSSProperties = {
	background: '#333',
	width: '100%',
	height: 'calc(100vh - 280px)',
}

const scheduleGridStyle: CSSProperties = {
	display: 'flex',
	position: 'relative',
	flexDirection: 'row',
	width: '100%',
	overflowY: 'scroll',
	height: 'calc(100vh - 321px)'
}

const dndInfoBoxStyle = {
	height: 184,
	marginBottom: 16,
	background: '#444',
	border: '1px solid #999',
	padding: 8
}

export const DndSchedule = () => {

	const [droppedContainer, setDroppedContainer] = useState<UniqueIdentifier | undefined>();
	const [dragItemId, setDragItemId] = useState<string | undefined>();
	const [dragItemTitle, setDragItemTitle] = useState<string | undefined>();
	const [dragItemParent, setDragItemParent] = useState<string | undefined>();

	return (
		<DndContext
			modifiers={[snapToGridModifier]}

			/* ドラッグのたびに発火するするイベントのハンドラ */
			onDragMove={(e) => {
				setDroppedContainer(e.over?.id);
				setDragItemId(e.active.data.current?.uid);
				setDragItemTitle(e.active.data.current?.title);
				setDragItemParent(e.active.data.current?.parent);
			}}


			/* ドラッグ終了時のイベントハンドラ */
			onDragEnd={(e) => { }}
		>
			<div style={dndInfoBoxStyle}>
				<p>dragItemId: {dragItemId?.toString()}</p>
				<p>droppedContainer: {droppedContainer?.toString()}</p>
				<p>dragItemTitle: {dragItemTitle?.toString()}</p>
				<p>dragItemParent: {dragItemParent?.toString()}</p>
			</div>
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
