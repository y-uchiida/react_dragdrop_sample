import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { moveKnight } from "./Game";
import { ItemTypes } from "./ItemTypes";
import { Square } from "./Square";

const boardSquareStyle: React.CSSProperties = {
	position: 'relative',
	width: '100%',
	height: '100%',
};

type Props = {
	x: number,
	y: number,
	children: ReactNode
}

export const BoardSquare = ({ x, y, children }: Props) => {

	// ドロップ操作を処理するためのhooks, useDrop()
	// コールバック関数を引数に持ち、ドロップ操作に必要なデータを含めたオブジェクトを返す
	// useDrop() の返り値は配列で、第一要素にはcollect() 関数が収集した値が入ったオブジェクトを返す
	// 第二要素は connector() 関数で、これによってドロップ先オブジェクトと対象のDOMを関連づけする
	// ドロップターゲットのJSXノードのref プロパティに、drag を渡す
	const [, drop] = useDrop(() => ({
		accept: ItemTypes.KNIGHT, // dropを受け入れることができるドラッグオブジェクトのtype
		drop: () => moveKnight([x, y]), // 要素がドロップされたときに実行するコールバック関数
	}), [x, y]);

	const black = (x + y) % 2 === 1;

	return (
		<div
			ref={drop}
			style={boardSquareStyle}
		>
			<Square black={black}>{children}</Square>
		</div>
	)
}
