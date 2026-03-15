import styles from './ClientCard.module.css'

export default function ClientCard() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.shopRow}>
          <div className={styles.shopLogo}>BM</div>
          <div>
            <div className={styles.shopName}>Boulangerie Martin</div>
            <div className={styles.shopType}>Programme de fidélité</div>
          </div>
        </div>
        <div className={styles.greeting}>Bonjour Marie 👋</div>
        <div className={styles.ptsBig}>100</div>
        <div className={styles.ptsLabel}>points</div>
        <div className={styles.barBg}><div className={styles.barFill} style={{ width: '50%' }} /></div>
        <div className={styles.ptsNext}>Encore 100 pts → Café offert</div>
      </div>

      <div className={styles.qrSection}>
        <div className={styles.qrTitle}>Mon QR code</div>
        <div className={styles.qrSub}>Le commerçant le scanne à la caisse pour créditer vos points</div>
        <div className={styles.qrBox}>
          <svg width="110" height="110" viewBox="0 0 120 120">
            <rect width="120" height="120" fill="white"/>
            <rect x="8" y="8" width="34" height="34" rx="4" fill="#0F172A"/>
            <rect x="13" y="13" width="24" height="24" rx="2" fill="white"/>
            <rect x="18" y="18" width="14" height="14" rx="1" fill="#0F172A"/>
            <rect x="78" y="8" width="34" height="34" rx="4" fill="#0F172A"/>
            <rect x="83" y="13" width="24" height="24" rx="2" fill="white"/>
            <rect x="88" y="18" width="14" height="14" rx="1" fill="#0F172A"/>
            <rect x="8" y="78" width="34" height="34" rx="4" fill="#0F172A"/>
            <rect x="13" y="83" width="24" height="24" rx="2" fill="white"/>
            <rect x="18" y="88" width="14" height="14" rx="1" fill="#0F172A"/>
            <rect x="50" y="8" width="6" height="6" fill="#0F172A"/>
            <rect x="58" y="14" width="6" height="6" fill="#0F172A"/>
            <rect x="50" y="50" width="6" height="6" fill="#2563EB"/>
            <rect x="60" y="50" width="6" height="6" fill="#0F172A"/>
            <rect x="70" y="56" width="6" height="6" fill="#2563EB"/>
            <rect x="50" y="62" width="6" height="6" fill="#0F172A"/>
            <rect x="80" y="62" width="6" height="6" fill="#2563EB"/>
            <rect x="90" y="50" width="6" height="6" fill="#0F172A"/>
            <rect x="54" y="54" width="12" height="12" rx="2" fill="#2563EB"/>
          </svg>
        </div>
        <div className={styles.qrId}>Marie Dupont · #FM-00042</div>
      </div>

      <div className={styles.body}>
        <div className={styles.sectionTitle}>Récompenses</div>
        <div className={styles.rewards}>
          {[
            { name: 'Café offert', pts: 200, ok: true },
            { name: 'Viennoiserie offerte', pts: 500, ok: false },
            { name: 'Réduction 10%', pts: 1000, ok: false },
          ].map(r => (
            <div key={r.name} className={styles.rewardRow}>
              <div>
                <div className={styles.rewName}>{r.name}</div>
                <div className={styles.rewPts}>{r.pts} pts</div>
              </div>
              <button className={r.ok ? styles.rewBtnOk : styles.rewBtnNo}>
                {r.ok ? 'Utiliser' : `${r.pts} pts`}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.sectionTitle}>Historique</div>
        <div className={styles.history}>
          <div className={styles.histRow}>
            <div>
              <div className={styles.histLabel}>Bonus de bienvenue</div>
              <div className={styles.histDate}>Aujourd'hui</div>
            </div>
            <div className={styles.histPts}>+100 pts</div>
          </div>
        </div>
      </div>
    </div>
  )
}
