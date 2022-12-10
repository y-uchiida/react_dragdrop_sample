import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { KanbanBoard } from './KanbanBoard'

const wrapperStyle: React.CSSProperties = {
	height: '100vh'
}

export const DndKitKanbanBoardApp = () => {
	return (
		<ChakraProvider>
			<div style={wrapperStyle}>
				<KanbanBoard />
			</div>
		</ChakraProvider>
	)
}
