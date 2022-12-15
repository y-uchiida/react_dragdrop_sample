import React, { CSSProperties } from 'react'

const wrapperStyle: CSSProperties = {
	position: 'absolute',
	width: '100%',
	zIndex: 0
}

const gutterStyle = {
	height: 16 * 4,
	borderBottom: '1px solid #999',
}

export const ScheduleGutter = () => {
	return (
		<div style={wrapperStyle}>
			{[...Array(24).keys()].map((i) => {
				return <div key={i} style={gutterStyle}>
					{i}
				</div>
			})}
		</div>
	)
}
