import styles from './Sidebar.module.css'
import Logo from '../logo/Logo'
import AppNav from '../appNav/AppNav'
import AppFooter from '../appFooter/AppFooter'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <AppFooter />
        </div>
    )
}
