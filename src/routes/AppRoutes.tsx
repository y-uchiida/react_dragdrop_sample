import { createBrowserRouter, useRoutes } from "react-router-dom";
import { DndKitSampleApp } from "../components/dnd-kit/sample/DndKitSampleApp";
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
