import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'

const contentWrapStyle = {
	margin: '0 auto',
}

export const Layout = () => {
	return (
		<>
			<NavBar />
			<div style={contentWrapStyle}>
				<Outlet />
			</div>
		</>
	)
}
