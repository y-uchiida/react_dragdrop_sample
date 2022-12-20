import styled from '@emotion/styled'
import React, { CSSProperties } from 'react'
import { calcHightPixel } from "./utils/schedulePositionCalc";
import { getTimeStringByMinutes } from './utils/scheduleTimeCalc';


type Props = {
	title: string,
	startTime: number,
	endTime: number,
}

type ScheduleItemOverlayElmProps = {
	startTime: number,
	endTime: number,
}

const ScheduleItemOverlayElm = styled.div<ScheduleItemOverlayElmProps>`
	position: absolute;
	background: #666;
	userSelect: none;
	width: 100%;
	height: ${props => { return `${calcHightPixel(props.startTime, props.endTime)}px` }};
`;

export const ScheduleItemOverlay = (
	{ title, startTime, endTime }: Props
) => {

	const start = getTimeStringByMinutes(startTime);
	const end = getTimeStringByMinutes(endTime);

	return (
		<ScheduleItemOverlayElm
			startTime={startTime}
			endTime={endTime}
		>
			<div style={{ height: 0 }}>
				<p>{title}</p>
				<p>{`${start} - ${end}`}</p>
			</div>
		</ScheduleItemOverlayElm>
	)
}
