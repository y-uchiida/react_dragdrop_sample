import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { Card } from "./types";

type KanbanLaneProps = {
	title: string;
	items: Card[]; // 表示するタスクの一覧
	removeCard: Function;
}

export const KanbanLane = ({ title, items, removeCard }: KanbanLaneProps) => {
	const { setNodeRef } = useDroppable({
		id: title, // 受け取ったtitle を、ドロップ先のIDとして利用する
	});
	return (
		<Flex flex="3" padding="5" flexDirection="column" minH="10rem">
			<Text fontWeight="bold">{title}</Text>
			<Flex
				ref={setNodeRef}
				backgroundColor="gray.200"
				borderRadius="8"
				flex="1"
				padding="2"
				flexDirection="column"
			>
				{items.map((item) => (
					<KanbanCard uid={item.uid} title={item.title} key={item.uid} parent={title} removeCard={removeCard} />
				))}
			</Flex>
		</Flex>
	);
}
