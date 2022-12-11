import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./Item";

const draggableItemStyle = {
	padding: '8px',
	background: '#777',
	margin: 4
}

const SortableItem = ({ id }: { id: UniqueIdentifier }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	return (
		<div
			ref={setNodeRef}
			style={{ ...draggableItemStyle, transform: CSS.Transform.toString(transform), transition }}
			{...attributes}
			{...listeners}
		>
			<Item id={id} />
		</div>
	);
};

export default SortableItem;
