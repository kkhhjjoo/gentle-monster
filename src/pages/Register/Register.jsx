import { useState } from 'react'
import styles from './Register.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { registerUser, checkEmailDuplicate } from '../../features/user/userSlice'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, registrationError, emailChecked } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('');

  const register = (e) => { 
    e.preventDefault();
    const { email, password, confirmPassword } = formData;
    const checkConfirmPassword = password === confirmPassword;
    if (!checkConfirmPassword) { 
      setPasswordError('비밀번호 중복확인이 일치하지 않습니다.');
      return;
    }
    setPasswordError('')
    dispatch(registerUser({ email, password, navigate }));
  }
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    if (id === 'email') {
      // 이메일 수정 시 중복확인 초기화
      dispatch({ type: 'user/resetEmailCheck' })
    }
    if (id === 'confirmPassword' || id === 'password') {
      setPasswordError('')
    }
  }

  const handleEmailCheck = () => {
    if (!formData.email) return
    dispatch(checkEmailDuplicate(formData.email))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!emailChecked) {
      alert('이메일 중복확인을 해주세요.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.')
      return
    }
    dispatch(registerUser({
      email: formData.email,
      name: formData.name,
      password: formData.password,
      navigate,
    }))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.emailRow}>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className={styles.checkButton}
            onClick={handleEmailCheck}
          >
            중복확인
          </button>
        </div>
        {emailChecked === true && (
          <p className={styles.success}>사용 가능한 이메일입니다.</p>
        )}
        {emailChecked === false && (
          <p className={styles.error}>이미 사용중인 이메일입니다.</p>
        )}

        <input
          className={styles.input}
          type="text"
          id="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
          type="password"
          id="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        {registrationError && <p className={styles.error}>{registrationError}</p>}

        <button type="submit" onClick={register} className={styles.button} disabled={loading}>
          {loading ? '처리중...' : '회원가입'}
        </button>
      </form>
    </div>
  )
}

export default Register
