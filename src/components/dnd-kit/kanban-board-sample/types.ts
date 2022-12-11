export const taskState = {
	TODO: 'Todo',
	IN_PROGRESS: 'In Progress',
	DONE: 'Done',
	UNASSIGNED: 'Unassigned',
} as const;

export type TaskState = typeof taskState[keyof typeof taskState];
export type Card = {
	uid: string,
	title: string,
	status: TaskState
};
