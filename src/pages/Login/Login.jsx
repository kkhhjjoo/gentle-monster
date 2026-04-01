import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router';

const Login = () => {

  const navigate = useNavigate();
  
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    console.log('authenticate', authenticate)
  }, [authenticate]);

  const loginUser = (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    setAuthenticate(true);
    navigate('/');
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
        />

        <label className={styles.srOnly} htmlFor="password">
          비밀번호
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="비밀번호"
        />
        <button type="submit" className={styles.button}>로그인</button>
      </form>
    </div>
  )
}

export default Login
