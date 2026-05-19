import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.jpg'

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@600;700;800&display=swap');

  :root {
    --ft-bg: #0a0a0a;
    --ft-surface: rgba(255,255,255,0.03);
    --ft-border: rgba(255,255,255,0.06);
    --ft-accent: #3b82f6;
    --ft-accent-dim: rgba(59,130,246,0.12);
    --ft-text: #ffffff;
    --ft-muted: #a1a1aa;
    --ft-dimmer: rgba(255,255,255,0.35);
    --ft-whatsapp: #25d366;
    --ft-whatsapp-dim: rgba(37,211,102,0.12);
  }

  /* ── Reveal ── */
  .ft .reveal {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .ft .reveal.visible { opacity: 1; transform: translateY(0); }

  .ft .stagger > * {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.45s cubic-bezier(0.22,1,0.36,1),
                transform 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .ft .stagger.visible > *:nth-child(1) { transition-delay: 0.04s; }
  .ft .stagger.visible > *:nth-child(2) { transition-delay: 0.09s; }
  .ft .stagger.visible > *:nth-child(3) { transition-delay: 0.14s; }
  .ft .stagger.visible > *:nth-child(4) { transition-delay: 0.19s; }
  .ft .stagger.visible > *:nth-child(5) { transition-delay: 0.24s; }
  .ft .stagger.visible > *:nth-child(6) { transition-delay: 0.29s; }
  .ft .stagger.visible > * { opacity: 1; transform: translateY(0); }

  /* ════ FOOTER ════ */
  .ft {
    background: var(--ft-bg);
    font-family: 'Inter', sans-serif;
    color: var(--ft-text);
    border-top: 1px solid var(--ft-border);
    position: relative;
    overflow: hidden;
  }

  /* Top glow line */
  .ft::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);
    pointer-events: none;
  }

  /* Background orb */
  .ft-orb {
    position: absolute;
    bottom: -120px; right: -80px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(40px);
  }

  /* ── Main grid ── */
  .ft-main {
    max-width: 1160px;
    margin: 0 auto;
    padding: 64px 24px 48px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.4fr;
    gap: 48px;
  }

  @media (max-width: 960px) {
    .ft-main { grid-template-columns: 1fr 1fr; gap: 36px; }
  }
  @media (max-width: 560px) {
    .ft-main { grid-template-columns: 1fr; gap: 32px; padding: 48px 20px 36px; }
  }

  /* ── Brand column ── */
  .ft-brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1rem;
    text-decoration: none;
    cursor: pointer;
  }

  .ft-logo-mark {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(59,130,246,0.3);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
  }

  .ft-logo-mark img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  .ft-brand-logo:hover .ft-logo-mark {
    transform: scale(1.08) rotate(-4deg);
    box-shadow: 0 8px 24px rgba(59,130,246,0.45);
  }

  .ft-brand-logo:hover .ft-logo-mark img {
    filter: brightness(1.05);
  }

  .ft-logo-text {
    font-family: 'Sora', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--ft-text);
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .ft-logo-text span {
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ft-logo-sub {
    font-size: 0.6rem;
    font-weight: 500;
    color: var(--ft-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: block;
  }

  .ft-brand-desc {
    font-size: 0.85rem;
    color: var(--ft-muted);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    max-width: 280px;
  }

  /* Social icons */
  .ft-socials {
    display: flex;
    gap: 10px;
  }
  .ft-social-btn {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: var(--ft-surface);
    border: 1px solid var(--ft-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--ft-muted);
    cursor: pointer;
    text-decoration: none;
    transition: background 0.25s ease, border-color 0.25s ease,
                color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ft-social-btn:hover {
    background: var(--ft-accent-dim);
    border-color: rgba(59,130,246,0.3);
    color: var(--ft-accent);
    transform: translateY(-4px);
  }
  /* WhatsApp specific hover */
  .ft-social-btn.whatsapp:hover {
    background: var(--ft-whatsapp-dim);
    border-color: rgba(37,211,102,0.3);
    color: var(--ft-whatsapp);
  }

  /* ── Column heading ── */
  .ft-col-title {
    font-family: 'Sora', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ft-text);
    margin-bottom: 1.1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ft-col-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--ft-border);
  }

  /* ── Links ── */
  .ft-links {
    list-style: none;
    padding: 0; margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .ft-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.84rem;
    color: var(--ft-muted);
    text-decoration: none;
    padding: 5px 0;
    cursor: pointer;
    transition: color 0.2s ease, gap 0.2s ease;
    background: none;
    border: none;
    font-family: 'Inter', sans-serif;
    text-align: left;
  }
  .ft-link::before {
    content: '';
    width: 0;
    height: 1px;
    background: var(--ft-accent);
    transition: width 0.2s ease;
    flex-shrink: 0;
  }
  .ft-link:hover {
    color: var(--ft-text);
    gap: 10px;
  }
  .ft-link:hover::before { width: 10px; }

  /* ── Contact column ── */
  .ft-contact-items {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .ft-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    font-size: 0.83rem;
    color: var(--ft-muted);
    line-height: 1.55;
  }
  .ft-contact-icon {
    width: 32px; height: 32px; flex-shrink: 0;
    border-radius: 8px;
    background: var(--ft-surface);
    border: 1px solid var(--ft-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--ft-accent);
    margin-top: 1px;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.25s ease;
  }
  .ft-contact-item:hover .ft-contact-icon {
    background: var(--ft-accent-dim);
    border-color: rgba(59,130,246,0.3);
    transform: scale(1.08);
  }
  .ft-contact-item a {
    color: var(--ft-muted);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .ft-contact-item a:hover { color: var(--ft-text); }

  /* ── Bottom bar ── */
  .ft-bottom {
    border-top: 1px solid var(--ft-border);
    max-width: 1160px;
    margin: 0 auto;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .ft-bottom-left {
    font-size: 0.78rem;
    color: var(--ft-dimmer);
  }
  .ft-bottom-right {
    font-size: 0.78rem;
    color: var(--ft-dimmer);
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .ft-heart {
    color: #f43f5e;
    animation: ftHeartBeat 1.4s ease infinite;
    display: inline-block;
  }
  @keyframes ftHeartBeat {
    0%, 100% { transform: scale(1); }
    14%       { transform: scale(1.3); }
    28%       { transform: scale(1); }
    42%       { transform: scale(1.2); }
    70%       { transform: scale(1); }
  }

  @media (max-width: 560px) {
    .ft-bottom { flex-direction: column; align-items: flex-start; padding: 20px; }
  }
`

const quickLinks = [
  { label: 'About Us',           path: '/about' },
  { label: 'Privacy Policy',     path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' },
]

const serviceLinks = [
  'Full Stack Web Application',
  'Android Application',
  'iOS Application',
  'Hosting Solution',
  'IT Consultancy',
  'Chatbots',
  'Learn Coding',
]

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21z" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 7.32 7.32l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.ft [data-reveal]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function Footer() {
  const navigate = useNavigate()
  useReveal()

  const WA_NUMBER = '917022852377'
  const WA_LINK = `https://wa.me/${WA_NUMBER}`
  
  // Your specific Instagram link
  const INSTA_LINK = 'https://www.instagram.com/aksoftwaredevelopers?utm_source=qr&igsh=OXRxY25odXpqbnJw'

  return (
    <>
      <style>{footerStyles}</style>

      <footer className="ft">
        <div className="ft-orb" />

        <div className="ft-main">

          {/* ── Brand ── */}
          <div className="reveal" data-reveal>
            <div className="ft-brand-logo" onClick={() => navigate('/')}>
              <div className="ft-logo-mark">
                <img src={logo} alt="AK Software Developers logo" />
              </div>
              <div>
                <div className="ft-logo-text">AK <span>Software</span></div>
                <span className="ft-logo-sub">Developers</span>
              </div>
            </div>
            <p className="ft-brand-desc">
              Building high-performance digital products — from sleek mobile apps to robust cloud infrastructure. Your vision, engineered to scale.
            </p>
            <div className="ft-socials">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ft-social-btn whatsapp" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="reveal" data-reveal style={{ transitionDelay: '0.08s' }}>
            <p className="ft-col-title">Quick Links</p>
            <ul className="ft-links stagger" data-reveal>
              {quickLinks.map(link => (
                <li key={link.label}>
                  <button className="ft-link" onClick={() => navigate(link.path)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="reveal" data-reveal style={{ transitionDelay: '0.16s' }}>
            <p className="ft-col-title">Services</p>
            <ul className="ft-links stagger" data-reveal>
              {serviceLinks.map(svc => (
                <li key={svc}>
                  <button className="ft-link" onClick={() => navigate('/services')}>
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="reveal" data-reveal style={{ transitionDelay: '0.24s' }}>
            <p className="ft-col-title">Connect With Us</p>
            <div className="ft-contact-items stagger" data-reveal>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><MailIcon /></div>
                <div>
                  <a href="mailto:aksoftwaredevelopers@gmail.com">
                    aksoftwaredevelopers@gmail.com
                  </a>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><PhoneIcon /></div>
                <div>
                  <a href="tel:+917022852377">+91 70228 52377</a><br />
                  <a href="tel:+919019303569">+91 90193 03569</a>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><WhatsAppIcon /></div>
                <div>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    WhatsApp: +91 70228 52377
                  </a>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><MapIcon /></div>
                <div>
                  Gulganji Koppa, Shivalli Plot,<br />
                  Dharwad – 580008, Karnataka, India
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom reveal" data-reveal>
          <p className="ft-bottom-left">
            © 2026 – 2027 AK Software Developers. All rights reserved.
          </p>
          <p className="ft-bottom-right">
            Made with <span className="ft-heart">❤</span> in India
          </p>
        </div>

      </footer>
    </>
  )
}