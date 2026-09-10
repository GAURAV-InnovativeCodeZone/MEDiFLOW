import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Activity, ArrowRight, ChevronDown, ShieldCheck, Users, UserCog,
  CalendarCheck, Timer, CreditCard, BarChart3, Bell, Zap, Lock,
  Cpu, Container, Stethoscope, Menu, X
} from 'lucide-react'

/* ── Intersection observer hook ── */
function useVisible(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

/* ── Animated counter hook ── */
function useCounter(target, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const isFloat = target % 1 !== 0
    const duration = 1800
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(isFloat ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return count
}

/* ── Data ── */
const FEATURES = [
  { icon: Users,        title: 'Patient Management',       desc: 'Unified patient profiles with complete medical history, visit logs, and treatment timelines in one accessible record.',          color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  { icon: UserCog,      title: 'Doctor Management',        desc: 'Manage physician profiles, specializations, schedules, and department assignments with role-based permissions.',                   color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe' },
  { icon: CalendarCheck,title: 'Appointment Scheduling',   desc: 'Smart booking engine with conflict detection, automated reminders, and multi-department slot management.',                        color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  { icon: Timer,        title: 'Real-Time Queue Tracking', desc: 'Live patient queue visibility across departments, reducing wait times and improving floor coordination.',                           color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
  { icon: CreditCard,   title: 'Billing & Payments',       desc: 'End-to-end billing workflows with itemized invoicing, payment tracking, and financial audit trails.',                              color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  { icon: BarChart3,    title: 'Analytics Dashboard',      desc: 'Operational KPIs, patient trends, revenue reports, and custom metrics visualized in real-time dashboards.',                        color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
]

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: 'Role-Based Access Control', desc: 'Granular permissions per role — Admins, Doctors, Receptionists, and Patients each see only what they need.',         tag: 'Security'       },
  { icon: Bell,        title: 'Real-Time Notifications',   desc: 'Instant in-platform alerts for appointment changes, queue updates, and critical patient flags.',                        tag: 'Live Updates'   },
  { icon: Zap,         title: 'WebSocket Support',         desc: 'Persistent connections ensure your dashboard reflects the hospital floor state without a page refresh.',               tag: 'Infrastructure' },
  { icon: Lock,        title: 'Secure Authentication',     desc: 'JWT-based auth with refresh tokens, bcrypt password hashing, and session expiry policies baked in.',                   tag: 'Auth'           },
  { icon: Cpu,         title: 'AI-Ready Architecture',     desc: 'Modular API design makes it straightforward to plug in triage prediction, diagnostics, or scheduling AI.',            tag: 'Future-Proof'   },
  { icon: Container,   title: 'Dockerized Infrastructure', desc: 'Fully containerized with Docker Compose — PostgreSQL, Redis, FastAPI, and Nginx in a single command.',               tag: 'DevOps'         },
]

const STATS = [
  { icon: Users,        value: 1000,  suffix: '+', label: 'Patients Managed',     desc: 'Active records across all departments',      color: '#2563eb', grad: 'linear-gradient(135deg,#2563eb,#1d4ed8)' },
  { icon: Stethoscope,  value: 100,   suffix: '+', label: 'Doctors Onboarded',    desc: 'Multi-specialty physicians on the platform', color: '#7c3aed', grad: 'linear-gradient(135deg,#7c3aed,#6d28d9)' },
  { icon: CalendarCheck,value: 5000,  suffix: '+', label: 'Appointments',         desc: 'Scheduled, completed & tracked seamlessly',  color: '#0d9488', grad: 'linear-gradient(135deg,#0d9488,#0f766e)' },
  { icon: Activity,     value: 99.9,  suffix: '%', label: 'System Availability',  desc: 'Uptime backed by containerized infra',       color: '#059669', grad: 'linear-gradient(135deg,#059669,#047857)', isFloat: true },
]

/* ── ECG SVG ── */
function EcgLine() {
  return (
    <svg viewBox="0 0 600 70" fill="none" aria-hidden="true" style={{ width: '100%', height: 56 }}>
      <defs>
        <linearGradient id="eg" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1E6FBF" stopOpacity="0.15" />
          <stop offset="40%"  stopColor="#1E6FBF" />
          <stop offset="70%"  stopColor="#00C6A7" />
          <stop offset="100%" stopColor="#00C6A7" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d="M0,35 L55,35 L75,35 L95,35 L110,8 L120,62 L130,3 L143,67 L155,35 L185,35 L205,35 L220,35 L230,12 L240,58 L250,3 L263,67 L275,35 L305,35 L325,35 L340,35 L350,15 L360,55 L370,5 L383,65 L395,35 L425,35 L445,35 L460,35 L470,18 L480,52 L490,7 L503,63 L515,35 L555,35 L600,35"
        stroke="url(#eg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 1300, strokeDashoffset: 1300, animation: 'ecgDraw 2.5s ease 0.6s forwards, ecgPulse 2s ease 3.2s infinite alternate' }}
      />
    </svg>
  )
}

/* ── Gradient heading span ── */
const G = ({ children }) => (
  <span style={{ background: 'linear-gradient(135deg,#1E6FBF,#00C6A7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    {children}
  </span>
)

/* ── Section header ── */
function SHead({ eyebrow, eyeColor = '#2563eb', title, grad, sub }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 52 }}>
      <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: eyeColor, marginBottom: 10 }}>{eyebrow}</span>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.35rem)', fontWeight: 800, color: '#0A1628', letterSpacing: -0.5, lineHeight: 1.15, marginBottom: 12 }}>
        {title} <G>{grad}</G>
      </h2>
      <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: 510, margin: '0 auto', lineHeight: 1.75 }}>{sub}</p>
    </div>
  )
}

/* ── Feature card ── */
function FCard({ f, delay }) {
  const [ref, vis] = useVisible()
  const Icon = f.icon
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 18, padding: '1.5rem',
        border: `1px solid ${f.border}`, position: 'relative', overflow: 'hidden',
        boxShadow: hovered ? '0 18px 40px rgba(37,99,235,0.11)' : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: vis ? 1 : 0,
        transform: vis ? (hovered ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(22px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.25s ease`,
      }}>
      {/* top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 24, right: 24, height: 2, borderRadius: '0 0 4px 4px', background: `linear-gradient(90deg,${f.color},${f.color}88)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }} />
      <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <Icon size={20} color={f.color} />
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0A1628', marginBottom: 6 }}>{f.title}</div>
      <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.7 }}>{f.desc}</div>
    </div>
  )
}

/* ── Highlight card ── */
function HCard({ h, delay }) {
  const [ref, vis] = useVisible()
  const Icon = h.icon
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 18, padding: '1.4rem',
        display: 'flex', gap: 14, alignItems: 'flex-start',
        boxShadow: hovered ? '0 14px 32px rgba(0,198,167,0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
        opacity: vis ? 1 : 0,
        transform: vis ? (hovered ? 'translateY(-3px)' : 'translateY(0)') : 'translateY(20px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.25s ease`,
      }}>
      <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 11, background: 'linear-gradient(135deg,#1e293b,#334155)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} color="#00C6A7" />
      </div>
      <div>
        <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0d9488', background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: 50, padding: '2px 9px', marginBottom: 5 }}>{h.tag}</span>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0A1628', marginBottom: 4 }}>{h.title}</div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.65 }}>{h.desc}</div>
      </div>
    </div>
  )
}

/* ── Stat card ── */
function SCard({ s, delay }) {
  const [ref, vis] = useVisible(0.2)
  const count = useCounter(s.value, vis)
  const Icon = s.icon
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: '1.5rem',
        boxShadow: hovered ? '0 14px 32px rgba(0,198,167,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: vis ? 1 : 0,
        transform: vis ? (hovered ? 'translateY(-3px)' : 'translateY(0)') : 'translateY(22px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.25s ease`,
      }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: s.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <Icon size={20} color="#fff" />
      </div>
      <div style={{ fontSize: 'clamp(1.85rem,4vw,2.5rem)', fontWeight: 800, color: s.color, letterSpacing: -1, lineHeight: 1, marginBottom: 4 }}>
        {count}{s.suffix}
      </div>
      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{s.label}</div>
      <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>{s.desc}</div>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN LANDING PAGE
══════════════════════════════════════════ */
export default function Landing() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif", background: '#F7FAFF', overflowX: 'hidden' }}>

      {/* ────────────── ANIMATIONS ────────────── */}
      <style>{`
        @keyframes ecgDraw  { to { stroke-dashoffset: 0; } }
        @keyframes ecgPulse { from { filter: drop-shadow(0 0 2px #00C6A7); } to { filter: drop-shadow(0 0 9px #00C6A7); } }
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
        @keyframes bounceY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .lp-fadeup { animation: fadeUp 0.55s ease both; }
        .lp-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        .lp-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
        .lp-nav-desktop { display: flex; }
        .lp-hamburger   { display: none; }
        @media (max-width: 960px) {
          .lp-grid-3 { grid-template-columns: repeat(2,1fr) !important; }
          .lp-grid-4 { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .lp-grid-3 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .lp-nav-desktop { display: none !important; }
          .lp-hamburger   { display: block !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ────────────── NAVBAR ────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        padding: '0 1.5rem',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.07)' : 'none',
        borderBottom: scrolled ? '1px solid #f1f5f9' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>

          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2563eb,#00C6A7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
              <Activity size={19} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: scrolled ? '#0A1628' : '#fff', letterSpacing: -0.5 }}>
              MEDi<span style={{ color: '#00C6A7' }}>FLOW</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="lp-nav-desktop" style={{ gap: 32 }}>
            {[['features','Features'],['highlights','Platform'],['stats','Statistics']].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '0.875rem', fontWeight: 500,
                color: scrolled ? '#475569' : 'rgba(255,255,255,0.78)',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? '#475569' : 'rgba(255,255,255,0.78)'}
              >{label}</button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="lp-nav-desktop" style={{ gap: 10 }}>
            <Link to="/login" style={{
              padding: '0.45rem 1.1rem', borderRadius: 9, fontSize: '0.875rem', fontWeight: 600,
              border: scrolled ? '1.5px solid #bfdbfe' : '1.5px solid rgba(255,255,255,0.22)',
              color: scrolled ? '#2563eb' : '#fff',
              background: scrolled ? 'transparent' : 'rgba(255,255,255,0.07)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>Login</Link>
            <Link to="/register" style={{
              padding: '0.45rem 1.1rem', borderRadius: 9, fontSize: '0.875rem', fontWeight: 600,
              background: '#2563eb', color: '#fff', border: 'none', textDecoration: 'none',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
            >Register</Link>
          </div>

          {/* Hamburger */}
          <button className="lp-hamburger" onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? '#334155' : '#fff', padding: 6 }}
            aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['features','Features'],['highlights','Platform'],['stats','Statistics']].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                textAlign: 'left', padding: '0.6rem 0.75rem', borderRadius: 8,
                color: '#334155', fontSize: '0.9rem', fontWeight: 500,
              }}>{label}</button>
            ))}
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: '0.7rem', marginTop: 4,
              border: '1.5px solid #bfdbfe', borderRadius: 10, color: '#2563eb',
              fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            }}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: '0.7rem',
              background: '#2563eb', color: '#fff', borderRadius: 10,
              fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            }}>Register</Link>
          </div>
        )}
      </nav>

      {/* ────────────── HERO ────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#0A1628 0%,#0d2040 55%,#0f2750 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.032) 1px,transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '22%', left: '28%', width: 420, height: 420, background: '#2563eb', borderRadius: '50%', filter: 'blur(130px)', opacity: 0.11, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '58%', right: '18%', width: 300, height: 300, background: '#00C6A7', borderRadius: '50%', filter: 'blur(110px)', opacity: 0.08, pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '7rem 1.5rem 3rem' }}>

          {/* Badge */}
          <div className="lp-fadeup" style={{ animationDelay: '0.1s', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 50, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)', fontSize: 11.5, fontWeight: 600, color: '#5eead4', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C6A7', animation: 'blink 2s ease infinite', display: 'inline-block' }} />
            Platform v2.0 — Now with AI-Ready Architecture
          </div>

          {/* Logo mark */}
          <div className="lp-fadeup" style={{ animationDelay: '0.2s', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <div style={{ width: 52, height: 52, borderRadius: 15, background: 'linear-gradient(135deg,#3b82f6,#00C6A7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 36px rgba(37,99,235,0.4)' }}>
              <Activity size={26} color="#fff" />
            </div>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
              MEDi<span style={{ color: '#00C6A7' }}>FLOW</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="lp-fadeup" style={{ animationDelay: '0.3s', fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 820, marginBottom: 20 }}>
            Smart Hospital{' '}
            <span style={{ background: 'linear-gradient(135deg,#93c5fd 0%,#00C6A7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Management
            </span>
            {' '}Platform
          </h1>

          {/* Subtitle */}
          <p className="lp-fadeup" style={{ animationDelay: '0.4s', fontSize: 'clamp(0.9rem,2.2vw,1.07rem)', color: '#94a3b8', maxWidth: 590, lineHeight: 1.75, marginBottom: 40 }}>
            Streamlining patient care, appointments, hospital operations, and healthcare workflows through a modern digital platform.
          </p>

          {/* Buttons */}
          <div className="lp-fadeup" style={{ animationDelay: '0.5s', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 44 }}>
            <Link to="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 2rem',
              borderRadius: 12, fontSize: '0.925rem', fontWeight: 700,
              background: '#2563eb', color: '#fff', textDecoration: 'none',
              boxShadow: '0 8px 26px rgba(37,99,235,0.4)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Login to Dashboard <ArrowRight size={16} />
            </Link>
            <button onClick={() => scrollTo('features')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 2rem',
              borderRadius: 12, fontSize: '0.925rem', fontWeight: 700,
              background: 'rgba(255,255,255,0.07)', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.14)', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            >Learn More</button>
          </div>

          {/* Trust strip */}
          <div className="lp-fadeup" style={{ animationDelay: '0.6s', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginBottom: 28 }}>
            {['HIPAA-Aware Architecture', 'Role-Based Access Control', 'Dockerized & Scalable'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500 }}>
                <ShieldCheck size={13} color="#00C6A7" /> {t}
              </span>
            ))}
          </div>

          {/* ECG */}
          <div className="lp-fadeup" style={{ animationDelay: '0.75s', width: '100%', maxWidth: 660, opacity: 0.65 }}>
            <EcgLine />
          </div>
        </div>

        {/* Scroll hint */}
        <div onClick={() => scrollTo('features')} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, paddingBottom: 28, cursor: 'pointer' }}>
          <span style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#475569' }}>Explore</span>
          <ChevronDown size={18} color="#475569" style={{ animation: 'bounceY 2s ease infinite' }} />
        </div>

        {/* Fade into light bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, background: 'linear-gradient(to top,#F7FAFF,transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ────────────── FEATURES ────────────── */}
      <section id="features" style={{ padding: '5.5rem 1.5rem', background: '#F7FAFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SHead
            eyebrow="Core Modules" eyeColor="#2563eb"
            title="Everything a hospital needs,"
            grad="in one platform"
            sub="MEDiFLOW brings every operational module under a single, unified interface — built for clinical speed and administrative precision."
          />
          <div className="lp-grid-3">
            {FEATURES.map((f, i) => <FCard key={f.title} f={f} delay={i * 75} />)}
          </div>
        </div>
      </section>

      {/* ────────────── HIGHLIGHTS ────────────── */}
      <section id="highlights" style={{ padding: '5.5rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SHead
            eyebrow="Platform Capabilities" eyeColor="#0d9488"
            title="Built for production from"
            grad="day one"
            sub="The infrastructure decisions that make MEDiFLOW reliable, secure, and ready to grow with your hospital."
          />
          <div className="lp-grid-3">
            {HIGHLIGHTS.map((h, i) => <HCard key={h.title} h={h} delay={i * 75} />)}
          </div>
        </div>
      </section>

      {/* ────────────── STATS ────────────── */}
      <section id="stats" style={{ padding: '5.5rem 1.5rem', background: '#F7FAFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SHead
            eyebrow="By the Numbers" eyeColor="#2563eb"
            title="Trusted across the"
            grad="care continuum"
            sub="MEDiFLOW handles the operational load so clinicians can focus on what matters most — the patients."
          />
          <div className="lp-grid-4">
            {STATS.map((s, i) => <SCard key={s.label} s={s} delay={i * 100} />)}
          </div>
        </div>
      </section>

      {/* ────────────── CTA ────────────── */}
      <section style={{ padding: '5.5rem 1.5rem', background: 'linear-gradient(135deg,#0A1628 0%,#0d2040 55%,#0f2750 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.032) 1px,transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '38%', width: 380, height: 380, background: '#2563eb', borderRadius: '50%', filter: 'blur(140px)', opacity: 0.09, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ maxWidth: 540, margin: '0 auto 40px', opacity: 0.5 }}><EcgLine /></div>

          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#00C6A7', marginBottom: 14 }}>Secure Access</span>

          <h2 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 16 }}>
            Ready to Access{' '}
            <span style={{ background: 'linear-gradient(135deg,#93c5fd,#00C6A7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>MEDiFLOW?</span>
          </h2>

          <p style={{ fontSize: 'clamp(0.9rem,2vw,1rem)', color: '#94a3b8', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 36px' }}>
            Login securely and manage hospital operations from a unified platform — patients, schedules, billing, and analytics all in one place.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link to="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '1rem 2.2rem',
              borderRadius: 14, fontSize: '0.95rem', fontWeight: 700,
              background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff',
              textDecoration: 'none', boxShadow: '0 12px 32px rgba(37,99,235,0.4)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#3b82f6,#00C6A7)'; e.currentTarget.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#2563eb,#1d4ed8)'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              <Lock size={16} /> Login to Dashboard <ArrowRight size={16} />
            </Link>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '1rem 2rem',
              borderRadius: 14, fontSize: '0.95rem', fontWeight: 700,
              background: 'rgba(255,255,255,0.07)', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.16)', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            >Create Account <ArrowRight size={16} /></Link>
          </div>

          <p style={{ marginTop: 20, fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <Lock size={11} color="#475569" /> Credentials managed by your hospital IT administrator
          </p>
        </div>
      </section>

      {/* ────────────── FOOTER ────────────── */}
      <footer style={{ background: '#020817', padding: '2rem 1.5rem', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#2563eb,#00C6A7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>MEDi<span style={{ color: '#00C6A7' }}>FLOW</span></span>
          </div>
          <span style={{ fontSize: 12, color: '#475569' }}>© 2026 MEDiFLOW — Internal Hospital Management Platform</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C6A7', animation: 'blink 2s ease infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: '#475569' }}>All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
