import { DndContext, rectIntersection } from "@dnd-kit/core";
import { KanbanLane } from "./KanbanLane";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./types";

export const KanbanBoard = () => {
	const [todoItems, setTodoItems] = useState<Array<Card>>([]);
	const [doneItems, setDoneItems] = useState<Array<Card>>([]);
	const [inProgressItems, setInProgressItems] = useState<Array<Card>>([]);
	const [uItems, setuItems] = useState<Array<Card>>([]);

	return (
		<DndContext
			collisionDetection={rectIntersection}
			onDragEnd={(e) => {
				const container = e.over?.id;
				const title = e.active.data.current?.title ?? "";
				const index = e.active.data.current?.index ?? 0;
				const parent = e.active.data.current?.parent ?? "ToDo";
				if (container === "ToDo") {
					setTodoItems([...todoItems, { title }]);
				} else if (container === "Done") {
					setDoneItems([...doneItems, { title }]);
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
				} else if (parent === "Unassigned") {
					setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
				} else {
					setInProgressItems([
						...inProgressItems.slice(0, index),
						...inProgressItems.slice(index + 1),
					]);
				}
			}}
		>
			<Flex flexDirection="column">
				<Flex flex="3">
					<KanbanLane title="ToDo" items={todoItems} />
					<KanbanLane title="In Progress" items={inProgressItems} />
					<KanbanLane title="Done" items={doneItems} />
					<KanbanLane title="Unassigned" items={uItems} />
				</Flex>
			</Flex>
		</DndContext>
	);
}
