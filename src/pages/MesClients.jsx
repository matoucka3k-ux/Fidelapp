// MesClients.jsx
import { useState } from 'react'

const CLIENTS = [
  { ini: 'AM', name: 'Alice Moreau', email: 'alice@mail.fr', pts: 1240, status: 'Actif', last: "Aujourd'hui", joined: '12/01/2025', color: '#2563EB' },
  { ini: 'BP', name: 'Bruno Petit', email: 'bruno@mail.fr', pts: 380, status: 'Nouveau', last: 'Hier', joined: '08/03/2025', color: '#7C3AED' },
  { ini: 'CR', name: 'Camille Roux', email: 'camille@mail.fr', pts: 1890, status: 'Actif', last: 'Il y a 2j', joined: '05/11/2024', color: '#0891B2' },
  { ini: 'DM', name: 'David Martin', email: 'david@mail.fr', pts: 90, status: 'Nouveau', last: 'Il y a 3j', joined: '11/03/2025', color: '#059669' },
  { ini: 'EB', name: 'Emma Bernard', email: 'emma@mail.fr', pts: 640, status: 'Actif', last: 'Il y a 5j', joined: '22/09/2024', color: '#DC2626' },
  { ini: 'FA', name: 'Fabrice Aubert', email: 'fabrice@mail.fr', pts: 120, status: 'À risque', last: 'Il y a 35j', joined: '15/07/2024', color: '#D97706' },
  { ini: 'GL', name: 'Gaëlle Lefèvre', email: 'gaelle@mail.fr', pts: 2000, status: 'Actif', last: 'Hier', joined: '03/06/2024', color: '#0284C7' },
  { ini: 'HB', name: 'Hugo Blanc', email: 'hugo@mail.fr', pts: 55, status: 'À risque', last: 'Il y a 42j', joined: '18/08/2024', color: '#9333EA' },
]

const STATUS_STYLE = {
  'Actif': { bg: '#DCFCE7', color: '#166534' },
  'Nouveau': { bg: '#EFF6FF', color: '#1D4ED8' },
  'À risque': { bg: '#FEF9C3', color: '#854D0E' },
}

const s = {
  page: { minHeight: '100vh', background: '#F8FAFF' },
  topbar: { background: '#fff', borderBottom: '1px solid #E8F0FE', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: 800, color: '#0F172A' },
  sub: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  content: { padding: '24px 28px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 },
  stat: { background: '#fff', border: '1px solid #E8F0FE', borderRadius: 12, padding: '16px 18px' },
  statLbl: { fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 },
  statVal: { fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: -1, marginBottom: 4 },
  statChg: { fontSize: 12, fontWeight: 600, background: '#DCFCE7', color: '#16A34A', padding: '2px 8px', borderRadius: 999 },
  toolbar: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 },
  searchInput: { flex: 1, background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 9, padding: '9px 14px', fontSize: 14, fontFamily: 'inherit', color: '#0F172A', outline: 'none' },
  tableCard: { background: '#fff', border: '1px solid #E8F0FE', borderRadius: 12, overflow: 'hidden' },
  tableHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #F1F5F9' },
  tableTitle: { fontSize: 14, fontWeight: 700, color: '#0F172A' },
  btnAdd: { background: '#2563EB', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' },
}

export default function MesClients() {
  const [search, setSearch] = useState('')
  const filtered = CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={s.page}>
      <div style={s.topbar}>
        <div><div style={s.title}>Mes clients</div><div style={s.sub}>Gérez et suivez tous vos clients fidèles</div></div>
        <button style={s.btnAdd}>+ Ajouter un client</button>
      </div>
      <div style={s.content}>
        <div style={s.statsRow}>
          {[['Total clients','248','+12 ce mois'],['Clients actifs','194','78%'],['À risque','31','absents +30j'],['Points moyens','572','+8%']].map(([l,v,c])=>(
            <div key={l} style={s.stat}><div style={s.statLbl}>{l}</div><div style={s.statVal}>{v}</div><span style={s.statChg}>{c}</span></div>
          ))}
        </div>
        <div style={s.toolbar}>
          <input style={s.searchInput} placeholder="Rechercher un client..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div style={s.tableCard}>
          <div style={s.tableHead}><span style={s.tableTitle}>Clients ({filtered.length})</span><span style={{fontSize:13,color:'#2563EB',fontWeight:600,cursor:'pointer'}}>Exporter CSV</span></div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr style={{background:'#FAFAFA',borderBottom:'1px solid #F1F5F9'}}>
              {['Client','Points','Statut','Dernière visite','Inscrit le'].map(h=><th key={h} style={{textAlign:'left',padding:'10px 16px',fontSize:11,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.06em'}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(c=>(
                <tr key={c.name} style={{borderBottom:'1px solid #F8FAFF',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='#F8FAFF'} onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                  <td style={{padding:'12px 16px'}}><div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:32,height:32,borderRadius:'50%',background:c.color,color:'#fff',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{c.ini}</div><div><div style={{fontSize:13,fontWeight:700,color:'#0F172A'}}>{c.name}</div><div style={{fontSize:11,color:'#94A3B8'}}>{c.email}</div></div></div></td>
                  <td style={{padding:'12px 16px'}}><span style={{background:'#EFF6FF',color:'#2563EB',fontSize:12,fontWeight:700,padding:'3px 10px',borderRadius:999}}>{c.pts.toLocaleString()} pts</span></td>
                  <td style={{padding:'12px 16px'}}><span style={{background:STATUS_STYLE[c.status]?.bg,color:STATUS_STYLE[c.status]?.color,fontSize:11,fontWeight:700,padding:'3px 9px',borderRadius:999}}>{c.status}</span></td>
                  <td style={{padding:'12px 16px',fontSize:12,color:'#94A3B8'}}>{c.last}</td>
                  <td style={{padding:'12px 16px',fontSize:12,color:'#94A3B8'}}>{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
