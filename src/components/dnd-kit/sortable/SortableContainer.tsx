import { background } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import SortableItem from "./SortableItem";

const droppableAreaStyle: CSSProperties = {
	width: 'calc(33% - 5px)',
	background: '#444',
	borderRadius: 8,
	padding: 8
}

const SortableContainer = ({
	id,
	items,
	label,
}: {
	id: string;
	items: string[];
	label: string;
}) => {
	const { setNodeRef } = useDroppable({
		id,
	});
	return (
		<div style={droppableAreaStyle}>
			<h3 className="text-xl font-bold text-center">{label}</h3>
			<SortableContext id={id} items={items} strategy={rectSortingStrategy}>
				<div
					ref={setNodeRef}
					className="w-full border-2 border-gray-500/75 p-5 mt-2 rounded-md"
				>
					{items.map((id: string) => (
						<SortableItem key={id} id={id} />
					))}
				</div>
			</SortableContext>
		</div>
	);
};

export default SortableContainer;
