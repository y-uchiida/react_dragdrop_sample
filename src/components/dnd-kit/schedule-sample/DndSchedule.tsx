import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  createSnapModifier,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { CSSProperties, useState } from 'react';
import { ScheduleGridLane } from './ScheduleGridLane';
import { ScheduleGutter } from './ScheduleGutter';
import { ScheduleHeader } from './ScheduleHeader';
import { Schedule, ScheduleOfDate } from './types';
import { initialScheduleOfDate, initialSchedules } from './data/Schedules';

const gridSize = 16; // pixels
const snapToGridModifier = createSnapModifier(gridSize);

const scheduleWrapperStyle: CSSProperties = {
  background: '#333',
  width: '100%',
  height: 'calc(100vh - 280px)',
};

const scheduleGridStyle: CSSProperties = {
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  width: '100%',
  overflowY: 'scroll',
  height: 'calc(100vh - 321px)',
};

const dndInfoBoxStyle = {
  height: 184,
  marginBottom: 16,
  background: '#444',
  border: '1px solid #999',
  padding: 8,
};

export function DndSchedule() {
  const [dragMoveEvent, setDragMoveEvent] = useState<DragMoveEvent>();

  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [scheduleOfDates, setScheduleOfDates] = useState<ScheduleOfDate[]>(initialScheduleOfDate);

  /** ドラッグ開始時のイベントハンドラ */
  const dragStartHandler = (e: DragStartEvent) => {

  };

  /** ドラッグのたびに発火するするイベントのハンドラ */
  const dragMoveHandler = (e: DragMoveEvent) => {
    setDragMoveEvent(e);
  };

  /** D&D終了時、予定を別の日付(Lane)に移動すべきかどうかを判定する */
  const shouldMoveLane = (e: DragEndEvent) => {
    if (
      e.active.data.current?.parent === undefined
			|| e.over?.id === undefined) {
      return false;
    }
    if (e.active.data.current?.parent == e.over?.id) {
      return false;
    }
    return true;
  };

  /**
	 * ドラッグ操作に合わせて、スケジュールの開始時刻・終了時刻を変更する
	 * @param e DragEndEvent
	 */
  const updateScheduleTime = (e: DragEndEvent) => {
    const draggedSchedule = schedules.find((schedule) => schedule.uid == e.active.data.current?.uid);
    if (draggedSchedule) {
      // ドラッグ操作での時刻変化量を分で表現
      const moveAmountTime = (e.delta.y / 16) * 15;
      // const startTime = getTimeByMinutes(draggedSchedule.startTime);
      // const changedStartTime = getTimeByMinutes(draggedSchedule.startTime + moveAmountTime);
      // console.log('startTime: ', `${startTime.hour}:${startTime.minute}`);
      // console.log('moveAmountTime: ', moveAmountTime);
      // console.log('changedStartTime: ', `${changedStartTime.hour}:${changedStartTime.minute}`);
      setSchedules((schedules) =>
      // console.log('exec setSchedules()');
      // console.log(draggedSchedule)
        schedules.map((schedule) => {
          if (schedule.uid == draggedSchedule.uid) {
            // console.log('match schedule id');
            schedule.startTime = draggedSchedule.startTime + moveAmountTime;
            schedule.endTime = draggedSchedule.endTime + moveAmountTime;
          }
          return schedule;
        }));
    }
  };

  /**
	 * ドラッグ操作に合わせて、スケジュールの日付を変更する
	 * @param e DragEndEvent
	 */
  const updateScheduleDate = (e: DragEndEvent) => {
    const destDateId = Number(e.over!.id);
    setScheduleOfDates(((scheduleOfDates) => {
      // 1. 元の日付からschedule itemを消す
      scheduleOfDates = scheduleOfDates.map((scheduleOfDate) => ({
        uid: scheduleOfDate.uid,
        schedules: scheduleOfDate.schedules
          ? scheduleOfDate.schedules.filter((schedule) => schedule.uid != e.active.data.current!.uid) : [],
      }));
      // 2. 移動先の日付にschedule itemを追加
      const draggedSchedule = schedules.find((schedule) => schedule.uid == e.active.data.current?.uid);
      if (draggedSchedule) {
        scheduleOfDates[destDateId].schedules?.push(draggedSchedule);
        setSchedules((schedules) => schedules.map((schedule) => {
          if (schedule.uid == draggedSchedule.uid) {
            schedule.date = destDateId;
          }
          return schedule;
        }));
      }
      return scheduleOfDates;
    }));
  };

  /** ドラッグ終了時のイベントハンドラ */
  const dragEndHandler = (e: DragEndEvent) => {
    // console.log(e.delta.y);
    updateScheduleTime(e);
    if (shouldMoveLane(e)) {
      updateScheduleDate(e);
    }
    clearDragStates();
  };

  /**
	 * ドラッグの状態を管理するためのstateをクリアする
	 */
  const clearDragStates = () => {
    setDragMoveEvent(undefined);
  };

  /**
	 * ドラッグ操作がキャンセルされたときのイベントハンドラ
	 * ドラッグの状態を管理するために使っていたstateをクリアする
	 */
  const dragCancelHandler = () => {
    clearDragStates();
  };

  /** ドラッグ中の要素が別のDroppable 要素に入ったときのイベントハンドラ */
  const dragOver = () => {
    // console.log('onDragOver triggered');
  };

  /**
	 * 0時0分からの経過分数をとり、hour(時)とminute(分)を返す
	 */
  const getTimeByMinutes = (minutes: number): { hour: number, minute: number } => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    return { hour, minute };
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
        <p>
          dragItemId:
          {dragMoveEvent?.active.data.current?.uid.toString()}
        </p>
        <p>
          droppedContainer:
          {dragMoveEvent?.over?.id.toString()}
        </p>
        <p>
          dragItemTitle:
          {dragMoveEvent?.active.data.current?.title.toString()}
        </p>
        <p>
          dragItemParent:
          {dragMoveEvent?.active.data.current?.parent?.toString()}
        </p>
        <p>
          moveX:
          {dragMoveEvent?.delta.x}
        </p>
        <p>
          moveY:
          {dragMoveEvent?.delta.y}
        </p>
      </div>
      <div style={scheduleWrapperStyle}>
        <ScheduleHeader />
        <div style={scheduleGridStyle}>
          <ScheduleGutter />
          {[...new Array(7).keys()].map((i) => <ScheduleGridLane key={i} id={i} scheduleOfDate={scheduleOfDates[i]} />)}
        </div>
        <DragOverlay modifiers={[restrictToWindowEdges]} />
      </div>
    </DndContext>
  );
}
