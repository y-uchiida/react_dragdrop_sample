import { Button, Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DeleteIcon } from '@chakra-ui/icons'

type Props = {
	uid: string,
	title: string;
	parent: string;
	removeCard: Function;
}

export const KanbanCard = ({
	uid, // タスクの固有識別子(uuid)
	title, // タスクのタイトル
	parent, // どのレーンに配置するかを、KanbanLane のid で指定する
	removeCard,
}: Props) => {
	// useDraggable() で、ドラッグ操作対象のコンポーネントとして扱うための要素を生成する
	const {
		attributes, // アクセシビリティ対応のために、DOMに追加する情報
		listeners, // ドラッグ操作時のイベントリスナー
		setNodeRef, // DOM とdnd-kit の処理を関連付けするためのref
		transform // ドラッグ可能なDOM要素の位置とスケールの値を保持するためのオブジェクト
	} = useDraggable({
		id: uid,
		data: { // data オブジェクトに定義したプロパティは、ドラッグ操作のイベントハンドラで利用できる
			uid,
			title,
			parent,
		},
	});

	const style: React.CSSProperties = {
		// dnd-kit が提供するCSS utility を使って、css 用に値を文字列にコンバートする
		transform: CSS.Translate.toString(transform),

		// タッチデバイスのスクロールの動作と干渉を防ぐため、noneにしておく
		touchAction: 'none'
	};

	const handleDeleteButtonClick = (uid: string) => {
		removeCard(uid);
	}

	return (
		<Flex
			padding="3"
			backgroundColor="white"
			margin="2"
			borderRadius="8"
			alignItems='center'
			justifyContent='space-between'
			border="2px solid gray.500"
			boxShadow="0px 0px 5px 2px #2121213b"
			transform={style.transform} // ドラッグ操作による位置変更を反映するため、transform 属性に値を渡す
			{...listeners}
			{...attributes}
			ref={setNodeRef}
		>
			<Text>{title}</Text>
			<Button data-dnd-disabled='true' onClick={() => handleDeleteButtonClick(uid)} size='sm'>
				<DeleteIcon></DeleteIcon>
			</Button>
		</Flex>
	);
};
