import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { useRouter } from 'next/router';

interface AuthState {
    isAuthenticated: boolean;
    user: 'user' | 'admin' | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: 'user' | 'admin' }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null; // Сбрасываем ошибку при успешной аутентификации
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload; // Устанавливаем ошибку при неудачной аутентификации
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null; // Сбрасываем ошибку при выходе из системы
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// Асинхронный экшен для обработки аутентификации
export const loginUser = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        // Проверяем учетные данные
        if ((email === 'user@user.com' && password === '12345') || (email === 'admin@admin.com' && password === '67890')) {
            // Если аутентификация успешна, вызываем экшен loginSuccess
            dispatch(loginSuccess({ user: email === 'admin@admin.com' ? 'admin' : 'user' }));
        } else {
            // Если аутентификация неудачна, вызываем экшен loginFailure с сообщением об ошибке
            dispatch(loginFailure('Invalid email or password'));
        }
    } catch (error) {
        // Обработка ошибок, если таковые имеются
        dispatch(loginFailure('An error occurred while logging in'));
    }
};

export default authSlice.reducer;
