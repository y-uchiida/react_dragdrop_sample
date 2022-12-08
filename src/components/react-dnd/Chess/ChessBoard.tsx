import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BoardSquare } from './BoardSquare'
import { Piece } from './Piece'
import { KnightPosition } from './types'

type Props = {
	knightPosition: KnightPosition
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

const ChessBoard = ({ knightPosition }: Props) => {
	const squares = Array.from(new Array(64), (_, i) => generateChessSquare(i, knightPosition));
	return (
		<DndProvider backend={HTML5Backend}>
			<div style={boardStyle}>
				{squares}
			</div>
		</DndProvider>
	);
}

export { ChessBoard }
