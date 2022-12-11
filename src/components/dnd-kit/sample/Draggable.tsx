import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Transform } from '@dnd-kit/utilities'

type Props = {
	children?: ReactNode
}

type Coordinate = {
	x: number,
	y: number
}

export const Draggable = ({ children }: Props) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: 'draggable',
	});

	// 配置を保存しておくためのstate
	const [elementPosition, setElementPosition] = useState<Coordinate>({ x: 0, y: 0 });
	const [dragDistance, setDragDistance] = useState<Coordinate>({ x: 0, y: 0 });

	useEffect(() => {
		if (transform) {
			const diffX = transform.x - dragDistance.x;
			const diffY = transform.y - dragDistance.y;
			setDragDistance({ x: transform.x, y: transform.y });
			setElementPosition(({ x, y }) => ({ x: x + diffX, y: y + diffY }));
		}
		else {
			setDragDistance({ x: 0, y: 0 });
		}
	}, [transform]);

	const style: CSSProperties = {
		background: '#222',
		padding: 16,
		display: 'inline-block',
		borderRadius: 8,
		transform: `translate3d(${elementPosition.x}px, ${elementPosition.y}px, 0)`,
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			{children}
		</div>
	);
}
