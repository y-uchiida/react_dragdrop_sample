import React from 'react'
import { moveKnight } from './Game'
import { Knight } from './Knight'
import { Square } from './Square'
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

const handleSquareClick = ([x, y]: KnightPosition) => {
	moveKnight([x, y]);
};

/**
 * チェス盤の要素を生成する
 * @param i loop counter
 * @param KnightPosition ナイトの駒があるマス 
 * @returns ReactNode
 */
const generateChessBoard = (i: number, [knightX, knightY]: KnightPosition) => {
	const x = i % 8;
	const y = Math.floor(i / 8);
	const black = (x + y) % 2 === 1;
	const isKnightHere = knightX === x && knightY === y;
	const piece = isKnightHere ? <Knight /> : null;
	return (
		<div key={i} style={squareStyle} onClick={() => handleSquareClick([x, y])}>
			<Square black={black}>{piece}</Square>
		</div>
	);
}

const ChessBoard = ({ knightPosition }: Props) => {
	const squares = [];
	for (let i = 0; i < 64; i++) {
		squares.push(generateChessBoard(i, knightPosition));
	}
	return (
		<div style={boardStyle}>
			{squares}
		</div>
	);
}

export { ChessBoard }
