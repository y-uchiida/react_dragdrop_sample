import { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Props = {
	uid: string,
	title: string;
	parent: string;
}

const scheduleItemStyle: CSSProperties = {
	background: '#666',
	height: 16 * 2,
	userSelect: 'none',
}

export const ScheduleItem = ({
	uid, // タスクの固有識別子(uuid)
	title, // タスクのタイトル
	parent, // どのレーンに配置するか
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
		<div
			style={{ ...scheduleItemStyle, ...style }} // ドラッグ操作による位置変更を反映するため、transform 属性に値を渡す
			{...listeners}
			{...attributes}
			ref={setNodeRef}
		>
			{title}
		</div>
	)
}
