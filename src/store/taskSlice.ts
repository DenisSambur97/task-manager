import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: number;
    title: string;
    email: string;
    description?: string;
    status: 'done' | 'pending';
}

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [
        { id: 1, title: 'First Task', email: 'user@user.com', description: 'This is the first task', status: 'pending' },
        { id: 2, title: 'Second Task', email: 'admin@admin.com', description: 'This is the second task', status: 'done' },
    ],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'status'>>) => {
            const newTask = {
                id: state.tasks.length + 1,
                status: 'pending',
                ...action.payload,
            };
            state.tasks.push(newTask);
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
    },
});

export const { addTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
