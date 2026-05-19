import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Globe,
  Smartphone,
  Apple,
  Cloud,
  Lightbulb,
  MessageSquare,
  ComputerIcon,
  ArrowRight,
} from 'lucide-react'
import AppNavbar from './Navbar'
import Footer from './Footer'

const services = [
  {
    Icon: Globe,
    label: 'Full Stack Web Application',
    description:
      'End-to-end web solutions built with modern frameworks. From pixel-perfect frontends to robust backends, APIs, and databases — we ship products that scale.',
    tags: ['React', 'Node.js', 'Next.js', 'Firebase', 'MongoDB','REST / GraphQL'],
    accent: '#3b82f6',
    navigateTo: '/contact', // Navigates to contact for general services
  },
  {
    Icon: Smartphone,
    label: 'Android Application',
    description:
      'Native and cross-platform Android apps with smooth UX, offline support, and Play Store deployment handled from start to finish.',
    tags: ['React Native', 'Expo', 'Firebase', 'Play Store'],
    accent: '#22c55e',
    navigateTo: '/contact',
  },
  {
    Icon: Apple,
    label: 'iOS Application',
    description:
      'Polished iOS experiences built with Swift and SwiftUI. App Store optimised, performance-tuned, and designed to feel at home on every Apple device.',
    tags: ['React Native', 'Expo', 'Cli', 'App Store'],
    accent: '#a78bfa',
    navigateTo: '/contact',
  },
  {
    Icon: Cloud,
    label: 'Hosting Solution',
    description:
      'Reliable cloud infrastructure setup, CI/CD pipelines, domain management, SSL, and 24/7 uptime monitoring so your product never sleeps.',
    tags: ['Linux', 'PM2', 'CI/CD', 'Nginx'],
    accent: '#38bdf8',
    navigateTo: '/contact',
  },
  {
    Icon: Lightbulb,
    label: 'IT Consultancy',
    description:
      'Strategic technology advice to align your software decisions with business goals. Architecture reviews, tech-stack selection, and roadmap planning.',
    tags: ['Architecture', 'Tech Audit', 'Roadmap', 'Strategy'],
    accent: '#fbbf24',
    navigateTo: '/contact',
  },
  {
    Icon: MessageSquare,
    label: 'Chatbots',
    description:
      'Intelligent chatbots powered by LLMs and custom NLP pipelines. Automate support, capture leads, and engage users around the clock.',
    tags: ['LLM / GPT', 'Dialogflow', 'WhatsApp / Web', 'RAG'],
    accent: '#f472b6',
    navigateTo: '/contact',
  },
  {
    Icon: ComputerIcon,
    label: 'Learn Coding',
    description:
      'Structured mentorship and hands-on coding courses for beginners to advanced learners. Real projects, live sessions, and personalised feedback.',
    tags: ['3 Months Course', 'Live Projects', 'Web & Mobile', 'All Levels'],
    accent: '#fb923c',
    navigateTo: '/studentform', // Special navigation for Learn Coding
  },
]

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Sora:wght@300;400;600;700;800&display=swap');

  :root {
    --s-bg: #0a0a0a;
    --s-surface: #111111;
    --s-border: rgba(255,255,255,0.07);
    --s-text: #ffffff;
    --s-muted: #a1a1aa;
    --s-accent: #3b82f6;
  }

  .svc-page {
    min-height: 100vh;
    background: var(--s-bg);
    font-family: 'Inter', sans-serif;
    color: var(--s-text);
    overflow-x: hidden;
  }

  /* ── Hero ── */
  .svc-hero {
    position: relative;
    text-align: center;
    padding: 100px 24px 80px;
    overflow: hidden;
  }

  .svc-hero-glow {
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%);
    pointer-events: none;
    animation: svc-pulse 6s ease-in-out infinite;
  }

  @keyframes svc-pulse {
    0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
    50%       { opacity: 1;   transform: translateX(-50%) scale(1.08); }
  }

  .svc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--s-accent);
    background: rgba(59,130,246,0.1);
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 100px;
    padding: 6px 16px;
    margin-bottom: 28px;
    opacity: 0;
    animation: svc-fade-up 0.6s ease forwards 0.1s;
  }

  .svc-eyebrow-dot {
    width: 6px;
    height: 6px;
    background: var(--s-accent);
    border-radius: 50%;
    animation: svc-blink 1.6s ease-in-out infinite;
  }

  @keyframes svc-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  .svc-hero h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.03em;
    margin: 0 0 20px;
    opacity: 0;
    animation: svc-fade-up 0.6s ease forwards 0.2s;
  }

  .svc-hero h1 em {
    font-style: normal;
    background: linear-gradient(135deg, #3b82f6, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .svc-hero p {
    max-width: 540px;
    margin: 0 auto;
    font-size: 1.05rem;
    color: var(--s-muted);
    line-height: 1.7;
    opacity: 0;
    animation: svc-fade-up 0.6s ease forwards 0.3s;
  }

  /* ── Grid ── */
  .svc-grid-wrap {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 24px 100px;
  }

  .svc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  /* ── Card ── */
  .svc-card {
    position: relative;
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 16px;
    padding: 28px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
                border-color 0.25s ease,
                box-shadow 0.25s ease;
    opacity: 0;
  }

  .svc-card.visible {
    animation: svc-fade-up 0.55s ease forwards;
  }

  .svc-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--card-glow, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
    pointer-events: none;
  }

  .svc-card:hover {
    transform: translateY(-6px);
    border-color: var(--card-accent, rgba(59,130,246,0.4));
    box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px var(--card-accent, rgba(59,130,246,0.2));
  }

  .svc-card:hover::before {
    opacity: 1;
  }

  /* top accent line */
  .svc-card-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--card-accent, var(--s-accent));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    border-radius: 16px 16px 0 0;
  }

  .svc-card:hover .svc-card-bar {
    transform: scaleX(1);
  }

  .svc-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    background: var(--icon-bg, rgba(59,130,246,0.1));
    color: var(--card-accent, var(--s-accent));
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }

  .svc-card:hover .svc-icon-wrap {
    transform: scale(1.12) rotate(-4deg);
  }

  .svc-card h3 {
    font-family: 'Sora', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--s-text);
    margin: 0 0 10px;
    letter-spacing: -0.01em;
  }

  .svc-card p {
    font-size: 0.875rem;
    color: var(--s-muted);
    line-height: 1.65;
    margin: 0 0 18px;
  }

  .svc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 20px;
  }

  .svc-tag {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--card-accent, var(--s-accent));
    background: var(--icon-bg, rgba(59,130,246,0.1));
    border: 1px solid var(--card-accent-border, rgba(59,130,246,0.2));
    border-radius: 6px;
    padding: 3px 9px;
  }

  .svc-cta-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--card-accent, var(--s-accent));
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .svc-card:hover .svc-cta-row {
    opacity: 1;
    transform: translateX(0);
  }

  .svc-cta-arrow {
    transition: transform 0.2s ease;
  }

  .svc-card:hover .svc-cta-arrow {
    transform: translateX(4px);
  }

  /* ── Bottom CTA banner ── */
  .svc-banner {
    max-width: 1160px;
    margin: 0 auto 80px;
    padding: 0 24px;
  }

  .svc-banner-inner {
    background: linear-gradient(135deg, rgba(59,130,246,0.12), rgba(129,140,248,0.08));
    border: 1px solid rgba(59,130,246,0.2);
    border-radius: 20px;
    padding: 48px;
    text-align: center;
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: svc-fade-up 0.6s ease forwards 0.6s;
  }

  .svc-banner-inner::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
    pointer-events: none;
  }

  .svc-banner-inner h2 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    margin: 0 0 12px;
    letter-spacing: -0.02em;
  }

  .svc-banner-inner p {
    color: var(--s-muted);
    font-size: 1rem;
    margin: 0 0 28px;
  }

  .svc-banner-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 12px 28px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.25s ease;
    box-shadow: 0 4px 16px rgba(59,130,246,0.3);
  }

  .svc-banner-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(59,130,246,0.45);
  }

  /* ── Shared animation ── */
  @keyframes svc-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .svc-hero { padding: 70px 20px 60px; }
    .svc-banner-inner { padding: 32px 20px; }
    .svc-grid { grid-template-columns: 1fr; }
  }
`

function ServiceCard({ service, index, onClick }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 0.08}s`
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const hex = service.accent
  // derive a faint glow from accent
  const hexToRgb = (h) => {
    const r = parseInt(h.slice(1, 3), 16)
    const g = parseInt(h.slice(3, 5), 16)
    const b = parseInt(h.slice(5, 7), 16)
    return `${r},${g},${b}`
  }
  const rgb = hexToRgb(hex)

  return (
    <div
      ref={ref}
      className="svc-card"
      onClick={() => onClick(service.navigateTo)}
      style={{
        '--card-accent': hex,
        '--card-accent-border': `rgba(${rgb},0.25)`,
        '--card-glow': `radial-gradient(ellipse at top left, rgba(${rgb},0.08), transparent 60%)`,
        '--icon-bg': `rgba(${rgb},0.1)`,
      }}
    >
      <div className="svc-card-bar" />
      <div className="svc-icon-wrap">
        <service.Icon size={22} strokeWidth={1.6} />
      </div>
      <h3>{service.label}</h3>
      <p>{service.description}</p>
      <div className="svc-tags">
        {service.tags.map((t) => (
          <span key={t} className="svc-tag">{t}</span>
        ))}
      </div>
      <div className="svc-cta-row">
        Get started
        <ArrowRight size={14} strokeWidth={2} className="svc-cta-arrow" />
      </div>
    </div>
  )
}

export default function Services() {
  const navigate = useNavigate()

  // FIX: Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [])

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <>
      <style>{pageStyles}</style>
      <AppNavbar />
      <div className="svc-page">

        {/* ── Hero ── */}
        <section className="svc-hero">
          <div className="svc-hero-glow" />
          <div className="svc-eyebrow">
            <span className="svc-eyebrow-dot" />
            What We Offer
          </div>
          <h1>
            Services built for<br />
            <em>tomorrow's products</em>
          </h1>
          <p>
            From idea to deployment — we cover every layer of the stack.
            Pick a service below to get in touch and kick things off.
          </p>
        </section>

        {/* ── Cards ── */}
        <section className="svc-grid-wrap">
          <div className="svc-grid">
            {services.map((svc, i) => (
              <ServiceCard
                key={svc.label}
                service={svc}
                index={i}
                onClick={handleNavigation}
              />
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <div className="svc-banner">
          <div className="svc-banner-inner">
            <h2>Not sure which service fits?</h2>
            <p>Tell us about your project and we'll figure it out together.</p>
            <button className="svc-banner-btn" onClick={() => navigate('/contact')}>
              Talk to us <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}