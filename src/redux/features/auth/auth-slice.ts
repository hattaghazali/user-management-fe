import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
    token: string | null;
    isAuthorized: boolean;
    isTest: boolean;
    userInfo?: IUserInfo | null;
}

const initialState: IAuthState = {
    token: localStorage.getItem('accessToken') || null,
    isAuthorized: !!localStorage.getItem('accessToken'),
    isTest: false,
    userInfo: null
};

interface IUserInfo {
    _id: string;
    u_email: string;
    u_name: string;
    u_gender: number;
    u_occupation: number;
    u_state: number;
    u_status: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthorized = true;
            localStorage.setItem('accessToken', action.payload);
        },
        setUserInfo(state, action: PayloadAction<IUserInfo>) {
            state.userInfo = action.payload;
        },
        clearAccessToken(state) {
            state.token = null;
            state.isAuthorized = false;
            state.userInfo = null;
            state.isTest = true;
            localStorage.removeItem('accessToken');
        }
    }
});

export const { setAccessToken, clearAccessToken, setUserInfo } =
    authSlice.actions;
export default authSlice.reducer;
