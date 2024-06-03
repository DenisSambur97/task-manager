import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../store/authSlice';
import styles from '../styles/Logout.module.scss';

const Logout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatch(logout());
            router.push('/login');
        }
    }, [dispatch, router]);

    return (
        <div className={styles.container}>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
