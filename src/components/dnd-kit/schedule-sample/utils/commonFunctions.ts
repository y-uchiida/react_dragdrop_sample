// NUM=値 LEN=桁数
export const zeroPadding = (num: number, length: number): string => {
	return (Array(length).join('0') + num).slice(-length);
}
