import styles from './Sidebar.module.css'
import Logo from '../logo/Logo'
import AppNav from '../appNav/AppNav'
import AppFooter from '../appFooter/AppFooter'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            <p>List of Cities</p>
            <AppFooter />
        </div>
    )
}
