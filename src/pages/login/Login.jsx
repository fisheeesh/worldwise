import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../../components/pageNav/PageNav";
import Button from "../../components/button/Button";
import useFakeAuth from '../../hooks/useFakeAuth'
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { loginUser, isAuthenticated } = useFakeAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("fish162@gmail.com");
  const [password, setPassword] = useState("worldwise2025");

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (email && password) loginUser(email, password)
  }

  useEffect(() => {
    if (isAuthenticated === true) navigate('/app', { replace: true })
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={onSubmitForm}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>
            LogIn
          </Button>
        </div>
      </form>
    </main>
  );
}
