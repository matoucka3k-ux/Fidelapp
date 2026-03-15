// Encaisser.jsx - Page d'encaissement avec QR code et scanner
import { useState } from 'react'
import styles from './Encaisser.module.css'

const CLIENTS = [
  { id: 0, name: 'Alice Moreau', email: 'alice@mail.fr', pts: 1240, color: '#2563EB', ini: 'AM' },
  { id: 1, name: 'Bruno Petit', email: 'bruno@mail.fr', pts: 380, color: '#7C3AED', ini: 'BP' },
  { id: 2, name: 'Camille Roux', email: 'camille@mail.fr', pts: 1890, color: '#0891B2', ini: 'CR' },
  { id: 3, name: 'David Martin', email: 'david@mail.fr', pts: 90, color: '#059669', ini: 'DM' },
  { id: 4, name: 'Emma Bernard', email: 'emma@mail.fr', pts: 640, color: '#DC2626', ini: 'EB' },
]

const CATS = [
  { name: 'Tout', arts: [{ n: 'Baguette', pts: 1, p: '1,10€' }, { n: 'Pain complet', pts: 2, p: '1,80€' }, { n: 'Croissant', pts: 2, p: '1,20€' }, { n: 'Pain au choc.', pts: 2, p: '1,20€' }, { n: 'Brioche', pts: 3, p: '2,50€' }, { n: 'Éclair', pts: 3, p: '2,80€' }, { n: 'Café', pts: 1, p: '1,50€' }, { n: 'Sandwich', pts: 3, p: '4,50€' }, { n: 'Tarte', pts: 4, p: '3,80€' }] },
  { name: 'Pains', arts: [{ n: 'Baguette', pts: 1, p: '1,10€' }, { n: 'Pain complet', pts: 2, p: '1,80€' }, { n: 'Pain de seigle', pts: 2, p: '2,20€' }] },
  { name: 'Viennoiseries', arts: [{ n: 'Croissant', pts: 2, p: '1,20€' }, { n: 'Pain au choc.', pts: 2, p: '1,20€' }, { n: 'Brioche', pts: 3, p: '2,50€' }] },
  { name: 'Pâtisseries', arts: [{ n: 'Éclair', pts: 3, p: '2,80€' }, { n: 'Tarte', pts: 4, p: '3,80€' }] },
  { name: 'Boissons', arts: [{ n: 'Café', pts: 1, p: '1,50€' }, { n: 'Thé', pts: 1, p: '1,50€' }, { n: 'Jus', pts: 2, p: '2,50€' }] },
]

const REWARDS = [{ name: 'Café offert', pts: 200 }, { name: 'Viennoiserie', pts: 500 }, { name: 'Réduction 10%', pts: 1000 }]

export default function Encaisser() {
  const [state, setState] = useState('home') // home | caisse | succes
  const [tab, setTab] = useState('scan')
  const [search, setSearch] = useState('')
  const [client, setClient] = useState(null)
  const [selCat, setSelCat] = useState(0)
  const [panier, setPanier] = useState([])

  const filtered = CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const selectClient = (c) => {
    setClient(c)
    setPanier([])
    setSelCat(0)
    setState('caisse')
  }

  const addArt = (art) => setPanier(p => [...p, art])

  const removeGroup = (name) => {
    setPanier(p => {
      const idx = [...p].reverse().findIndex(x => x.n === name)
      if (idx === -1) return p
      const realIdx = p.length - 1 - idx
      return p.filter((_, i) => i !== realIdx)
    })
  }

  const total = panier.reduce((s, a) => s + a.pts, 0)

  const grouped = panier.reduce((acc, a) => {
    acc[a.n] = acc[a.n] || { pts: a.pts, cnt: 0 }
    acc[a.n].cnt++
    return acc
  }, {})

  const valider = () => setState('succes')

  if (state === 'succes') return (
    <div className={styles.page}>
      <div className={styles.topbar}><div className={styles.title}>Encaisser</div></div>
      <div className={styles.content} style={{ maxWidth: 460, margin: '0 auto' }}>
        <div className={styles.card} style={{ textAlign: 'center', padding: '40px 32px' }}>
          <div className={styles.succCircle}>
            <svg viewBox="0 0 28 28" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M4 14l7 7L24 7"/></svg>
          </div>
          <div className={styles.succTitle}>Points crédités !</div>
          <div className={styles.succSub}>{client.name} a reçu ses points</div>
          <div className={styles.succPts}>+{total} pts</div>
          <div className={styles.succTotal}>Nouveau total : {(client.pts + total).toLocaleString()} pts</div>
          <div className={styles.succRecap}>
            <div className={styles.recapTitle}>Articles encaissés</div>
            {Object.entries(grouped).map(([n, g]) => (
              <div key={n} className={styles.recapRow}><span>{n}{g.cnt > 1 ? ` ×${g.cnt}` : ''}</span><span>+{g.pts * g.cnt} pts</span></div>
            ))}
          </div>
          <button className={styles.btnBlue} onClick={() => { setState('home'); setClient(null); setSearch('') }}>
            Encaisser un autre client
          </button>
        </div>
      </div>
    </div>
  )

  if (state === 'caisse') return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.title}>Encaissement — {client.name}</div>
          <div className={styles.sub}>Ajoutez les articles et validez pour créditer les points</div>
        </div>
        <button className={styles.btnBack} onClick={() => setState('home')}>← Retour</button>
      </div>
      <div className={styles.content}>
        <div className={styles.caisseLayout}>
          <div>
            <div className={styles.clientMini}>
              <div className={styles.cmAv} style={{ background: client.color }}>{client.ini}</div>
              <div><div className={styles.cmName}>{client.name}</div><div className={styles.cmEmail}>{client.email}</div></div>
            </div>
            <div className={styles.ptsBig}>
              <div className={styles.ptsBigLbl}>Points actuels</div>
              <div className={styles.ptsBigVal}>{client.pts.toLocaleString()}</div>
              <div className={styles.ptsBarBg}><div className={styles.ptsBarFill} style={{ width: `${Math.min(100, (client.pts / 2000) * 100)}%` }} /></div>
              <div className={styles.ptsNext}>{REWARDS.find(r => r.pts > client.pts) ? `Encore ${REWARDS.find(r => r.pts > client.pts).pts - client.pts} pts → ${REWARDS.find(r => r.pts > client.pts).name}` : 'Toutes les récompenses débloquées'}</div>
            </div>
            <div className={styles.rewardsTitle}>Récompenses disponibles</div>
            {REWARDS.map(r => (
              <div key={r.name} className={styles.rewRow}>
                <div><div className={styles.rewName}>{r.name}</div><div className={styles.rewPts}>{r.pts} pts</div></div>
                <button className={client.pts >= r.pts ? styles.rewBtnOk : styles.rewBtnNo}>{client.pts >= r.pts ? 'Utiliser' : 'Non dispo'}</button>
              </div>
            ))}
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle} style={{ marginBottom: 14 }}>Articles achetés</div>
            <div className={styles.catPills}>
              {CATS.map((c, i) => <button key={c.name} className={`${styles.catPill} ${i === selCat ? styles.catActive : ''}`} onClick={() => setSelCat(i)}>{c.name}</button>)}
            </div>
            <div className={styles.artsGrid}>
              {CATS[selCat].arts.map((a, i) => {
                const cnt = panier.filter(p => p.n === a.n).length
                return (
                  <button key={i} className={`${styles.artBtn} ${cnt > 0 ? styles.artSel : ''}`} onClick={() => addArt(a)}>
                    {cnt > 0 && <div className={styles.artCount}>×{cnt}</div>}
                    <div className={styles.artName}>{a.n}</div>
                    <div className={styles.artPts}>+{a.pts} pt{a.pts > 1 ? 's' : ''}</div>
                    <div className={styles.artPrice}>{a.p}</div>
                  </button>
                )
              })}
            </div>
            <div className={styles.panier}>
              <div className={styles.panTitle}>Panier</div>
              {panier.length === 0 ? <div className={styles.panEmpty}>Aucun article ajouté</div> : (
                <>
                  {Object.entries(grouped).map(([n, g]) => (
                    <div key={n} className={styles.panRow}>
                      <span className={styles.panName}>{n}{g.cnt > 1 ? ` ×${g.cnt}` : ''}</span>
                      <span className={styles.panPts}>+{g.pts * g.cnt} pts</span>
                      <button className={styles.panDel} onClick={() => removeGroup(n)}>✕</button>
                    </div>
                  ))}
                  <div className={styles.panTotal}>
                    <span>Points à créditer</span>
                    <span className={styles.panTotalPts}>+{total} pts</span>
                  </div>
                </>
              )}
            </div>
            <button className={styles.btnValider} disabled={panier.length === 0} onClick={valider}>
              Valider et créditer les points
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.title}>Encaisser</div>
          <div className={styles.sub}>QR Code d'inscription + scanner pour créditer les points</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.twoCol}>
          {/* QR BOUTIQUE */}
          <div className={`${styles.card} ${styles.qrCard}`}>
            <div className={styles.qrBadge}>QR Code de votre boutique</div>
            <div className={styles.qrTitle}>Affichage en boutique — Inscription clients</div>
            <div className={styles.qrDesc}>Imprimez ce QR code et posez-le sur votre comptoir. Vos clients le scannent pour créer leur compte fidélité.</div>
            <div className={styles.qrBody}>
              <div className={styles.qrSvgWrap}>
                <svg width="90" height="90" viewBox="0 0 120 120">
                  <rect width="120" height="120" fill="white"/>
                  <rect x="8" y="8" width="34" height="34" rx="4" fill="#0F172A"/><rect x="13" y="13" width="24" height="24" rx="2" fill="white"/><rect x="18" y="18" width="14" height="14" rx="1" fill="#0F172A"/>
                  <rect x="78" y="8" width="34" height="34" rx="4" fill="#0F172A"/><rect x="83" y="13" width="24" height="24" rx="2" fill="white"/><rect x="88" y="18" width="14" height="14" rx="1" fill="#0F172A"/>
                  <rect x="8" y="78" width="34" height="34" rx="4" fill="#0F172A"/><rect x="13" y="83" width="24" height="24" rx="2" fill="white"/><rect x="18" y="88" width="14" height="14" rx="1" fill="#0F172A"/>
                  <rect x="50" y="8" width="6" height="6" fill="#0F172A"/><rect x="58" y="8" width="6" height="6" fill="#0F172A"/>
                  <rect x="50" y="50" width="6" height="6" fill="#2563EB"/><rect x="60" y="50" width="6" height="6" fill="#0F172A"/>
                  <rect x="70" y="50" width="6" height="6" fill="#2563EB"/><rect x="50" y="60" width="6" height="6" fill="#0F172A"/>
                  <rect x="60" y="60" width="6" height="6" fill="#2563EB"/><rect x="70" y="70" width="6" height="6" fill="#0F172A"/>
                  <rect x="52" y="52" width="16" height="16" rx="3" fill="white"/><rect x="54" y="54" width="12" height="12" rx="2" fill="#2563EB"/>
                </svg>
              </div>
              <div>
                <div className={styles.qrUrl}>fideleapp.fr/rejoindre/boulangerie-martin</div>
                <div className={styles.qrHint}>Le client scanne → crée son compte → reçoit son QR code personnel</div>
                <div className={styles.qrBtns}>
                  <button className={styles.btnBlue}>Télécharger</button>
                  <button className={styles.btnOutline}>Imprimer</button>
                </div>
              </div>
            </div>
          </div>

          {/* TROUVER CLIENT */}
          <div className={styles.card}>
            <div className={styles.cardTitle} style={{ marginBottom: 4 }}>Trouver un client</div>
            <div className={styles.cardSub} style={{ marginBottom: 14 }}>Scannez le QR code de votre client ou recherchez-le par nom</div>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${tab === 'scan' ? styles.tabActive : ''}`} onClick={() => setTab('scan')}>Scanner le QR client</button>
              <button className={`${styles.tab} ${tab === 'search' ? styles.tabActive : ''}`} onClick={() => setTab('search')}>Rechercher par nom</button>
            </div>
            {tab === 'scan' ? (
              <div>
                <div className={styles.scannerWrap}>
                  <div className={styles.scannerHeader}><span>Pointez la caméra vers le QR code du client</span></div>
                  <div className={styles.scannerBody}>
                    <div className={styles.scannerFrame}>
                      <div className={`${styles.corner} ${styles.cornerTL}`}/>
                      <div className={`${styles.corner} ${styles.cornerTR}`}/>
                      <div className={`${styles.corner} ${styles.cornerBL}`}/>
                      <div className={`${styles.corner} ${styles.cornerBR}`}/>
                      <div className={styles.scanLine}/>
                    </div>
                    <div className={styles.scanHint}>En attente du QR code client...</div>
                    <button className={styles.btnDemoScan} onClick={() => selectClient(CLIENTS[0])}>Simuler un scan (démo)</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.searchWrap}>
                  <input className={styles.searchInput} placeholder="Nom du client, téléphone..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className={styles.clientList}>
                  {filtered.map(c => (
                    <div key={c.id} className={styles.clientRow} onClick={() => selectClient(c)}>
                      <div className={styles.cAv} style={{ background: c.color }}>{c.ini}</div>
                      <div className={styles.cName}>{c.name}</div>
                      <div className={styles.cPts}>{c.pts.toLocaleString()} pts</div>
                      <span>›</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
