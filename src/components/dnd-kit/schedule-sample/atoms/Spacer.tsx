import { CSSProperties } from 'react'

type Props = {
	width?: number | string
}

const timeSpacerStyle: CSSProperties = {
	width: 28,
	borderRight: '1px solid #666'
}

export const Spacer = (
	{ width }: Props
) => {
	return (
		<div style={{ ...timeSpacerStyle, width }}></div>
	)
}
