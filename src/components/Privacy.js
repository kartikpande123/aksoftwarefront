import React, { useEffect } from 'react'
import AppNavbar from './Navbar'
import Footer from './Footer'

const privacyStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --pp-bg: #0a0a0a;
    --pp-surface: rgba(255, 255, 255, 0.03);
    --pp-border: rgba(255, 255, 255, 0.06);
    --pp-accent: #3b82f6;
    --pp-accent-dim: rgba(59, 130, 246, 0.12);
    --pp-text: #ffffff;
    --pp-text-secondary: #a1a1aa;
    --pp-muted: rgba(255, 255, 255, 0.5);
  }

  .pp * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Scroll reveal ── */
  .pp .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .pp .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ════ PAGE ════ */
  .pp {
    background: var(--pp-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    padding: 80px 1.5rem;
  }
  .pp-inner { max-width: 880px; margin: 0 auto; }

  /* ════ HERO ════ */
  .pp-hero {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .pp-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--pp-surface);
    border: 1px solid var(--pp-border);
    border-radius: 100px;
    padding: 5px 14px 5px 9px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--pp-text-secondary);
    margin-bottom: 1.25rem;
    opacity: 0;
    animation: ppFadeUp 0.6s ease forwards 0.1s;
  }
  .pp-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--pp-accent);
    animation: ppPulse 1.5s ease infinite;
  }
  @keyframes ppPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.5; }
  }
  .pp-hero-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--pp-text);
    margin-bottom: 0.75rem;
    opacity: 0;
    animation: ppFadeUp 0.6s ease forwards 0.2s;
  }
  .pp-hero-title span {
    background: linear-gradient(90deg, var(--pp-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pp-hero-sub {
    color: var(--pp-muted);
    font-size: 0.95rem;
    line-height: 1.65;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0;
    animation: ppFadeUp 0.6s ease forwards 0.3s;
  }

  @keyframes ppFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ════ CARD ════ */
  .pp-card {
    background: var(--pp-surface);
    border: 1px solid var(--pp-border);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }
  .pp-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ════ SECTIONS ════ */
  .pp-section {
    margin-bottom: 2.5rem;
  }
  .pp-section:last-child {
    margin-bottom: 0;
  }
  .pp-section-title {
    font-family: 'Sora', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--pp-text);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pp-section-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--pp-accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--pp-accent);
  }
  .pp-section-text {
    color: var(--pp-text-secondary);
    line-height: 1.7;
    font-size: 0.92rem;
  }
  .pp-section-text p {
    margin-bottom: 1rem;
  }
  .pp-section-text p:last-child {
    margin-bottom: 0;
  }
  .pp-list {
    list-style: none;
    padding-left: 0;
  }
  .pp-list li {
    color: var(--pp-text-secondary);
    line-height: 1.7;
    font-size: 0.92rem;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
  }
  .pp-list li::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--pp-accent);
    font-size: 0.85rem;
  }
  .pp-divider {
    border: none;
    border-top: 1px solid var(--pp-border);
    margin: 1.75rem 0;
  }
  .pp-highlight {
    background: var(--pp-accent-dim);
    border-left: 3px solid var(--pp-accent);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    margin: 1rem 0;
  }
  .pp-highlight p {
    margin: 0;
    color: var(--pp-text-secondary);
    font-size: 0.88rem;
  }
  .pp-last-updated {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--pp-border);
    color: var(--pp-muted);
    font-size: 0.75rem;
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 640px) {
    .pp { padding: 60px 1rem; }
    .pp-card { padding: 1.75rem 1.25rem; }
    .pp-section-title { font-size: 1.1rem; }
  }
`

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function DatabaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
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

export default function Privacy() {
  // FIX: Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [])

  useReveal()

  return (
    <>
      <style>{privacyStyles}</style>
      <AppNavbar />

      <div className="pp">
        <div className="pp-inner">
          {/* ── Hero ── */}
          <div className="pp-hero">
            <div className="pp-badge">
              <div className="pp-badge-dot" />
              Privacy & Security
            </div>
            <h1 className="pp-hero-title">
              Privacy <span>Policy</span>
            </h1>
            <p className="pp-hero-sub">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
          </div>

          {/* ── Content Card ── */}
          <div className="pp-card reveal" data-reveal>

            {/* Section 1 */}
            <div className="pp-section">
              <div className="pp-section-title">
                <div className="pp-section-icon"><ShieldIcon /></div>
                Information We Collect
              </div>
              <div className="pp-section-text">
                <p>When you interact with AK Software Developers, we may collect the following information:</p>
                <ul className="pp-list">
                  <li><strong>Name</strong> — To address you personally and verify your identity</li>
                  <li><strong>Phone Number</strong> — To contact you regarding your inquiries and project updates</li>
                  <li><strong>Email Address</strong> — For sending project updates, quotes, and important communications</li>
                  <li><strong>Course Selection</strong> — When enrolling in our coding programs, we track your course preferences</li>
                  <li><strong>Service Interests</strong> — Which services you're interested in to better serve your needs</li>
                </ul>
              </div>
            </div>

            <hr className="pp-divider" />

            {/* Section 2 */}
            <div className="pp-section">
              <div className="pp-section-title">
                <div className="pp-section-icon"><LockIcon /></div>
                How We Use Your Information
              </div>
              <div className="pp-section-text">
                <p>Your information helps us provide better service. We use it to:</p>
                <ul className="pp-list">
                  <li>Respond to your inquiries and contact requests</li>
                  <li>Process enrollments for our coding courses</li>
                  <li>Send project quotes and proposals</li>
                  <li>Improve our services and user experience</li>
                  <li>Communicate important updates about your projects</li>
                </ul>
              </div>
            </div>

            <hr className="pp-divider" />

            {/* Section 3 */}
            <div className="pp-section">
              <div className="pp-section-title">
                <div className="pp-section-icon"><DatabaseIcon /></div>
                Data Security
              </div>
              <div className="pp-section-text">
                <p>We take data security seriously. We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</p>
                <div className="pp-highlight">
                  <p>✓ SSL/TLS encryption for all data transmission<br />
                  ✓ Secure databases with access controls<br />
                  ✓ Regular security audits and updates<br />
                  ✓ No sharing or selling of your personal data to third parties</p>
                </div>
              </div>
            </div>

            <hr className="pp-divider" />

            {/* Section 4 */}
            <div className="pp-section">
              <div className="pp-section-title">
                <div className="pp-section-icon"><EyeIcon /></div>
                Your Rights & Choices
              </div>
              <div className="pp-section-text">
                <p>You have control over your personal information. You can:</p>
                <ul className="pp-list">
                  <li>Request access to the data we hold about you</li>
                  <li>Ask us to correct any inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of marketing communications at any time</li>
                </ul>
              </div>
            </div>

            <hr className="pp-divider" />

            {/* Section 5 */}
            <div className="pp-section">
              <div className="pp-section-title">
                <div className="pp-section-icon"><MailIcon /></div>
                Contact Us
              </div>
              <div className="pp-section-text">
                <p>If you have any questions about this Privacy Policy or how we handle your data, please reach out to us:</p>
                <ul className="pp-list">
                  <li><strong>Email:</strong> aksoftwaredevelopers@gmail.com
</li>
                  <li><strong>Phone:</strong> +91 70228 52377</li>
                  <li><strong>WhatsApp:</strong> +91 70228 52377</li>
                </ul>
              </div>
            </div>

            <div className="pp-last-updated">
              Last Updated: March 2026
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}