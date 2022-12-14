
import { DndSchedule } from './DndSchedule';

const scheduleContainerStyle = {
	width: '100%',
	height: 'calc(100vh - 40px)'
}

export const DndKitScheduleApp = () => {
	return (
		<div style={scheduleContainerStyle}>
			<h2 style={{ height: '40px' }}>dnd-kit schedule sample</h2>
			<DndSchedule />
		</div>
	)
}
