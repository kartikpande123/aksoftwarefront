import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Globe, Smartphone, Apple, Cloud, Lightbulb,
  MessageSquare, Code, GraduationCap, ArrowRight,
  ExternalLink, Quote, Zap, Database, Brain, Server, Users, BookOpen
} from 'lucide-react'
import AppNavbar from './Navbar'
import Footer from './Footer'

const workStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

  :root {
    --ak-bg: #0a0a0a;
    --ak-surface: rgba(255, 255, 255, 0.03);
    --ak-border: rgba(255, 255, 255, 0.06);
    --ak-accent: #3b82f6;
    --ak-accent-dim: rgba(59, 130, 246, 0.12);
    --ak-text: #ffffff;
    --ak-text-secondary: #a1a1aa;
    --ak-muted: rgba(255, 255, 255, 0.5);
    --ak-transition: 0.2s ease;
  }

  /* ── Scroll-reveal animation ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .stagger-children > * {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .stagger-children.visible > *:nth-child(1) { transition-delay: 0.05s; }
  .stagger-children.visible > *:nth-child(2) { transition-delay: 0.13s; }
  .stagger-children.visible > *:nth-child(3) { transition-delay: 0.21s; }
  .stagger-children.visible > *:nth-child(4) { transition-delay: 0.29s; }
  .stagger-children.visible > *:nth-child(5) { transition-delay: 0.37s; }
  .stagger-children.visible > *:nth-child(6) { transition-delay: 0.45s; }
  .stagger-children.visible > * { opacity: 1; transform: translateY(0); }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.0); }
    50%       { box-shadow: 0 0 14px 4px rgba(59,130,246,0.18); }
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  /* ════════════════════════════════
     DOT ANIMATION - From Header Component
  ════════════════════════════════ */
  .work-dot-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .work-dot {
    position: absolute;
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    background: var(--ak-text-secondary);
    opacity: 0;
    animation: dotFade var(--d, 4s) var(--delay, 0s) ease-in-out infinite;
  }

  @keyframes dotFade {
    0%, 100% { opacity: 0; transform: translateY(0); }
    50%      { opacity: 0.5; transform: translateY(-15px); }
  }

  /* ════════════════════════════════
     SIGNAL RINGS — Reviews section
  ════════════════════════════════ */
  @keyframes signalRing {
    0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 0.5; }
    100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
  }

  .review-card {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: transform 0.3s ease, border-color 0.3s ease;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .review-card:hover { transform: translateY(-5px); border-color: var(--ak-accent-dim); }

  /* Signal dot top-right corner */
  .review-signal {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 8px;
    height: 8px;
  }
  .review-signal-core {
    position: absolute;
    top: 50%; left: 50%;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--ak-accent);
    transform: translate(-50%, -50%);
    opacity: 0.7;
  }
  .review-signal-ring {
    position: absolute;
    top: 50%; left: 50%;
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1px solid var(--ak-accent);
    animation: signalRing 2s ease-out infinite;
  }
  .review-signal-ring:nth-child(2) { animation-delay: 0.65s; }
  .review-signal-ring:nth-child(3) { animation-delay: 1.3s; }

  /* ════════════════════════════════
     TYPING CURSOR — Student section
  ════════════════════════════════ */
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes floatBracket {
    0%   { transform: translateY(0px) rotate(0deg); opacity: 0.06; }
    50%  { transform: translateY(-18px) rotate(5deg); opacity: 0.13; }
    100% { transform: translateY(0px) rotate(0deg); opacity: 0.06; }
  }

  .student-section {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%);
    border-radius: 24px;
    padding: 2.5rem;
    margin: 1rem 0;
    position: relative;
    overflow: hidden;
  }
  .student-section > * { position: relative; z-index: 1; }

  .student-bracket {
    position: absolute;
    font-size: 7rem;
    font-weight: 700;
    color: var(--ak-accent);
    pointer-events: none;
    z-index: 0;
    font-family: monospace;
    line-height: 1;
  }
  .student-bracket-1 { top: -10px; left: 10px;  animation: floatBracket 6s ease-in-out infinite; }
  .student-bracket-2 { top: -10px; right: 10px; animation: floatBracket 7s ease-in-out infinite 1s; }
  .student-bracket-3 { bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 5rem; animation: floatBracket 8s ease-in-out infinite 2s; }

  .typing-cursor::after {
    content: '|';
    color: var(--ak-accent);
    animation: blink 1s step-end infinite;
    margin-left: 2px;
  }

  .student-stats {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .student-number {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--ak-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: float 3.5s ease-in-out infinite;
    display: inline-block;
  }
  .student-label { font-size: 1rem; color: var(--ak-text-secondary); }

  /* ════════════════════════════════
     TECH CARD ICON ANIMATIONS
  ════════════════════════════════ */

  /* Web: rotating orbit ring */
  @keyframes orbit {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .icon-orbit {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px dashed rgba(59,130,246,0.25);
    animation: orbit 6s linear infinite;
    pointer-events: none;
  }
  .icon-orbit::after {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--ak-accent);
    transform: translate(-50%, -50%);
    opacity: 0.8;
  }

  /* Android: pulse loader arc */
  @keyframes loaderArc {
    0%   { stroke-dashoffset: 90; }
    50%  { stroke-dashoffset: 20; }
    100% { stroke-dashoffset: 90; }
  }
  .icon-loader-svg {
    position: absolute;
    inset: -8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    pointer-events: none;
  }
  .icon-loader-circle {
    fill: none;
    stroke: var(--ak-accent);
    stroke-width: 1.5;
    stroke-dasharray: 90;
    stroke-dashoffset: 90;
    stroke-linecap: round;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .tech-card:hover .icon-loader-circle,
  .teach-card:hover .icon-loader-circle {
    opacity: 0.6;
    animation: loaderArc 1.6s ease-in-out infinite;
  }

  /* Chatbot: three typing dots */
  @keyframes typingDot {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30%            { transform: translateY(-4px); opacity: 1; }
  }
  .icon-typing-dots {
    position: absolute;
    bottom: -14px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 3px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .tech-card:hover .icon-typing-dots { opacity: 1; }
  .icon-typing-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--ak-accent);
    animation: typingDot 1.2s ease-in-out infinite;
  }
  .icon-typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .icon-typing-dot:nth-child(3) { animation-delay: 0.4s; }

  /* Brain/AI: slow scan line */
  @keyframes scanLine {
    0%   { top: 0%;    opacity: 0.6; }
    50%  { top: 100%;  opacity: 0.6; }
    51%  { opacity: 0; }
    100% { top: 0%;    opacity: 0; }
  }
  .icon-scan {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 14px;
    pointer-events: none;
  }
  .icon-scan::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--ak-accent), transparent);
    opacity: 0;
    top: 0%;
  }
  .tech-card:hover .icon-scan::after {
    animation: scanLine 1.8s ease-in-out infinite;
  }

  /* Database: stacking rows fill */
  @keyframes dbFill {
    0%   { transform: scaleY(0); }
    100% { transform: scaleY(1); }
  }
  .icon-db-bars {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2px;
    align-items: flex-end;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .tech-card:hover .icon-db-bars { opacity: 1; }
  .icon-db-bar {
    width: 4px;
    background: var(--ak-accent);
    border-radius: 1px;
    transform-origin: bottom;
    animation: dbFill 0.6s ease forwards;
  }
  .icon-db-bar:nth-child(1) { height: 6px; animation-delay: 0s; }
  .icon-db-bar:nth-child(2) { height: 10px; animation-delay: 0.1s; }
  .icon-db-bar:nth-child(3) { height: 8px; animation-delay: 0.2s; }

  /* Teach: floating code snippet */
  @keyframes codeFloat {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    20%  { opacity: 0.7; }
    80%  { opacity: 0.7; }
    100% { transform: translateY(-22px) translateX(6px); opacity: 0; }
  }
  .icon-code-tag {
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    font-family: monospace;
    color: var(--ak-accent);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
  }
  .teach-card:hover .icon-code-tag {
    animation: codeFloat 1.6s ease-out infinite;
  }

  /* ── SHARED CARD STYLES ── */
  .work-page { background: var(--ak-bg); font-family: 'Inter', sans-serif; min-height: 100vh; overflow-x: hidden; position: relative; }
  body { overflow-x: hidden; }

  .work-section { padding: 52px 0; position: relative; z-index: 2; }
  .work-section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .work-section-sub {
    text-align: center;
    color: var(--ak-text-secondary);
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto 2.5rem auto;
  }

  .project-card {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    position: relative;
  }
  .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.06) 50%, transparent 60%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .project-card:hover::after { opacity: 1; animation: shimmer 0.9s linear; }
  .project-card:hover { transform: translateY(-5px); border-color: var(--ak-accent-dim); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
  .project-card-content { padding: 1.5rem; }
  .project-icon {
    width: 48px; height: 48px;
    background: var(--ak-accent-dim);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
    color: var(--ak-accent);
    transition: box-shadow 0.3s ease;
  }
  .project-card:hover .project-icon { animation: pulse-glow 1.6s ease-in-out infinite; }
  .project-title { font-size: 1.25rem; font-weight: 600; color: var(--ak-text); margin-bottom: 0.5rem; }
  .project-desc { color: var(--ak-text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem; }
  .project-link {
    color: var(--ak-accent); font-size: 0.85rem; font-weight: 500;
    text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
    transition: gap 0.2s ease, color 0.2s ease;
  }
  .project-link:hover { gap: 10px; color: #60a5fa; }

  .review-quote { color: var(--ak-accent); opacity: 0.5; margin-bottom: 1rem; }
  .review-text { color: var(--ak-text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; font-style: italic; }
  .review-author { display: flex; align-items: center; gap: 0.75rem; }
  .review-avatar {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--ak-accent), #60a5fa);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 600; color: white;
  }
  .review-name { font-weight: 600; color: var(--ak-text); font-size: 0.9rem; }
  .review-role { font-size: 0.7rem; color: var(--ak-text-secondary); }

  .btn-learn {
    background: transparent;
    border: 1px solid var(--ak-accent);
    color: var(--ak-accent);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }
  .btn-learn:hover {
    background: var(--ak-accent); color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59,130,246,0.25);
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
    width: 100%;
  }

  .tech-card {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: visible;
  }
  .tech-card:hover { transform: translateY(-5px); border-color: var(--ak-accent-dim); }
  .tech-card:hover .tech-icon { animation: pulse-glow 1.6s ease-in-out infinite; }

  .tech-icon {
    width: 56px; height: 56px;
    background: var(--ak-accent-dim);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem auto;
    color: var(--ak-accent);
    transition: box-shadow 0.3s ease;
    position: relative;
  }
  .tech-title { font-size: 1rem; font-weight: 600; color: var(--ak-text); margin-bottom: 0.5rem; }
  .tech-desc { font-size: 0.8rem; color: var(--ak-text-secondary); line-height: 1.5; }

  .teach-card {
    background: linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 100%);
    border: 1px solid var(--ak-accent-dim);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: visible;
  }
  .teach-card:hover { transform: translateY(-5px); border-color: var(--ak-accent); box-shadow: 0 10px 30px rgba(59,130,246,0.12); }
  .teach-card:hover .teach-icon { animation: pulse-glow 1.6s ease-in-out infinite; }
  .teach-icon {
    width: 64px; height: 64px;
    background: var(--ak-accent-dim);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem auto;
    color: var(--ak-accent);
    transition: box-shadow 0.3s ease;
    position: relative;
  }
  .teach-title { font-size: 1.25rem; font-weight: 700; color: var(--ak-text); margin-bottom: 0.5rem; }
  .teach-desc { font-size: 0.85rem; color: var(--ak-text-secondary); line-height: 1.5; margin-bottom: 1rem; }

  @media (max-width: 768px) {
    .work-section { padding: 36px 0; }
    .work-section-title { font-size: 1.75rem; }
    .student-section { padding: 1.5rem; }
    .student-stats { flex-direction: column; text-align: center; }
  }
`

/* ════════════════════════════════════════
   DOT ANIMATION COMPONENT - From Header
════════════════════════════════════════ */
function DotAnimation() {
  const dots = Array.from({ length: 30 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${(Math.random() * 5).toFixed(1)}s`,
    duration: `${(3 + Math.random() * 4).toFixed(1)}s`,
  }))

  return (
    <div className="work-dot-canvas">
      {dots.map((d, i) => (
        <div
          key={i}
          className="work-dot"
          style={{ 
            left: d.left, 
            top: d.top, 
            '--delay': d.delay, 
            '--d': d.duration 
          }}
        />
      ))}
    </div>
  )
}

/* ════════════════════════════════════════
   TYPING TEXT — Student section headline
════════════════════════════════════════ */
function TypingText({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => { setDisplayed(text.slice(0, idx + 1)); setIdx(i => i + 1) }, 60)
      return () => clearTimeout(t)
    }
  }, [idx, text])
  return <span className="typing-cursor">{displayed || '\u00A0'}</span>
}

/* ════════════════════════════════════════
   TECH ICON WRAPPERS — per-card animation
════════════════════════════════════════ */
function WebIcon() {
  return (
    <div className="tech-icon" style={{ overflow: 'visible' }}>
      <span className="icon-orbit" />
      <Globe size={24} />
    </div>
  )
}

function AndroidIcon() {
  return (
    <div className="tech-icon">
      <svg className="icon-loader-svg" viewBox="0 0 72 72">
        <circle className="icon-loader-circle" cx="36" cy="36" r="30" />
      </svg>
      <Smartphone size={24} />
    </div>
  )
}

function ChatbotIcon() {
  return (
    <div className="tech-icon" style={{ overflow: 'visible' }}>
      <MessageSquare size={24} />
      <div className="icon-typing-dots">
        <div className="icon-typing-dot" />
        <div className="icon-typing-dot" />
        <div className="icon-typing-dot" />
      </div>
    </div>
  )
}

function BrainIcon() {
  return (
    <div className="tech-icon" style={{ overflow: 'hidden', borderRadius: 14 }}>
      <div className="icon-scan" />
      <Brain size={24} />
    </div>
  )
}

function DatabaseIcon() {
  return (
    <div className="tech-icon" style={{ overflow: 'visible' }}>
      <Database size={24} />
      <div className="icon-db-bars">
        <div className="icon-db-bar" />
        <div className="icon-db-bar" />
        <div className="icon-db-bar" />
      </div>
    </div>
  )
}

function TeachIcon() {
  return (
    <div className="teach-icon" style={{ overflow: 'visible' }}>
      <svg className="icon-loader-svg" viewBox="0 0 80 80">
        <circle className="icon-loader-circle" cx="40" cy="40" r="34" />
      </svg>
      <span className="icon-code-tag">{'<learn/>'}</span>
      <BookOpen size={28} />
    </div>
  )
}

/* Hook */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Work() {
  const navigate = useNavigate()

  // FIX: Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [])

  useReveal()

  const projects = [
    {
      title: 'ARN Exam Platform',
      desc: 'Comprehensive exam dashboard with practice tests, video syllabus, and premium features for competitive exam preparation.',
      url: 'https://arnprivateexamconduct.in',
      icon: <Globe size={24} />
    },
    {
      title: 'Dimensify3D',
      desc: 'Professional 3D printing solutions platform with STL file upload, print configuration, and order management system.',
      url: 'https://dimensify3d.in',
      icon: <Zap size={24} />
    },
    {
      title: 'ARN Mobile App',
      desc: 'Android application for exam preparation, available on Google Play Store with interactive learning features.',
      url: 'https://play.google.com/store/apps/details?id=com.arnapp',
      icon: <Smartphone size={24} />
    }
  ]

  const reviews = [
    {
      name: 'Akbar Nadaf',
      role: 'Founder, ARN Solutions',
      text: 'AK Software Developers transformed our exam platform vision into reality. Their technical expertise and dedication to quality is outstanding. The platform runs smoothly and our users love it!',
      initial: 'A'
    },
    {
      name: 'Naphex',
      role: 'CTO, Tech Innovations',
      text: 'Working with AK team has been a game-changer for our business. They delivered a robust, scalable solution that exceeded our expectations. Highly recommended for any IT project!',
      initial: 'N'
    },
    {
      name: 'Dimensify Team',
      role: '3D Printing Experts',
      text: 'The team at AK Software Developers built us a powerful 3D printing platform with seamless STP processing. Their attention to detail and support has been exceptional.',
      initial: 'D'
    }
  ]

  const techServices = [
    { icon: <WebIcon />,      title: 'Web Applications', desc: 'Full-stack web solutions with modern frameworks, responsive design, and scalable architecture.' },
    { icon: <AndroidIcon />,  title: 'Android Apps',     desc: 'Native Android applications with optimized performance, Material Design, and Play Store deployment.' },
    { icon: <ChatbotIcon />,  title: 'Chatbots & AI',    desc: 'Intelligent chatbots and AI integration for customer support, automation, and engagement.' },
    { icon: <BrainIcon />,    title: 'Gen AI Solutions',  desc: 'Custom generative AI applications for content creation, data analysis, and automation.' },
    { icon: <DatabaseIcon />, title: 'Hosting Solutions', desc: 'Cloud hosting, server management, and deployment optimization for maximum performance.' },
    { icon: <TeachIcon />,    title: 'Teach Students',    desc: 'Comprehensive training programs for web development, Android apps, and modern tech stacks with hands-on projects.' }
  ]

  return (
    <>
      <style>{workStyles}</style>
      <AppNavbar />

      <div className="work-page">
        {/* Dot Animation Background - replacing binary rain */}
        <DotAnimation />

        <Container>
          {/* ── Section 1: Recent Projects ── */}
          <div className="work-section">
            <h2 className="work-section-title reveal" data-reveal>Recent Projects</h2>
            <p className="work-section-sub reveal" data-reveal>Transforming ideas into impactful digital solutions</p>

            <Row className="g-4 stagger-children" data-reveal>
              {projects.map((project, idx) => (
                <Col key={idx} lg={4} md={6}>
                  <div className="project-card">
                    <div className="project-card-content">
                      <div className="project-icon">{project.icon}</div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc">{project.desc}</p>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live Project <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* ── Reviews (signal rings) ── */}
            <h2 className="work-section-title reveal" data-reveal style={{ marginTop: '3rem' }}>What Our Clients Say</h2>

            <Row className="g-4 stagger-children" data-reveal>
              {reviews.map((review, idx) => (
                <Col key={idx} lg={4} md={6}>
                  <div className="review-card">
                    {/* animated signal dot */}
                    <div className="review-signal">
                      <div className="review-signal-ring" />
                      <div className="review-signal-ring" />
                      <div className="review-signal-ring" />
                      <div className="review-signal-core" />
                    </div>
                    <Quote size={28} className="review-quote" />
                    <p className="review-text">"{review.text}"</p>
                    <div className="review-author">
                      <div className="review-avatar">{review.initial}</div>
                      <div>
                        <div className="review-name">{review.name}</div>
                        <div className="review-role">{review.role}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* ── Section 2: Student Projects ── */}
          <div className="work-section">
            <div className="student-section reveal" data-reveal>
              {/* Floating brackets */}
              <span className="student-bracket student-bracket-1">{'{'}</span>
              <span className="student-bracket student-bracket-2">{'}'}</span>
              <span className="student-bracket student-bracket-3">{'</>'}</span>

              <Row className="align-items-center">
                <Col lg={7}>
                  <div className="student-stats">
                    <span className="student-number">50+</span>
                    <span className="student-label">Students Empowered</span>
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                    <TypingText text="College & Internship Projects" />
                  </h3>
                  <p style={{ color: 'var(--ak-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    We've helped 50+ students successfully complete their college projects and internship programs.
                    Our expert guidance covers full-stack web development, Android app development, and modern tech stacks.
                  </p>
                  <button className="btn-learn" onClick={() => navigate('/studentform')}>
                    Learn More →
                  </button>
                </Col>
                <Col lg={5} className="text-center mt-4 mt-lg-0">
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    {[
                      { Icon: Code, label: 'Web Dev' },
                      { Icon: Smartphone, label: 'Android' },
                      { Icon: GraduationCap, label: 'Training' }
                    ].map(({ Icon, label }, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <Icon size={40} color="#3b82f6" />
                        <div style={{ fontSize: '0.75rem', color: 'var(--ak-text-secondary)', marginTop: '0.5rem' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* ── Section 3: What We Build ── */}
          <div className="work-section">
            <h2 className="work-section-title reveal" data-reveal>What We Build</h2>
            <p className="work-section-sub reveal" data-reveal>End-to-end development for modern digital needs</p>

            <div className="tech-grid stagger-children" data-reveal>
              {techServices.map((service, idx) => (
                <div key={idx} className={service.title === 'Teach Students' ? 'teach-card' : 'tech-card'}>
                  {service.icon}
                  <h4 className={service.title === 'Teach Students' ? 'teach-title' : 'tech-title'}>
                    {service.title}
                  </h4>
                  <p className={service.title === 'Teach Students' ? 'teach-desc' : 'tech-desc'}>
                    {service.desc}
                  </p>
                  {service.title === 'Teach Students' && (
                    <button 
                      className="btn-learn" 
                      style={{ marginTop: '1rem', fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
                      onClick={() => navigate('/studentform')}
                    >
                      Start Learning →
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="reveal" data-reveal style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button 
                className="btn-learn" 
                style={{ padding: '0.9rem 2rem', fontSize: '0.9rem' }}
                onClick={() => navigate('/contact')}
              >
                Start Your Project <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>

        </Container>
        <Footer />
      </div>
    </>
  )
}