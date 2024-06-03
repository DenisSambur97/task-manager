import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { RootState } from '../store';
import { validateEmail } from '../utils/validation';
import styles from '../styles/TaskForm.module.scss'

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title.length < 3 || title.length > 25) {
            setError('Title must be between 3 and 25 characters');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        dispatch(addTask({ title, email, description }));
        setTitle('');
        setEmail('');
        setDescription('');
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input
                className={styles.inputField}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                className={styles.inputField}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <textarea
                className={styles.textareaField}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.addButton} type="submit">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;