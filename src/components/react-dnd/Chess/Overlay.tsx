const overlayStyle: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',
	zIndex: 1,
	opacity: 0.5,
};

export type SquareColor = 'red' | 'blue' | 'yellow';

type Props = {
	color: SquareColor
}

const Overlay = ({ color }: Props) => {
	return (
		<div
			style={{
				...overlayStyle,
				backgroundColor: color,
			}}
		/>
	);
};
export default Overlay;
