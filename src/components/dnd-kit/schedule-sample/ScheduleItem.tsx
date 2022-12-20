import { CSSProperties, useState } from "react";
import { DndContext, DragCancelEvent, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, useDraggable } from "@dnd-kit/core";
import styled from '@emotion/styled';
import { StretchHandle } from "./StretchHandle";
import {
	createSnapModifier,
	restrictToVerticalAxis
} from "@dnd-kit/modifiers";
import { calcHightPixel, calcTopPixel } from "./utils/schedulePositionCalc";
import { Schedule } from "./types";


const gridSize = 16; // pixels
const snapToGridModifier = createSnapModifier(gridSize);

type Props = {
	uid: string,
	title: string,
	parent: string,
	startTime: number,
	endTime: number,
	setSchedules: (value: React.SetStateAction<Schedule[]>) => void
}

const scheduleItemStyle: CSSProperties = {
	background: '#666',
	userSelect: 'none',
	position: 'absolute',
	width: '100%'
}

type ScheduleItemElmProps = {
	startTime: number,
	endTime: number,
}

const ScheduleItemElm = styled.div<ScheduleItemElmProps>`
	position: absolute;
	top: ${props => { return `${calcTopPixel(props.startTime)}px` }};
	height: ${props => { return `${calcHightPixel(props.startTime, props.endTime)}px` }};
`;

const calcStretchTime = (e: DragMoveEvent) => {
	const start = e.active.data.current?.type === 'start' ? e.delta.y : 0;
	const end = e.active.data.current?.type === 'end' ? e.delta.y : 0;
	return { start, end };
}

export const ScheduleItem = ({
	uid, // タスクの固有識別子(uuid)
	title, // タスクのタイトル
	parent, // どのレーンに配置するか
	startTime, // 予定の開始時間
	endTime, // 終了時間
	setSchedules
}: Props) => {

	// useDraggable() で、ドラッグ操作対象のコンポーネントとして扱うための要素を生成する
	const {
		isDragging, // 要素がドラッグ中かどうかを判定するboolean
		attributes, // アクセシビリティ対応のために、DOMに追加する情報
		listeners, // ドラッグ操作時のイベントリスナー
		setNodeRef, // DOM とdnd-kit の処理を関連付けするためのref
		transform // ドラッグ可能なDOM要素の位置とスケールの値を保持するためのオブジェクト
	} = useDraggable({
		id: uid,
		data: { // data オブジェクトに定義したプロパティは、ドラッグ操作のイベントハンドラで利用できる
			uid,
			title,
			parent,
			startTime,
			endTime,
		},
	});

	const style: CSSProperties = {
		// dnd-kit が提供するCSS utility を使って、css 用に値を文字列にコンバートする
		// transform: CSS.Translate.toString(transform),

		// タッチデバイスのスクロールの動作と干渉を防ぐため、noneにしておく
		touchAction: 'none',

		// ドラッグ中は要素透過度を上げる
		opacity: isDragging ? 0.5 : undefined,
	};

	const [stretchingTime, setStretchingTime] = useState({ start: 0, end: 0 });

	/**
	 * ドラッグ終了時のスケジュールの時間が適切かどうかを判定する
	 * 以下の場合は不適切な値として、false を返す
	 * 終了時刻が開始時刻よりも前の時間になっているとき
	 * 開始時刻・終了時刻が0時より小さいとき
	 * 開始時刻・終了時刻が24時より大きいとき
	 * 
	 * @returns boolean
	 */
	const shouldChangeScheduleTime = (): boolean => {
		const updatedStartTime = startTime + stretchingTime.start;
		const updatedEndTime = endTime + stretchingTime.end;
		if (updatedStartTime < 0 || updatedEndTime < 0) {
			return false;
		}
		if (updatedStartTime > 24 * 60 || updatedEndTime > 24 * 60) {
			return false;
		}
		if (updatedStartTime > updatedEndTime) {
			return false;
		}
		return true;
	};

	/**
	 * スケジュールの開始時刻、終了時刻を更新する
	 */
	const updateScheduleTime = () => {
		const updatedStartTime = startTime + stretchingTime.start;
		const updatedEndTime = endTime + stretchingTime.end;
		setSchedules(schedules => {
			return schedules.map(schedule => {
				if (schedule.uid == uid) {
					schedule.startTime = updatedStartTime;
					schedule.endTime = updatedEndTime;
				}
				return schedule;
			});
		});
	}

	/** ドラッグ開始時に発火するイベントのハンドラ */
	const dragStartHandler = (e: DragStartEvent) => {
	};

	/** ドラッグのたびに発火するイベントのハンドラ */
	const dragMoveHandler = (e: DragMoveEvent) => {
		setStretchingTime(calcStretchTime(e));
	};

	/** ドラッグ終了時に発火するイベントのハンドラ */
	const dragEndHandler = (e: DragEndEvent) => {
		if (shouldChangeScheduleTime()) {
			updateScheduleTime();
		}
		setStretchingTime({ start: 0, end: 0 });
	};

	/** ドラッグキャンセル時に発火するイベントのハンドラ */
	const dragCancelHandler = (e: DragCancelEvent) => {
		setStretchingTime({ start: 0, end: 0 });
	};

	return (
		<DndContext
			modifiers={[snapToGridModifier, restrictToVerticalAxis]}
			onDragStart={dragStartHandler}
			onDragMove={dragMoveHandler}
			// onDragOver={dragOver}
			onDragEnd={dragEndHandler}
			onDragCancel={dragCancelHandler}
		>
			<ScheduleItemElm
				style={{ ...scheduleItemStyle, ...style }} // ドラッグ操作による位置変更を反映するため、transform 属性に値を渡す
				{...listeners}
				{...attributes}
				ref={setNodeRef}
				startTime={startTime + stretchingTime.start}
				endTime={endTime + stretchingTime.end}
			>
				<p style={{ height: 0 }}>{title}</p>
				{true && <>
					<StretchHandle
						type='start'
						parent={uid}
					/>
					<StretchHandle
						type='end'
						parent={uid}
					/>
				</>}
			</ScheduleItemElm>
			{/* <DragOverlay
				modifiers={[snapToGridModifier, restrictToVerticalAxis]}
			>

				<ScheduleItemOverlay
					startTime={startTime + stretchingTime.start}
					endTime={endTime + stretchingTime.end}
					title={title}
				/>

			</DragOverlay> */}
		</DndContext>
	)
}
