import React, { useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithEmail } from '../../features/user/userSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginError, loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginWithEmail({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>로그인</h1>
      <form onSubmit={loginUser} className={styles.form}>
        <label className={styles.srOnly} htmlFor="email">
          이메일
        </label>
        <input
          className={styles.input}
          type="text"
          id="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.srOnly} htmlFor="password">
          비밀번호
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && <p className={styles.error}>{loginError}</p>}
        <button type="submit" className={styles.button} disabled={loading}>로그인</button>
        <button type="button" className={styles.registerBtn} onClick={() => navigate('/register')}>회원가입</button>
      </form>
    </div>
  )
}

export default Login
