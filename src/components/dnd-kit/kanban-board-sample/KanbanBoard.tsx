import { DndContext, rectIntersection, UniqueIdentifier } from "@dnd-kit/core";
import { KanbanLane } from "./KanbanLane";
import { AddCard } from "./AddCard";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./types";
import { itemsEqual } from "@dnd-kit/sortable/dist/utilities";

const infoBoxStyle: React.CSSProperties = {
	width: 'max-content',
}

export const KanbanBoard = () => {
	const [todoItems, setTodoItems] = useState<Array<Card>>([]);
	const [doneItems, setDoneItems] = useState<Array<Card>>([]);
	const [inProgressItems, setInProgressItems] = useState<Array<Card>>([]);
	const [uItems, setuItems] = useState<Array<Card>>([]);

	// Unassigned レーンにカードを追加する処理
	const addNewCard = (uid: string, title: string) => {
		setuItems([...uItems, { uid, title }]);
	};

	const [droppedContainer, setDroppedContainer] = useState<UniqueIdentifier | undefined>();
	const [dragItemId, setDragItemId] = useState<string | undefined>();
	const [dragItemTitle, setDragItemTitle] = useState<string | undefined>();
	const [dragItemIndex, setDragItemIndex] = useState<number | undefined>();
	const [dragItemParent, setDragItemParent] = useState<string | undefined>();

	return (
		<DndContext
			collisionDetection={rectIntersection}
			onDragMove={(e) => {
				setDroppedContainer(e.over?.id);
				setDragItemId(e.active.data.current?.uid);
				setDragItemTitle(e.active.data.current?.title);
				setDragItemIndex(e.active.data.current?.index);
				setDragItemParent(e.active.data.current?.parent);
			}}

			onDragEnd={(e) => {
				const container = e.over?.id.toString();
				const cardId = e.active.data.current?.uid.toString() ?? "";
				const title = e.active.data.current?.title.toString() ?? "";
				const index = e.active.data.current?.index.toString() ?? 0;
				const parent = e.active.data.current?.parent.toString() ?? "";

				if (container === undefined || parent === container) {
					return;
				}

				if (container === "ToDo") {
					setTodoItems([...todoItems, { uid: cardId, title }]);
				} else if (container === "Done") {
					setDoneItems([...doneItems, { uid: cardId, title }]);
				} else if (container === "In Progress") {
					setInProgressItems([...inProgressItems, { uid: cardId, title }]);
				} else if (container === "Unassigned") {
					setuItems([...uItems, { uid: cardId, title }]);
				}

				if (parent === "ToDo") {
					setTodoItems((items) => items.filter((item) => item.uid !== cardId));
				} else if (parent === "Done") {
					setDoneItems((items) => items.filter((item) => item.uid !== cardId));
				} else if (parent === "In Progress") {
					setInProgressItems((items) => items.filter((item) => item.uid !== cardId));
				} else if (parent === "Unassigned") {
					setuItems((items) => items.filter((item) => item.uid !== cardId));
				}
			}}
		>
			<Flex flexDirection="column">
				<AddCard addCard={addNewCard} />
				<Flex flex="3">
					<KanbanLane title="ToDo" items={todoItems} />
					<KanbanLane title="In Progress" items={inProgressItems} />
					<KanbanLane title="Done" items={doneItems} />
					<KanbanLane title="Unassigned" items={uItems} />
				</Flex>
			</Flex>
			<Box padding={5} fontSize={20} style={infoBoxStyle}>
				<p>dragItemId: {dragItemId?.toString()}</p>
				<p>droppedContainer: {droppedContainer?.toString()}</p>
				<p>dragItemTitle: {dragItemTitle?.toString()}</p>
				<p>dragItemIndex: {dragItemIndex?.toString()}</p>
				<p>dragItemParent: {dragItemParent?.toString()}</p>
			</Box>
		</DndContext>
	);
}
