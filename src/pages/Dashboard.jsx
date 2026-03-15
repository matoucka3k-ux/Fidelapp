import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './Dashboard.module.css'

const areaData = [
  { s: 'S1', v: 42 }, { s: 'S2', v: 55 }, { s: 'S3', v: 48 }, { s: 'S4', v: 66 },
  { s: 'S5', v: 57 }, { s: 'S6', v: 75 }, { s: 'S7', v: 63 }, { s: 'S8', v: 82 },
  { s: 'S9', v: 71 }, { s: 'S10', v: 90 }, { s: 'S11', v: 78 }, { s: 'S12', v: 100 },
]

const rewardData = [
  { name: 'Café offert', val: 18 },
  { name: 'Viennoiserie', val: 12 },
  { name: 'Réduction', val: 7 },
]

const CLIENTS = [
  { ini: 'AM', name: 'Alice Moreau', pts: 1240, status: 'Actif', color: '#2563EB', last: "Aujourd'hui" },
  { ini: 'BP', name: 'Bruno Petit', pts: 380, status: 'Nouveau', color: '#7C3AED', last: 'Hier' },
  { ini: 'CR', name: 'Camille Roux', pts: 1890, status: 'Actif', color: '#0891B2', last: 'Il y a 2j' },
  { ini: 'DM', name: 'David Martin', pts: 90, status: 'Nouveau', color: '#059669', last: 'Il y a 3j' },
  { ini: 'EB', name: 'Emma Bernard', pts: 640, status: 'Actif', color: '#DC2626', last: 'Il y a 5j' },
]

const Tip = ({ active, payload, label }) => active && payload?.length ? (
  <div className={styles.tip}><p className={styles.tipLabel}>{label}</p>{payload.map(p => <p key={p.name} style={{ color: p.color, fontSize: 13 }}>{p.value}</p>)}</div>
) : null

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.title}>Tableau de bord</div>
          <div className={styles.sub}>Bonjour Pierre — voici ce qui se passe dans votre commerce</div>
        </div>
        <select className={styles.period}><option>30 derniers jours</option><option>7 derniers jours</option><option>Cette année</option></select>
      </div>

      <div className={styles.content}>
        <div className={styles.metrics}>
          {[
            { lbl: 'Clients fidèles', val: '248', chg: '+12 ce mois' },
            { lbl: 'Visites ce mois', val: '1 043', chg: '+18%' },
            { lbl: 'Points distribués', val: '14 200', chg: '+9%' },
            { lbl: 'Récompenses offertes', val: '37', chg: 'ce mois' },
          ].map(m => (
            <div key={m.lbl} className={styles.metric}>
              <div className={styles.metricLbl}>{m.lbl}</div>
              <div className={styles.metricVal}>{m.val}</div>
              <span className={styles.metricChg}>{m.chg}</span>
            </div>
          ))}
        </div>

        <div className={styles.chartsRow}>
          <div className={styles.card}>
            <div className={styles.cardHead}><div className={styles.cardTitle}>Visites clients fidèles</div><span className={styles.cardSub}>12 semaines</span></div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={areaData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs><linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/><stop offset="95%" stopColor="#2563EB" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="s" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={2} fill="url(#gBlue)" name="Visites" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHead}><div className={styles.cardTitle}>Récompenses échangées</div><span className={styles.cardSub}>ce mois</span></div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={rewardData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} cursor={{ fill: 'rgba(37,99,235,0.04)' }} />
                <Bar dataKey="val" fill="#2563EB" radius={[4, 4, 0, 0]} name="Échanges" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHead}><span className={styles.cardTitle}>Derniers clients inscrits</span><span className={styles.seeAll}>Voir tous →</span></div>
          <table className={styles.table}>
            <thead><tr><th>Client</th><th>Points</th><th>Statut</th><th>Dernière visite</th></tr></thead>
            <tbody>
              {CLIENTS.map(c => (
                <tr key={c.name}>
                  <td><div className={styles.clientCell}><div className={styles.av} style={{ background: c.color }}>{c.ini}</div><span className={styles.clientName}>{c.name}</span></div></td>
                  <td><span className={styles.ptsBadge}>{c.pts.toLocaleString()} pts</span></td>
                  <td><span className={`${styles.statusBadge} ${c.status === 'Actif' ? styles.statusActive : styles.statusNew}`}>{c.status}</span></td>
                  <td className={styles.muted}>{c.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
