import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import React, { useState } from 'react'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'



export const DndKitSampleApp = () => {
	const [isDropped, setIsDropped] = useState(false);
	const draggableMarkup = (
		<Draggable>Drag me</Draggable>
	);

	const mouseSensor = useSensor(MouseSensor);
	const touchSensor = useSensor(TouchSensor);
	const keyboardSensor = useSensor(KeyboardSensor);
	const pointerSensor = useSensor(PointerSensor);
	const sensors = useSensors(mouseSensor, pointerSensor, touchSensor, keyboardSensor);


	const handleDragEnd = (event: DragEndEvent) => {
		if (event.over && event.over.id === 'droppable') {
			setIsDropped(true);
		}
	}

	const handleOnDragStart = (event: any, setActiveId: any) => {
		const activeId = event?.active?.data?.current?.type;
		console.log(activeId);
		setActiveId(activeId);
	};

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={handleDragEnd}
		>
			{!isDropped ? draggableMarkup : null}
			<Droppable>
				{isDropped ? draggableMarkup : 'Drop here'}
			</Droppable>
		</DndContext>
	)
}
