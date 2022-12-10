import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';

type Props = {
	addCard: (id: string, title: string) => void;
}

export const AddCard = ({ addCard }: Props) => {
	const [title, setTitle] = useState('');

	const handleButtonClick = () => {
		const id = uuid();
		addCard(id, title);
		setTitle('');
	}

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
				onClick={() => handleButtonClick()}
			>Add Card</Button>
		</Flex >
	)
}
