import React, { CSSProperties, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = {
	children?: ReactNode
}

const WrapperStyle: CSSProperties = {
	background: '#444',
	width: 640,
	height: 720,
	padding: 16,
	display: 'flex',
	flexDirection: 'column',
};

const innerWrapperStyle: CSSProperties = {
	background: '555',
	flexGrow: 1
};

export const Droppable = ({ children }: Props) => {
	const { setNodeRef } = useDroppable({
		id: 'droppable',
	});


	return (
		<div style={WrapperStyle}>
			<h3>move around in droppable area</h3>
			<div ref={setNodeRef} style={innerWrapperStyle}>
				{children}
			</div>
		</div>
	);
}
