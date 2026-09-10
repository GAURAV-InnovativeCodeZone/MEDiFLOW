import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, Mail, Lock, Eye, EyeOff, Building2, ArrowRight } from 'lucide-react'
import useAuthStore from '../store/authStore'

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '', hospitalSlug: 'default' })
  const [showPw, setShowPw]   = useState(false)
  const { login, isLoading, error } = useAuthStore()
  const navigate = useNavigate()
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login(form.email, form.password, form.hospitalSlug)
    if (res.success) navigate('/dashboard')
  }

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── LEFT PANEL ── */}
      <div style={S.left} className="auth-left">
        <div style={S.gridBg} />
        <div style={S.glow1} /><div style={S.glow2} />

        <div style={{ position:'relative', zIndex:1, width:'100%' }}>
          {/* Logo */}
          <div style={S.logoRow}>
            <div style={S.logoIcon}><Activity size={20} color="#fff" /></div>
            <span style={S.logoText}>MEDi<span style={{color:'#00C6A7'}}>FLOW</span></span>
          </div>

          <h1 style={S.leftH1}>
            Your hospital,<br/>
            <span style={S.grad}>fully connected.</span>
          </h1>
          <p style={S.leftSub}>
            One platform for patients, doctors, appointments,
            billing, and real-time analytics — all in one place.
          </p>

          {/* Pills */}
          <div style={S.pills}>
            {['Role-Based Access','Real-Time Queue','AI Assistant','Secure JWT Auth'].map(t => (
              <span key={t} style={S.pill}>
                <span style={S.pillDot}/>
                {t}
              </span>
            ))}
          </div>

          {/* ECG */}
          <svg viewBox="0 0 480 56" fill="none" aria-hidden="true"
            style={{width:'100%',maxWidth:420,height:44,marginTop:36,opacity:.55}}>
            <defs>
              <linearGradient id="eg" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#1E6FBF" stopOpacity=".1"/>
                <stop offset="40%"  stopColor="#60a5fa"/>
                <stop offset="70%"  stopColor="#00C6A7"/>
                <stop offset="100%" stopColor="#00C6A7" stopOpacity=".1"/>
              </linearGradient>
            </defs>
            <path d="M0,28 L45,28 L60,28 L74,28 L84,7 L92,49 L100,3 L110,53 L120,28 L145,28 L163,28 L175,28 L183,10 L191,46 L199,3 L209,53 L219,28 L244,28 L262,28 L274,28 L282,12 L290,44 L298,5 L308,51 L318,28 L343,28 L361,28 L373,28 L381,14 L389,42 L397,7 L407,49 L417,28 L448,28 L480,28"
              stroke="url(#eg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              style={{strokeDasharray:1050,strokeDashoffset:1050,animation:'ecgDraw 2.4s ease .4s forwards'}}/>
          </svg>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={S.right}>
        <div style={S.card}>

          {/* mobile logo */}
          <div style={S.mobileLogo} className="auth-mobile-logo">
            <div style={S.logoIcon}><Activity size={17} color="#fff"/></div>
            <span style={{fontWeight:800,fontSize:'1rem',color:'#0A1628'}}>
              MEDi<span style={{color:'#00C6A7'}}>FLOW</span>
            </span>
          </div>

          <h2 style={S.cardTitle}>Welcome back</h2>
          <p  style={S.cardSub}>Sign in to your hospital dashboard</p>

          {/* Error */}
          {error && (
            <div style={S.errorBox}>
              <span style={S.errorDot}/>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Hospital slug */}
            <Field label="Hospital">
              <IcoInput icon={<Building2 size={15} color="#94a3b8"/>}>
                <input
                  value={form.hospitalSlug}
                  onChange={e => set('hospitalSlug', e.target.value)}
                  placeholder="default"
                  style={S.inp}
                  onFocus={focusOn} onBlur={focusOff}
                />
              </IcoInput>
            </Field>

            {/* Email */}
            <Field label="Email address">
              <IcoInput icon={<Mail size={15} color="#94a3b8"/>}>
                <input
                  type="email" required autoComplete="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="admin@hospital.com"
                  style={S.inp}
                  onFocus={focusOn} onBlur={focusOff}
                />
              </IcoInput>
            </Field>

            {/* Password */}
            <Field label="Password">
              <IcoInput icon={<Lock size={15} color="#94a3b8"/>} end={
                <button type="button" onClick={()=>setShowPw(s=>!s)} style={S.eyeBtn} aria-label="toggle">
                  {showPw ? <EyeOff size={15} color="#94a3b8"/> : <Eye size={15} color="#94a3b8"/>}
                </button>
              }>
                <input
                  type={showPw ? 'text' : 'password'} required autoComplete="current-password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="••••••••"
                  style={{...S.inp, paddingRight:42}}
                  onFocus={focusOn} onBlur={focusOff}
                />
              </IcoInput>
            </Field>

            <button type="submit" disabled={isLoading} style={{...S.submitBtn, opacity: isLoading?.75:1, cursor: isLoading?'not-allowed':'pointer'}}
              onMouseEnter={e=>{if(!isLoading)e.currentTarget.style.background='linear-gradient(135deg,#1d4ed8,#1e40af)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='linear-gradient(135deg,#2563eb,#1d4ed8)'}}>
              {isLoading
                ? <><span style={S.spinner}/> Signing in…</>
                : <>Sign in to Dashboard <ArrowRight size={15}/></>}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={S.demoBox}>
            <p style={S.demoTitle}>Demo accounts</p>
            {[
              ['Admin',   'admin@hospital.com',    'admin123'  ],
              ['Doctor',  'doctor1@hospital.com',  'doctor123' ],
              ['Patient', 'patient1@email.com',    'patient123'],
            ].map(([role,email,pw]) => (
              <button key={role} type="button" style={S.demoRow}
                onClick={() => setForm(f => ({...f, email, password: pw}))}
                onMouseEnter={e=>e.currentTarget.style.background='#f1f5f9'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <span style={S.demoRole}>{role}</span>
                <span style={S.demoEmail}>{email}</span>
                <span style={S.demoFill}>Fill →</span>
              </button>
            ))}
          </div>

          <p style={S.switchTxt}>
            No account?{' '}
            <Link to="/register" style={S.switchLink}>Create one</Link>
          </p>
          <Link to="/" style={S.backLink}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}

/* ── tiny helpers ── */
function Field({ label, children }) {
  return (
    <div style={{marginBottom:16}}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  )
}
function IcoInput({ icon, end, children }) {
  return (
    <div style={{position:'relative'}}>
      <span style={S.icoLeft}>{icon}</span>
      {children}
      {end && <span style={S.icoRight}>{end}</span>}
    </div>
  )
}
const focusOn  = e => { e.target.parentElement.querySelector('input,select').style.borderColor = '#2563eb' ; e.target.style.borderColor='#2563eb' }
const focusOff = e => { e.target.style.borderColor='#e2e8f0' }

/* ── styles ── */
const S = {
  page:      { minHeight:'100vh', display:'flex', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" },
  left:      { flex:'0 0 46%', background:'linear-gradient(135deg,#0A1628 0%,#0d2040 55%,#0f2750 100%)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', padding:'3rem 3.5rem' },
  gridBg:    { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' },
  glow1:     { position:'absolute', top:'18%', left:'8%',  width:320, height:320, background:'#2563eb', borderRadius:'50%', filter:'blur(110px)', opacity:.11, pointerEvents:'none' },
  glow2:     { position:'absolute', bottom:'12%', right:'4%', width:240, height:240, background:'#00C6A7', borderRadius:'50%', filter:'blur(100px)', opacity:.08, pointerEvents:'none' },
  logoRow:   { display:'flex', alignItems:'center', gap:10, marginBottom:36 },
  logoIcon:  { width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#2563eb,#00C6A7)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(37,99,235,.4)' },
  logoText:  { fontWeight:800, fontSize:'1.1rem', color:'#fff', letterSpacing:-0.5 },
  leftH1:    { fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:800, color:'#fff', lineHeight:1.15, letterSpacing:-1, marginBottom:14 },
  grad:      { background:'linear-gradient(135deg,#93c5fd,#00C6A7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' },
  leftSub:   { fontSize:'0.92rem', color:'#94a3b8', lineHeight:1.75, maxWidth:380, marginBottom:28 },
  pills:     { display:'flex', flexWrap:'wrap', gap:10 },
  pill:      { display:'inline-flex', alignItems:'center', gap:7, padding:'5px 12px', borderRadius:50, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', fontSize:12, fontWeight:500, color:'#cbd5e1' },
  pillDot:   { width:6, height:6, borderRadius:'50%', background:'#00C6A7', display:'inline-block' },
  right:     { flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem', background:'#F7FAFF' },
  card:      { width:'100%', maxWidth:420, background:'#fff', borderRadius:20, padding:'2.4rem 2.6rem', boxShadow:'0 8px 40px rgba(0,0,0,.08)', border:'1px solid #f1f5f9' },
  mobileLogo:{ display:'none', alignItems:'center', gap:9, marginBottom:22 },
  cardTitle: { fontSize:'1.5rem', fontWeight:800, color:'#0A1628', letterSpacing:-0.5, marginBottom:5 },
  cardSub:   { fontSize:'0.875rem', color:'#64748b', marginBottom:24, lineHeight:1.5 },
  errorBox:  { display:'flex', alignItems:'center', gap:9, padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, marginBottom:20, fontSize:13, color:'#dc2626', fontWeight:500 },
  errorDot:  { width:7, height:7, borderRadius:'50%', background:'#ef4444', flexShrink:0, display:'inline-block' },
  label:     { display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:7 },
  icoLeft:   { position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', display:'flex' },
  icoRight:  { position:'absolute', right:0,  top:0, bottom:0, display:'flex', alignItems:'center' },
  inp:       { width:'100%', padding:'11px 14px 11px 40px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:13.5, color:'#0f172a', background:'#fff', outline:'none', transition:'border-color .2s', boxSizing:'border-box' },
  eyeBtn:    { background:'none', border:'none', cursor:'pointer', padding:'0 12px', display:'flex', alignItems:'center', height:'100%' },
  submitBtn: { width:'100%', marginTop:8, padding:'12px', borderRadius:11, border:'none', background:'linear-gradient(135deg,#2563eb,#1d4ed8)', color:'#fff', fontWeight:700, fontSize:'0.925rem', fontFamily:'inherit', boxShadow:'0 6px 20px rgba(37,99,235,.35)', transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 },
  spinner:   { width:15, height:15, border:'2px solid rgba(255,255,255,.3)', borderTop:'2px solid #fff', borderRadius:'50%', display:'inline-block', animation:'spin .7s linear infinite' },
  demoBox:   { marginTop:22, padding:'14px 16px', background:'#f8fafc', borderRadius:12, border:'1px solid #e2e8f0' },
  demoTitle: { fontSize:11.5, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:1, marginBottom:10 },
  demoRow:   { display:'flex', alignItems:'center', width:'100%', padding:'6px 8px', borderRadius:7, border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', transition:'background .15s', textAlign:'left' },
  demoRole:  { fontSize:12, fontWeight:700, color:'#334155', width:54 },
  demoEmail: { fontSize:12, color:'#64748b', flex:1 },
  demoFill:  { fontSize:11, color:'#2563eb', fontWeight:600 },
  switchTxt: { textAlign:'center', marginTop:20, fontSize:13, color:'#6b7280' },
  switchLink:{ color:'#2563eb', fontWeight:600, textDecoration:'none' },
  backLink:  { display:'block', textAlign:'center', marginTop:12, fontSize:12.5, color:'#94a3b8', textDecoration:'none' },
}

const css = `
  @keyframes ecgDraw { to { stroke-dashoffset: 0; } }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @media (max-width: 768px) {
    .auth-left        { display: none !important; }
    .auth-mobile-logo { display: flex !important; }
  }
`
