import { CSSProperties } from "react";

const stretchHandleStyle: CSSProperties = {
	width: '100%',
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	cursor: 'n-resize',
	height: 12
};

type StretchHandleProps = {
	type?: 'start' | 'end'
}

export const StretchHandle = ({
	type = 'start'
}: StretchHandleProps) => {
	const style = {
		top: (type === 'start') ? 0 : undefined,
		bottom: (type === 'end') ? 0 : undefined,
	}
	return (
		<div style={{ ...stretchHandleStyle, ...style }}></div >
	);
}
