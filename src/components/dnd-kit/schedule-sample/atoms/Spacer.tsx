import { CSSProperties } from 'react'

type Props = {
	style?: CSSProperties
}

const timeSpacerStyle: CSSProperties = {
	width: 28,
	borderRight: '1px solid #666'
}

export const Spacer = (
	{ style }: Props
) => {
	return (
		<div style={{ ...timeSpacerStyle, ...style }}></div>
	)
}
