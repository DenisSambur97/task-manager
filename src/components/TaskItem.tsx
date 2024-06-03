import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../store/taskSlice';
import { RootState } from '../store';
import styles from '../styles/Home.module.scss'

interface Task {
    id: number;
    title: string;
    email: string;
    description?: string;
    status: 'done' | 'pending';
}

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [status, setStatus] = useState(task.status === 'done');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleEdit = () => {
        if (isEditing) {
            const updatedTask = {
                ...task,
                title,
                description,
                status: status ? 'done' : 'pending',
            };
            dispatch(editTask(updatedTask));
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.taskEdit}>
            {isEditing ? (
                <>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>
                        <input
                            type="checkbox"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                        />
                        Done
                    </label>
                    <button onClick={handleEdit}>Save</button>
                </>
            ) : (
                <div className={styles.taskInfo}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p className={styles.status}>Status: {task.status}</p>
                    {user === 'admin' && (
                        <button onClick={handleEdit}>Edit</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskItem;
