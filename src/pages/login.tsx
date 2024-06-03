import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { loginUser } from '../store/authSlice';
import styles from '../styles/Login.module.scss';
import { RootState } from '../store/index';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const error = useSelector((state: RootState) => state.auth.error); // Получаем ошибку из состояния
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(email, password)); // Вызываем асинхронный экшен для обработки аутентификации
    };

    useEffect(() => {
        // Если пользователь уже аутентифицирован и находится на странице логина,
        // перенаправляем его на главную страницу
        if (isAuthenticated && router.pathname === '/login') {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className={styles.error}>{error}</p>} {/* Выводим сообщение об ошибке */}
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
