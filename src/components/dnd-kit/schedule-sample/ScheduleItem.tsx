import { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styled from '@emotion/styled';

type Props = {
	uid: string,
	title: string,
	parent: string,
	startTime: number,
	endTime: number,
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

/**
 * 予定の開始時刻から、scheduleを表示する位置を算出する
 * 0時0分が0で、15分開始時刻が遅くなるごとに16増加する
 * 開始時刻が0より小さい場合、0を返す
 * 
 * @param startTime 予定の開始時刻
 */
const calcTopPixel = (startTime: number) => {
	if (startTime < 0) {
		return 0;
	}
	return Math.round(startTime / 15) * 16;
}

/**
 * 予定の開始時刻と終了時刻から、scheduleの要素の高さを算出する
 * 予定の時間15分につき16増加する
 * 
 * @param startTime 予定の開始時刻
 * @param endTime 予定の終了時刻
 */
const calcHightPixel = (startTime: number, endTime: number) => {
	if (startTime >= endTime) {
		return 16;
	}
	return Math.round((endTime - startTime) / 15) * 16;
}

const ScheduleItemElm = styled.div<ScheduleItemElmProps>`
	position: absolute;
	top: ${props => { return `${calcTopPixel(props.startTime)}px` }};
	height: ${props => { return `${calcHightPixel(props.startTime, props.endTime)}px` }};
`;


export const ScheduleItem = ({
	uid, // タスクの固有識別子(uuid)
	title, // タスクのタイトル
	parent, // どのレーンに配置するか
	startTime, // 予定の開始時間
	endTime, // 終了時間
}: Props) => {

	// useDraggable() で、ドラッグ操作対象のコンポーネントとして扱うための要素を生成する
	const {
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
		},
	});

	const style: CSSProperties = {
		// dnd-kit が提供するCSS utility を使って、css 用に値を文字列にコンバートする
		transform: CSS.Translate.toString(transform),

		// タッチデバイスのスクロールの動作と干渉を防ぐため、noneにしておく
		touchAction: 'none'
	};

	return (
		<ScheduleItemElm
			style={{ ...scheduleItemStyle, ...style }} // ドラッグ操作による位置変更を反映するため、transform 属性に値を渡す
			{...listeners}
			{...attributes}
			ref={setNodeRef}
			startTime={startTime}
			endTime={endTime}
		>
			{title}
		</ScheduleItemElm>
	)
}
