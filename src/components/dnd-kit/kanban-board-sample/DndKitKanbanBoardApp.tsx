import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { KanbanBoard } from './KanbanBoard'

export const DndKitKanbanBoardApp = () => {
	return (
		<ChakraProvider>
			<KanbanBoard />
		</ChakraProvider>
	)
}
