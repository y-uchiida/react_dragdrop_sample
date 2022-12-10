import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react'


type Props = {
	addCard: (title: string) => void;
}

export const AddCard = ({ addCard }: Props) => {
	const [title, setTitle] = useState('');

	return (
		<Flex p={5} columnGap={4}>
			<Input
				width={360}
				placeholder='Card Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Button colorScheme='green'
				disabled={!(title.length > 0)}
				onClick={() => {
					addCard(title);
					setTitle('');
				}}
			>Add Card</Button>
		</Flex>
	)
}
