import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ClientSignup.module.css'

export default function ClientSignup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', tel: '', password: '', accept: false })
  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.shopLogo}>BM</div>
        <h2 className={styles.shopName}>Boulangerie Martin</h2>
        <p className={styles.shopSub}>Rejoignez le programme de fidélité et gagnez des points à chaque visite</p>
      </div>

      <div className={styles.body}>
        <div className={styles.bonusBanner}>
          100 points offerts dès votre inscription !
        </div>

        <div className={styles.field}><label>Prénom et nom</label><input type="text" placeholder="Marie Dupont" value={form.name} onChange={e => handle('name', e.target.value)} /></div>
        <div className={styles.field}><label>Email</label><input type="email" placeholder="marie@email.fr" value={form.email} onChange={e => handle('email', e.target.value)} /></div>
        <div className={styles.field}><label>Téléphone</label><input type="tel" placeholder="06 12 34 56 78" value={form.tel} onChange={e => handle('tel', e.target.value)} /></div>
        <div className={styles.field}><label>Mot de passe</label><input type="password" placeholder="Choisissez un mot de passe" value={form.password} onChange={e => handle('password', e.target.value)} /></div>

        <div className={styles.checkRow}>
          <input type="checkbox" id="accept" checked={form.accept} onChange={e => handle('accept', e.target.checked)} />
          <label htmlFor="accept">J'accepte de recevoir des notifications de la Boulangerie Martin concernant mes points et récompenses.</label>
        </div>

        <button className={styles.btnBlue} onClick={() => navigate('/ma-carte')}>
          Créer mon compte fidélité →
        </button>

        <p className={styles.note}>Déjà un compte ? <span className={styles.link}>Se connecter</span></p>
        <p className={styles.legal}>Programme géré par FidèleApp · Données protégées conformément au RGPD</p>
      </div>
    </div>
  )
}
