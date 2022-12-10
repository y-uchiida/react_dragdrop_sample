import { DndContext, rectIntersection, UniqueIdentifier } from "@dnd-kit/core";
import { KanbanLane } from "./KanbanLane";
import { AddCard } from "./AddCard";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./types";

const infoBoxStyle: React.CSSProperties = {
	width: 'max-content',
}

export const KanbanBoard = () => {
	const [todoItems, setTodoItems] = useState<Array<Card>>([]);
	const [doneItems, setDoneItems] = useState<Array<Card>>([]);
	const [inProgressItems, setInProgressItems] = useState<Array<Card>>([]);
	const [uItems, setuItems] = useState<Array<Card>>([]);

	// Unassigned レーンにカードを追加する処理
	const addNewCard = (title: string) => {
		setuItems([...uItems, { title }]);
	};

	const [droppedContainer, setDroppedContainer] = useState<UniqueIdentifier | undefined>();
	const [dragItemTitle, setDragItemTitle] = useState<string | undefined>();
	const [dragItemIndex, setDragItemIndex] = useState<number | undefined>();
	const [dragItemParent, setDragItemParent] = useState<string | undefined>();

	return (
		<DndContext
			collisionDetection={rectIntersection}
			onDragMove={(e) => {
				setDroppedContainer(e.over?.id);
				setDragItemTitle(e.active.data.current?.title);
				setDragItemIndex(e.active.data.current?.index);
				setDragItemParent(e.active.data.current?.parent);
			}}

			onDragEnd={(e) => {
				const container = e.over?.id;
				const title = e.active.data.current?.title ?? "";
				const index = e.active.data.current?.index ?? 0;
				const parent = e.active.data.current?.parent ?? "ToDo";


				if (container === "ToDo") {
					setTodoItems([...todoItems, { title }]);
				} else if (container === "Done") {
					setDoneItems([...doneItems, { title }]);
				} else if (container === "In Progress") {
					setInProgressItems([...uItems, { title }]);
				} else if (container === "Unassigned") {
					setuItems([...uItems, { title }]);
				} else {
					setInProgressItems([...inProgressItems, { title }]);
				}
				if (parent === "ToDo") {
					setTodoItems([
						...todoItems.slice(0, index),
						...todoItems.slice(index + 1),
					]);
				} else if (parent === "Done") {
					setDoneItems([
						...doneItems.slice(0, index),
						...doneItems.slice(index + 1),
					]);
				} else if (parent === "In Progress") {
					setInProgressItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
				} else if (parent === "Unassigned") {
					setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
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
				<p>droppedContainer: {droppedContainer?.toString()}</p>
				<p>dragItemTitle: {dragItemTitle?.toString()}</p>
				<p>dragItemIndex: {dragItemIndex?.toString()}</p>
				<p>dragItemParent: {dragItemParent?.toString()}</p>
			</Box>
		</DndContext>
	);
}
