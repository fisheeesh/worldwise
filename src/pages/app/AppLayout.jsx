import Map from '../../components/map/Map'
import Sidebar from '../../components/sidebar/Sidebar'
import User from '../../components/user/User'
import styles from './AppLayout.module.css'

export default function AppLayout() {

    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    )
}
