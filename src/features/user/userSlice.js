import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { initialCart, getCartList } from '../cart/cartSlice';
import { toast } from 'react-toastify';

export const loginWithEmail = createAsyncThunk('user/loginwithEmail', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.post('/login', { email, password });
    // json-server-auth는 accessToken으로 반환
    localStorage.setItem('token', response.data.accessToken);
    dispatch(getCartList());
    toast.success('로그인에 성공했습니다');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message);
  }
});

export const logout = () => (dispatch) => { 
  localStorage.removeItem('token');
  dispatch(userSlice.actions.logoutUser());
  dispatch(initialCart());
  toast.success('로그아웃되었습니다');
}

export const registerUser = createAsyncThunk('user/registerUser', async ({ email, password, navigate }, { rejectWithValue }) => {
  try {
    const response = await api.post('/register', { email, password });
    // 회원가입 후 토큰 저장 (자동 로그인)
    localStorage.setItem('token', response.data.accessToken);
    toast.success('회원가입에 성공했습니다');
    navigate('/login');
    return response.data;
  } catch (error) {
    toast.error('회원가입에 실패했습니다');
    return rejectWithValue(error.response?.data.message)
  }
});

export const checkEmailDuplicate = createAsyncThunk('user/checkEmailDuplicate', async (email, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users?email=${email}`);
    // 결과가 있으면 이미 사용중
    return response.data.length === 0;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginWithToken = createAsyncThunk('user/loginWithToken', async (_, { rejectWithValue }) => {
  try {
    // json-server-auth: 600 prefix = 본인 리소스만 접근 가능한 보호 라우트
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
    emailChecked: null, // null: 미확인, true: 사용가능, false: 중복
  },
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
    resetEmailCheck: (state) => {
      state.emailChecked = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationError = action.payload;
        state.loading = false;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginWithToken.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkEmailDuplicate.fulfilled, (state, action) => {
        state.emailChecked = action.payload; // true: 사용가능, false: 중복
      })
  },
});
export const { clearErrors, resetEmailCheck } = userSlice.actions;
export default userSlice.reducer;
