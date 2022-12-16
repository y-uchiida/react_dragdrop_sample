import { border } from '@chakra-ui/react';
import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import { Spacer } from './atoms/Spacer';

const wrapperStyle: CSSProperties = {
	position: 'static',
	zIndex: 0,
}

// const gutterStyle = {
// 	height: 16 * 4,
// 	width: 28,
// 	borderBottom: '1px solid #666',
// 	borderRight: '1px solid #666'
// }

type GutterLineProps = {
	i: number
}

const GutterLine = styled.div<GutterLineProps>`
	position: absolute;
	height: calc(16px * 4);
	top: calc(16px * 4 * ${(props) => props.i});
	width: 100%;
	border-top: 1px solid #666;
	pointer-events: none;
	user-select: none;

	&:before{
		content: ${(props) => props.i};
		font-size: 24px;
	}
`;

export const ScheduleGutter = () => {


	return (
		<div style={wrapperStyle}>
			<Spacer style={{ border: 'none' }} />
			{[...Array(24).keys()].map((i) => {
				return <GutterLine i={i} key={i}>
					{i}
				</GutterLine>
			})}
		</div>
	)
}
