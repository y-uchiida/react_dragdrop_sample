import { useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChessBoard } from "./ChessBoard";
import { observe, knightPosition as initialPosition } from "./Game";
import { KnightPosition } from "./types";

export const ChessApp = () => {
	const [knightPosition, setKnightPosition] = useState<KnightPosition>(initialPosition);
	const [chessBoard, setChessBoard] = useState<JSX.Element>(<></>);

	const observer = useMemo(() => {
		return (newPos: KnightPosition) => {
			setKnightPosition(newPos);
		};
	}, []);

	useEffect(() => {
		observe(observer);
	}, [])

	useEffect(() => {
		setChessBoard(<ChessBoard knightPosition={knightPosition} />);
	}, [knightPosition]);


	return (
		<DndProvider backend={HTML5Backend}>
			{chessBoard}
		</DndProvider>
	);
};
