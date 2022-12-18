import { Spacer } from './atoms/Spacer'
import { CancelDrop, DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	createSnapModifier,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { CSSProperties, useState } from 'react';
import { ScheduleGridLane } from './ScheduleGridLane';
import { ScheduleGutter } from './ScheduleGutter';
import { ScheduleHeader } from './ScheduleHeader';
import { Schedule, ScheduleOfDate, } from './types';
import { initialScheduleOfDate, initialSchedules } from './data/Schedules';

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

	const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
	const [scheduleOfDates, setScheduleOfDates] = useState<ScheduleOfDate[]>(initialScheduleOfDate);


	/** ドラッグ開始時のイベントハンドラ */
	const dragStartHandler = (e: DragStartEvent) => {

	};

	/** ドラッグのたびに発火するするイベントのハンドラ */
	const dragMoveHandler = (e: DragMoveEvent) => {
		setDroppedContainer(e.over?.id);
		setDragItemId(e.active.data.current?.uid);
		setDragItemTitle(e.active.data.current?.title);
		setDragItemParent(e.active.data.current?.parent);
	};

	/** D&D終了時、予定を別の日付(Lane)に移動すべきかどうかを判定する */
	const shouldMoveLane = (e: DragEndEvent) => {
		if (
			e.active.data.current?.parent === undefined ||
			e.over?.id === undefined) {
			return false;
		}
		if (e.active.data.current?.parent == e.over?.id) {
			return false;
		}
		return true;
	}

	/** ドラッグ終了時のイベントハンドラ */
	const dragEndHandler = (e: DragEndEvent) => {
		if (shouldMoveLane(e)) {
			const destDateId = Number(e.over!.id);
			setScheduleOfDates((scheduleOfDates => {
				// 1. 元の日付からschedule itemを消す
				scheduleOfDates = scheduleOfDates.map(scheduleOfDate => {
					return {
						uid: scheduleOfDate.uid,
						schedules: scheduleOfDate.schedules ?
							scheduleOfDate.schedules.filter(schedule => schedule.uid != e.active.data.current!.uid) : []
					}
				});
				// 2. 移動先の日付にschedule itemを追加
				const draggedSchedule = schedules.find(schedule => schedule.uid == e.active.data.current?.uid);
				if (draggedSchedule) {
					scheduleOfDates[destDateId].schedules?.push(draggedSchedule);
					setSchedules(schedules => {
						return schedules.map(schedule => {
							if (schedule.uid == draggedSchedule.uid) {
								schedule.date = destDateId;
							}
							return schedule;
						})
					});
				}
				return scheduleOfDates;
			}));
		}
		clearDragStates();
	};

	/**
	 * ドラッグの状態を管理するためのstateをクリアする
	 */
	const clearDragStates = () => {
		setDroppedContainer(undefined);
		setDragItemId(undefined);
		setDragItemTitle(undefined);
		setDragItemParent(undefined);
	}

	/**
	 * ドラッグ操作がキャンセルされたときのイベントハンドラ
	 * ドラッグの状態を管理するために使っていたstateをクリアする
	 */
	const dragCancelHandler = () => {
		clearDragStates();
	};

	/** ドラッグ中の要素が別のDroppable 要素に入ったときのイベントハンドラ */
	const dragOver = (e: DragOverEvent) => {
		console.log('onDragOver triggered');
	};

	return (
		<DndContext
			modifiers={[snapToGridModifier]}
			onDragStart={dragStartHandler}
			onDragMove={dragMoveHandler}
			onDragOver={dragOver}
			onDragEnd={dragEndHandler}
			onDragCancel={dragCancelHandler}
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
						return <ScheduleGridLane key={i} id={i} scheduleOfDate={scheduleOfDates[i]} />
					})}
				</div>
				<DragOverlay modifiers={[restrictToWindowEdges]}>
				</DragOverlay>
			</div>
		</DndContext>
	)
}
