import React from 'react'
import { Link } from 'react-router-dom'

const navBarStyle: React.CSSProperties = {
	display: 'flex',
	width: '100%',
	padding: '8px',
	textAlign: 'left',
	fontSize: '16px',
	columnGap: '8px',
}

export const NavBar = () => {
	return (
		<div style={navBarStyle}>
			<Link to='dnd-kit-sample' >dnd-kit sample</Link>
			<Link to='dnd-kit-sortable-sample' >dnd-kit sortable sample</Link>
			<Link to='dnd-kit-kanban-board-sample' >dnd-kit Kanban board sample</Link>
			<Link to='react-dnd-chess-sample' >react DnD chess sample</Link>
		</ div>
	)
}
