import styles from './Sidebar.module.css'
import Logo from '../logo/Logo'
import AppNav from '../appNav/AppNav'
import AppFooter from '../appFooter/AppFooter'
import { Outlet } from 'react-router-dom'
import useApp from '../../hooks/useApp'
import Spinner from '../spinner/Spinner'

export default function Sidebar() {
    const { status } = useApp()
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            {status === 'loading' && <Spinner />}
            {status === 'success' && <Outlet />}
            <AppFooter />
        </div>
    )
}
