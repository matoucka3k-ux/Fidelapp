import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import styles from './DashboardLayout.module.css'

const NAV = [
  { to: '/dashboard', label: 'Tableau de bord', end: true, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg> },
  { to: '/dashboard/encaisser', label: 'Encaisser', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="8" width="6" height="7" rx="1"/><rect x="9" y="5" width="6" height="10" rx="1"/><rect x="1" y="1" width="6" height="5" rx="1"/></svg> },
  { to: '/dashboard/clients', label: 'Mes clients', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg> },
  { to: '/dashboard/points', label: 'Système de points', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 2l1.2 2.5 2.8.4-2 2 .5 2.8L8 8.4 5.5 9.7 6 6.9 4 4.9l2.8-.4z"/></svg> },
]

export default function DashboardLayout() {
  const navigate = useNavigate()
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoMark}>
            <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2"><path d="M8 2C5 2 3 4 3 6.5c0 3.5 5 7.5 5 7.5s5-4 5-7.5C13 4 11 2 8 2z"/></svg>
          </div>
          <span>FidèleApp</span>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navSection}>Menu</div>
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          <div className={styles.navSection} style={{ marginTop: 8 }}>Paramètres</div>
          <NavLink to="/dashboard/compte"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <span className={styles.navIcon}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="6" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/></svg>
            </span>
            <span>Mon compte</span>
          </NavLink>
        </nav>

        <div className={styles.user}>
          <div className={styles.avatar}>PM</div>
          <div>
            <div className={styles.userName}>Pierre Martin</div>
            <div className={styles.userPlan}>Plan annuel</div>
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
