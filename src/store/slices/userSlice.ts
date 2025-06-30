import { User } from '@/types/user.type';
import { getApi, postApi } from '@/ultils/method';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    currentUser: User | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isLoading: boolean;
    error: string | null;
}
const initialState: UserState = {
    currentUser: null,
    isAuthenticated: false,
    status: 'idle',
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'user/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await postApi('/auth/login', credentials)
            const { accessToken, refreshToken } = response.data
            console.log("Check accessToken", accessToken);
            
            localStorage.setItem('accessToken', accessToken)
            console.log("Check accessToken", accessToken)

            return accessToken
        } catch (error: any) {
            return rejectWithValue(error?.message || 'Login failed')
        }
    }
)

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi('/auth/profile')
            return response.data
        } catch (error: any) {
            return rejectWithValue(error?.message || 'Failed to fetch profile')
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
                state.isLoading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.isLoading = false
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.isLoading = false
                state.error = action.payload as string
            })

            .addCase(getProfile.pending, (state) => {
                state.status = 'loading'
                state.isLoading = true
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.isLoading = false
                state.currentUser = action.payload
                console.log("check profile", action.payload)
                state.isAuthenticated = true
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.isLoading = false
                state.error = action.payload as string
            })

    }
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;