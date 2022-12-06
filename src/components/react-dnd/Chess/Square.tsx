import { ReactNode } from "react";

const squareStyle = {
	width: '100%',
	height: '100%',
};

type Props = {
	black: boolean,
	children: ReactNode
}

const Square = ({ black, children }: Props) => {
	const fill = black ? 'black' : 'white';
	const stroke = black ? 'white' : 'black';

	return (
		<div
			style={{
				...squareStyle,
				backgroundColor: fill,
				color: stroke,
			}}
		>
			{children}
		</div>
	);
};

export { Square };
