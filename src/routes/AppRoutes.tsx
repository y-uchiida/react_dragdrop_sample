import { createBrowserRouter, useRoutes } from "react-router-dom";
import { DndKitKanbanBoardApp } from "../components/dnd-kit/kanban-board-sample/DndKitKanbanBoardApp";
import { DndKitSampleApp } from "../components/dnd-kit/sample/DndKitSampleApp";
import { DndKitScheduleApp } from "../components/dnd-kit/schedule-sample";
import { DndKitSortableSampleApp } from "../components/dnd-kit/sortable";
import { Layout } from "../components/Layout";
import { ChessApp } from "../components/react-dnd/Chess";

const routes = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "dnd-kit-sample",
				element: <DndKitSampleApp />,
			},
			{
				path: "dnd-kit-sortable-sample",
				element: <DndKitSortableSampleApp />,
			},
			{
				path: "dnd-kit-kanban-board-sample",
				element: <DndKitKanbanBoardApp />,
			},
			{
				path: "dnd-kit-schedule-sample",
				element: <DndKitScheduleApp />,
			},
			{
				path: "react-dnd-chess-sample",
				element: <ChessApp />,
			},
		],
	},
]

export const router = createBrowserRouter(routes);

export const AppRoutes = () => {
	return useRoutes(routes);
}
