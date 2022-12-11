import {
	DndContext,
	PointerSensor as BasePointerSensor,
	KeyboardSensor as BaseKeyboardSensor,
	rectIntersection,
	UniqueIdentifier,
	useSensors,
	useSensor,
} from "@dnd-kit/core";
import { KanbanLane } from "./KanbanLane";
import { AddCard } from "./AddCard";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Card, TaskState, taskState } from "./types";
import { KeyboardEvent, PointerEvent } from "react";

const infoBoxStyle: React.CSSProperties = {
	width: 'max-content',
}

/**
 * 指定のノードが、dndDisabled になっているかを判定する
 * @param element 検証対象のDOM
 * @returns boolean
 */
const isDndDisabled = (element: HTMLElement | null) => {
	let target = element;

	while (target) {
		if (target.dataset && target.dataset.dndDisabled) {
			return false;
		}
		target = target.parentElement;
	}
	return true;
}

// PointerSensorをカスタマイズ
class PointerSensor extends BasePointerSensor {
	static activators = [
		{
			eventName: 'onPointerDown' as const,
			// onPointerDown 時に、isDndDisabled() を実行してDndを処理すべきか判定
			handler: ({ nativeEvent: event }: PointerEvent): boolean => {
				return isDndDisabled(event.target as HTMLElement)
			},
		}
	]
}

// PointerSensorをカスタマイズ
class KeyboardSensor extends BaseKeyboardSensor {
	static activators = [
		{
			eventName: 'onKeyDown' as const,
			// onKeyDown 時に、isDndDisabled() を実行してDndを処理すべきか判定
			handler: ({ nativeEvent: event }: KeyboardEvent): boolean => {
				return isDndDisabled(event.target as HTMLElement)
			},
		}
	]
}

export const KanbanBoard = () => {
	const [taskItems, setTaskItems] = useState<Card[]>([]);

	// Unassigned レーンにカードを追加する処理
	const addNewCard = (uid: string, title: string) => {
		const newCard = { uid, title, status: taskState.UNASSIGNED }
		setTaskItems([...taskItems, newCard]);
	};

	const removeCard = (uid?: string) => {
		setTaskItems(items => {
			return items.filter(item => item.uid !== uid)
		});
	}

	const [droppedContainer, setDroppedContainer] = useState<UniqueIdentifier | undefined>();
	const [dragItemId, setDragItemId] = useState<string | undefined>();
	const [dragItemTitle, setDragItemTitle] = useState<string | undefined>();
	const [dragItemParent, setDragItemParent] = useState<string | undefined>();

	// sensors を生成、カスタムしたPointer とKeyboard のSensor を含める
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={rectIntersection}
			onDragMove={(e) => {
				setDroppedContainer(e.over?.id);
				setDragItemId(e.active.data.current?.uid);
				setDragItemTitle(e.active.data.current?.title);
				setDragItemParent(e.active.data.current?.parent);
			}}

			onDragEnd={(e) => {
				const container = e.over?.id.toString();
				const cardId = e.active.data.current?.uid.toString() ?? "";
				const parent = e.active.data.current?.parent.toString() ?? "";

				if (container === undefined || parent === container) {
					return;
				}

				setTaskItems((items) =>
					items.map(item => {
						if (item.uid === cardId) {
							return { ...item, status: container as TaskState }
						}
						return item
					})
				);
			}}
		>
			<Flex flexDirection="column">
				<AddCard addCard={addNewCard} />
				<Flex flex="3">
					<KanbanLane title={taskState.TODO} items={taskItems.filter(items => items.status === taskState.TODO)} removeCard={removeCard} />
					<KanbanLane title={taskState.IN_PROGRESS} items={taskItems.filter(items => items.status === taskState.IN_PROGRESS)} removeCard={removeCard} />
					<KanbanLane title={taskState.DONE} items={taskItems.filter(items => items.status === taskState.DONE)} removeCard={removeCard} />
					<KanbanLane title={taskState.UNASSIGNED} items={taskItems.filter(items => items.status === taskState.UNASSIGNED)} removeCard={removeCard} />
				</Flex>
			</Flex>
			<Box padding={5} fontSize={20} style={infoBoxStyle}>
				<p>dragItemId: {dragItemId?.toString()}</p>
				<p>droppedContainer: {droppedContainer?.toString()}</p>
				<p>dragItemTitle: {dragItemTitle?.toString()}</p>
				<p>dragItemParent: {dragItemParent?.toString()}</p>
			</Box>
		</DndContext >
	);
}
