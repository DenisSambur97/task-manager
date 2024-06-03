import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import styles from '../styles/Home.module.scss';

const Home = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const router = useRouter();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    if (!isAuthenticated) {
        return <p>Redirecting to login...</p>;
    }

    return (
        <div className={styles.container}>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default Home;
