import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TaskItem from './TaskItem';
import styles from '../styles/Filter.module.scss'

const TaskList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'done' | 'pending'>('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3;

    const filteredTasks = tasks.filter((task) => {
        return (
            (filterTitle === '' || task.title.includes(filterTitle)) &&
            (filterEmail === '' || task.email.includes(filterEmail)) &&
            (filterStatus === 'all' || task.status === filterStatus)
        );
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        return a.id > b.id ? order : -order;
    });

    const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
    const paginatedTasks = sortedTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Filter by title"
                    value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by email"
                    value={filterEmail}
                    onChange={(e) => setFilterEmail(e.target.value)}
                />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as 'all' | 'done' | 'pending')}>
                    <option value="all">All</option>
                    <option value="done">Done</option>
                    <option value="pending">Pending</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Sort by ID (asc)</option>
                    <option value="desc">Sort by ID (desc)</option>
                </select>
                <button type="submit">Apply Filters</button>
            </div>
            {paginatedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TaskList;
