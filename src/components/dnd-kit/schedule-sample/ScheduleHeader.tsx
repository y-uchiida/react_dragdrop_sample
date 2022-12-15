import React, { CSSProperties } from 'react'
import { Spacer } from './atoms/Spacer'
import { dayOfTheWeek } from './types'

const headWrapStyle: CSSProperties = {
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	borderBottom: '1px #666 solid',
}

const headColumnStyle: CSSProperties = {
	flexGrow: 1,
	height: 40,
	padding: 8,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
}

export const ScheduleHeader = () => {
	return (
		<div style={headWrapStyle}>
			<Spacer width={28} />
			{[...Array(7).keys()].map(i => {
				return <div style={headColumnStyle} key={i}>
					{dayOfTheWeek[i]}
				</div>
			})}
		</div>
	)
}
