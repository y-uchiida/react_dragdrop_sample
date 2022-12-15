
import { DndSchedule } from './DndSchedule';

const scheduleContainerStyle = {
	width: '100%',

}

export const DndKitScheduleApp = () => {
	return (
		<div style={scheduleContainerStyle}>
			<h2>dnd-kit schedule sample</h2>
			<DndSchedule />
		</div>
	)
}
