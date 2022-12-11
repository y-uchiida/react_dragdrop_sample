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
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'



export const DndKitSampleApp = () => {

	const handleDragEnd = (event: DragEndEvent) => {
		if (event.over && event.over.id === 'droppable') {
		}
	}

	return (
		<DndContext
			onDragEnd={handleDragEnd}
		>
			<Droppable>
				<Draggable>Drag me</Draggable>
			</Droppable>
		</DndContext>
	)
}
