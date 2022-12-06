import { useEffect, useMemo, useState } from "react";
import { ChessBoard } from "./ChessBoard";
import { observe } from "./Game";
import { KnightPosition } from "./types";

export const ChessApp = () => {
	const [knightPosition, setKnightPosition] = useState<KnightPosition>([3, 0]);
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


	return chessBoard;
};
