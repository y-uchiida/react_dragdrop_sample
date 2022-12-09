import React from 'react'
import { DndProvider, useDragLayer, XYCoord } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BoardSquare } from './BoardSquare'
import { Piece } from './Piece'
import { KnightPosition } from './types'

type Props = {
	knightPosition: KnightPosition
}

const wrapperStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
}

const monitorBoxStyle: React.CSSProperties = {
	background: '#ffffff',
	border: '1px solid #333',
	color: '#333',
	textAlign: 'left',
	padding: '8px',
	width: '500px'
}

const squareStyle: React.CSSProperties = {
	width: '12.5%',
	height: '12.5%',
};

const boardStyle: React.CSSProperties = {
	width: 500,
	height: 500,
	border: '1px solid gray',
	flexWrap: 'wrap',
	display: 'flex',
};

/**
 * チェス盤のマスの要素を生成する
 * @param i loop counter
 * @param KnightPosition ナイトの駒があるマス 
 * @returns ReactNode
 */
const generateChessSquare = (i: number, [knightX, knightY]: KnightPosition) => {
	const x = i % 8;
	const y = Math.floor(i / 8);

	return (
		<div key={i} style={squareStyle}>
			<BoardSquare x={x} y={y}>
				<Piece isKnight={knightX === x && knightY === y} />
			</BoardSquare>
		</div>
	);
}

/**
 * 
 * @param param0 
 * @returns 
 */
const showXYCoordValue = (coord: XYCoord | null) => {
	return coord ? `[${coord.x}, ${coord.y}]` : '';
}

const ChessBoard = ({ knightPosition }: Props) => {
	// DragLayer で、ドラッグ状況を取得できる
	const {
		isDragging,
		itemType,
		initialClientOffset,
		initialSourceClientOffset,
		clientOffset,
		differenceFromInitialOffset,
		sourceClientOffset,
	} = useDragLayer(monitor => ({
		isDragging: monitor.isDragging(),
		itemType: monitor.getItemType(),
		initialClientOffset: monitor.getInitialClientOffset(),
		initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
		clientOffset: monitor.getClientOffset(),
		differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
		sourceClientOffset: monitor.getSourceClientOffset()
	}));

	const squares = Array.from(new Array(64), (_, i) => generateChessSquare(i, knightPosition));
	return (
		<div style={wrapperStyle}>
			<div style={monitorBoxStyle}>
				<p>isDragging: {isDragging ? 'true' : 'false'}</p>
				<p>itemType : {itemType?.toString()}</p>
				<p>initialClientOffset: {showXYCoordValue(initialClientOffset)}</p>
				<p>initialSourceClientOffset: {showXYCoordValue(initialSourceClientOffset)}</p>
				<p>clientOffset: {showXYCoordValue(clientOffset)}</p>
				<p>differenceFromInitialOffset: {showXYCoordValue(differenceFromInitialOffset)}</p>
				<p>sourceClientOffset: {showXYCoordValue(sourceClientOffset)}</p>
			</div>
			<div style={boardStyle}>
				{squares}
			</div>
		</div>
	);
}

export { ChessBoard }
