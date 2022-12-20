/**
 * 予定の開始時刻から、scheduleを表示する位置を算出する
 * 0時0分が0で、15分開始時刻が遅くなるごとに16増加する
 * 開始時刻が0より小さい場合、0を返す
 * 
 * @param startTime 予定の開始時刻
 */
export const calcTopPixel = (startTime: number) => {
	if (startTime < 0) {
		return 0;
	}
	return Math.round(startTime / 15) * 16;
}

/**
 * 予定の開始時刻と終了時刻から、scheduleの要素の高さを算出する
 * 予定の時間15分につき16増加する
 * 
 * @param startTime 予定の開始時刻
 * @param endTime 予定の終了時刻
 */
export const calcHightPixel = (startTime: number, endTime: number) => {
	if (startTime >= endTime) {
		return 16;
	}
	return Math.round((endTime - startTime) / 15) * 16;
}

/**
 * ピクセル数から、分数を算出する
 * 16ピクセルにつき15分増加する
 * 
 * @param pixel 移動したピクセル数
 * @returns minute 時間
 */
export const pixelToMinute = (pixel: number) => {
	return Math.floor(pixel / 16) * 15;
}
