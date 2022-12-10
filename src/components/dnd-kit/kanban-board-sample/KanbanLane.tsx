import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { Card } from "./types";

interface KanbanLaneProps {
	title: string;
	items: Card[]; // 表示するタスクの一覧
}

export const KanbanLane = ({ title, items }: KanbanLaneProps) => {
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
				{items.map((item, key) => (
					<KanbanCard title={item.title} key={key} index={key} parent={title} />
				))}
			</Flex>
		</Flex>
	);
}
