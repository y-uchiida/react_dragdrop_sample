import { zeroPadding } from "./commonFunctions";

/**
 * 0時0分からの経過分数をとり、hour(時)とminute(分)を返す
 */
export const getTimeByMinutes = (minutes: number): { hour: number, minute: number } => {
	const hour = Math.floor(minutes / 60);
	const minute = minutes % 60;
	return { hour, minute };
};

/**
 * 0時0分からの経過分数をとり、hour(時)とminute(分)をつなげた文字列を返す
 */
export const getTimeStringByMinutes = (minutes: number): string => {
	const { hour, minute } = getTimeByMinutes(minutes);
	return zeroPadding(hour, 2) + ':' + zeroPadding(minute, 2);
}
