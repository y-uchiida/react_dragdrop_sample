import { KnightPosition } from "./types";

let observer: ([x, y]: KnightPosition) => void;

export let knightPosition: KnightPosition = [0, 0];

const emitChange = ([x, y]: KnightPosition) => {
	if (observer !== undefined) {
		knightPosition = [x, y];
		observer([x, y]);
	}
}

export const observe = (o: ([x, y]: KnightPosition) => void) => {
	observer = o;
};

export const moveKnight = ([toX, toY]: KnightPosition) => {
	return emitChange([toX, toY]);
}

export function canMoveKnight([toX, toY]: KnightPosition) {
	const [x, y] = knightPosition;
	const dx = toX - x;
	const dy = toY - y;
	return (
		(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
		(Math.abs(dx) === 1 && Math.abs(dy) === 2)
	);
}
