import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { canMoveKnight, moveKnight } from "./Game";
import { ItemTypes } from "./ItemTypes";
import Overlay from "./Overlay";
import { Square } from "./Square";

const boardSquareStyle: React.CSSProperties = {
	position: 'relative',
	width: '100%',
	height: '100%',
};

const overlayStyle: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',
	zIndex: 1,
	opacity: 0.5,
	backgroundColor: 'yellow',
}

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
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		canDrop: () => canMoveKnight([x, y]), // ドロップできるかどうかを判定する関数として、canDrop() を作成
		collect: monitor => ({
			isOver: !!monitor.isOver(), // isOver は、ドロップターゲット上にドラッグ中のオブジェクトがあるかどうかを判定する
			canDrop: !!monitor.canDrop() // monitor 経由でcanDrop を呼び出して、collection オブジェクト(返り値の配列の第一要素)に渡す
		}),
		accept: ItemTypes.KNIGHT, // dropを受け入れることができるドラッグオブジェクトのtype
		drop: () => moveKnight([x, y]), // 要素がドロップされたときに実行するコールバック関数
	}), [x, y]);

	const black = (x + y) % 2 === 1;

	return (
		<div
			ref={drop}
			style={boardSquareStyle}
		>
			{/* ドロップできるかによって、マスの色を変える */}
			{isOver && !canDrop && <Overlay color="red" />}
			{!isOver && canDrop && <Overlay color="yellow" />}
			{isOver && canDrop && <Overlay color="blue" />}
			<Square black={black}>{children}</Square>
		</div>
	)
}
