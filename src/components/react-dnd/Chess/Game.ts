import { KnightPosition } from "./types";


let observer: ([x, y]: KnightPosition) => void;

const emitChange = ([x, y]: KnightPosition) => {
	if (observer !== undefined) {
		observer([x, y]);
	}
}

export const observe = (o: ([x, y]: KnightPosition) => void) => {
	observer = o;
};

export const moveKnight = ([toX, toY]: KnightPosition) => {
	return emitChange([toX, toY]);
}
