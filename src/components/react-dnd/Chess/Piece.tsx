import { Knight } from './Knight';

type Props = {
	isKnight: boolean
}

export const Piece = ({ isKnight }: Props) =>
	isKnight ? <Knight /> : null;
