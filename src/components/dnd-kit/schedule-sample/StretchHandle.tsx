import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";

const stretchHandleStyle: CSSProperties = {
	width: '100%',
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	cursor: 'n-resize',
	height: 12,
};

type StretchHandleProps = {
	type?: 'start' | 'end',
	parent: UniqueIdentifier,
}

export const StretchHandle = ({
	type = 'start',
	parent,
}: StretchHandleProps) => {
	// useDraggable() で、ドラッグ操作対象のコンポーネントとして扱うための要素を生成する
	const {
		isDragging, // 要素がドラッグ中かどうかを判定するboolean
		attributes, // アクセシビリティ対応のために、DOMに追加する情報
		listeners, // ドラッグ操作時のイベントリスナー
		setNodeRef, // DOM とdnd-kit の処理を関連付けするためのref
		transform // ドラッグ可能なDOM要素の位置とスケールの値を保持するためのオブジェクト
	} = useDraggable({
		id: `${parent}-${type}`, // schedule のID + ハンドルのtype で識別
		data: { // data オブジェクトに定義したプロパティは、ドラッグ操作のイベントハンドラで利用できる
			type,
			parent,
		},
	});

	const style: CSSProperties = {
		position: 'absolute',
		top: (type === 'start') ? 0 : undefined,
		bottom: (type === 'end') ? 0 : undefined,
		// transform: CSS.Translate.toString(transform),
	}

	return (
		<div
			style={{ ...stretchHandleStyle, ...style }}
			{...listeners}
			{...attributes}
			ref={setNodeRef}
		/>
	);
}
