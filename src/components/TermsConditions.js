import React, { useEffect } from 'react'
import AppNavbar from './Navbar'
import Footer from './Footer'

const termsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --tc-bg: #0a0a0a;
    --tc-surface: rgba(255, 255, 255, 0.03);
    --tc-border: rgba(255, 255, 255, 0.06);
    --tc-accent: #3b82f6;
    --tc-accent-dim: rgba(59, 130, 246, 0.12);
    --tc-text: #ffffff;
    --tc-text-secondary: #a1a1aa;
    --tc-muted: rgba(255, 255, 255, 0.5);
  }

  .tc * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Scroll reveal ── */
  .tc .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .tc .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ════ PAGE ════ */
  .tc {
    background: var(--tc-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    padding: 80px 1.5rem;
  }
  .tc-inner { max-width: 880px; margin: 0 auto; }

  /* ════ HERO ════ */
  .tc-hero {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .tc-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--tc-surface);
    border: 1px solid var(--tc-border);
    border-radius: 100px;
    padding: 5px 14px 5px 9px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--tc-text-secondary);
    margin-bottom: 1.25rem;
    opacity: 0;
    animation: tcFadeUp 0.6s ease forwards 0.1s;
  }
  .tc-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--tc-accent);
    animation: tcPulse 1.5s ease infinite;
  }
  @keyframes tcPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.5; }
  }
  .tc-hero-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--tc-text);
    margin-bottom: 0.75rem;
    opacity: 0;
    animation: tcFadeUp 0.6s ease forwards 0.2s;
  }
  .tc-hero-title span {
    background: linear-gradient(90deg, var(--tc-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .tc-hero-sub {
    color: var(--tc-muted);
    font-size: 0.95rem;
    line-height: 1.65;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0;
    animation: tcFadeUp 0.6s ease forwards 0.3s;
  }

  @keyframes tcFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ════ CARD ════ */
  .tc-card {
    background: var(--tc-surface);
    border: 1px solid var(--tc-border);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }
  .tc-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ════ SECTIONS ════ */
  .tc-section {
    margin-bottom: 2.5rem;
  }
  .tc-section:last-child {
    margin-bottom: 0;
  }
  .tc-section-title {
    font-family: 'Sora', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--tc-text);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tc-section-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--tc-accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tc-accent);
  }
  .tc-section-text {
    color: var(--tc-text-secondary);
    line-height: 1.7;
    font-size: 0.92rem;
  }
  .tc-section-text p {
    margin-bottom: 1rem;
  }
  .tc-section-text p:last-child {
    margin-bottom: 0;
  }
  .tc-list {
    list-style: none;
    padding-left: 0;
  }
  .tc-list li {
    color: var(--tc-text-secondary);
    line-height: 1.7;
    font-size: 0.92rem;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
  }
  .tc-list li::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--tc-accent);
    font-size: 0.85rem;
  }
  .tc-divider {
    border: none;
    border-top: 1px solid var(--tc-border);
    margin: 1.75rem 0;
  }
  .tc-highlight {
    background: var(--tc-accent-dim);
    border-left: 3px solid var(--tc-accent);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    margin: 1rem 0;
  }
  .tc-highlight p {
    margin: 0;
    color: var(--tc-text-secondary);
    font-size: 0.88rem;
  }
  .tc-last-updated {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--tc-border);
    color: var(--tc-muted);
    font-size: 0.75rem;
  }
  .tc-number {
    color: var(--tc-accent);
    font-weight: 600;
    margin-right: 8px;
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 640px) {
    .tc { padding: 60px 1rem; }
    .tc-card { padding: 1.75rem 1.25rem; }
    .tc-section-title { font-size: 1.1rem; }
  }
`

function FileTextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function HandshakeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8L22 12L17 16" />
      <path d="M7 16L2 12L7 8" />
      <path d="M17 8L22 12L17 16" />
      <path d="M12 6L12 18" />
      <path d="M8 10L6 12L8 14" />
      <path d="M16 10L18 12L16 14" />
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function ScaleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
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

export default function TermsConditions() {
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
      <style>{termsStyles}</style>
      <AppNavbar />

      <div className="tc">
        <div className="tc-inner">
          {/* ── Hero ── */}
          <div className="tc-hero">
            <div className="tc-badge">
              <div className="tc-badge-dot" />
              Legal Agreement
            </div>
            <h1 className="tc-hero-title">
              Terms & <span>Conditions</span>
            </h1>
            <p className="tc-hero-sub">
              Please read these terms carefully before using our services or submitting any information.
            </p>
          </div>

          {/* ── Content Card ── */}
          <div className="tc-card reveal" data-reveal>

            {/* Section 1 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><FileTextIcon /></div>
                1. Acceptance of Terms
              </div>
              <div className="tc-section-text">
                <p>By accessing or using the services provided by AK Software Developers ("we", "us", "our"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
                <p>These terms apply to all visitors, users, and others who access or use our services, including but not limited to website visitors, clients, and students enrolling in our courses.</p>
              </div>
            </div>

            <hr className="tc-divider" />

            {/* Section 2 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><HandshakeIcon /></div>
                2. Services Provided
              </div>
              <div className="tc-section-text">
                <p>AK Software Developers offers the following services:</p>
                <ul className="tc-list">
                  <li>Full Stack Web Application Development</li>
                  <li>Android & iOS Application Development</li>
                  <li>Hosting Solutions & Cloud Infrastructure</li>
                  <li>IT Consultancy & Strategic Advisory</li>
                  <li>AI Chatbot Integration & Development</li>
                  <li>Coding Courses & Mentorship Programs</li>
                </ul>
                <p>We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.</p>
              </div>
            </div>

            <hr className="tc-divider" />

            {/* Section 3 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><CreditCardIcon /></div>
                3. Payments & Refunds
              </div>
              <div className="tc-section-text">
                <p>For project-based services, payment terms will be outlined in individual project agreements or proposals. For course enrollments:</p>
                <ul className="tc-list">
                  <li><strong>Course Fees:</strong> Full Stack Web Development: ₹15,000 | Full Stack Android Development: ₹20,000</li>
                  <li>Payment must be completed before course commencement unless otherwise agreed</li>
                  <li>Refunds are available within 7 days of enrollment with valid documentation</li>
                  <li>No refunds will be issued after course materials have been accessed</li>
                </ul>
                <div className="tc-highlight">
                  <p>For any payment-related disputes, please contact us immediately at support@aksoftwared.com</p>
                </div>
              </div>
            </div>

            <hr className="tc-divider" />

            {/* Section 4 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><BriefcaseIcon /></div>
                4. Client Responsibilities
              </div>
              <div className="tc-section-text">
                <p>As a client or student, you agree to:</p>
                <ul className="tc-list">
                  <li>Provide accurate and complete information when using our services</li>
                  <li>Maintain the confidentiality of any login credentials provided</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Complete all required coursework or project milestones in a timely manner</li>
                  <li>Respect intellectual property rights and not distribute course materials</li>
                </ul>
              </div>
            </div>

            <hr className="tc-divider" />

            {/* Section 5 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><ScaleIcon /></div>
                5. Intellectual Property
              </div>
              <div className="tc-section-text">
                <p>All content, materials, code, designs, and documentation provided by AK Software Developers are protected by copyright and intellectual property laws.</p>
                <ul className="tc-list">
                  <li>Project deliverables become client property upon full payment</li>
                  <li>Course materials remain the property of AK Software Developers</li>
                  <li>You may not reproduce, distribute, or modify our proprietary materials without permission</li>
                  <li>We reserve the right to showcase completed projects in our portfolio</li>
                </ul>
              </div>
            </div>

            <hr className="tc-divider" />

            {/* Section 6 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><MailIcon /></div>
                6. Limitation of Liability
              </div>
              <div className="tc-section-text">
                <p>To the maximum extent permitted by law, AK Software Developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul className="tc-list">
                  <li>Your use or inability to use our services</li>
                  <li>Any conduct or content of any third party on our services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
                <div className="tc-highlight">
                  <p>Our total liability for any claim arising out of these terms shall not exceed the amount paid by you to us in the preceding 12 months.</p>
                </div>
              </div>
            </div>

            <hr className="tc-divider" />

            {/* Section 7 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><FileTextIcon /></div>
                7. Modifications to Terms
              </div>
              <div className="tc-section-text">
                <p>We reserve the right to modify these Terms & Conditions at any time. We will notify users of any material changes by posting the updated terms on this page and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes acceptance of the revised terms.</p>
              </div>
            </div>

            <hr className="tc-divider" />

            {/* Section 8 */}
            <div className="tc-section">
              <div className="tc-section-title">
                <div className="tc-section-icon"><MailIcon /></div>
                8. Contact Information
              </div>
              <div className="tc-section-text">
                <p>If you have any questions about these Terms & Conditions, please contact us:</p>
                <ul className="tc-list">
                  <li><strong>Email:</strong> support@aksoftwared.com</li>
                  <li><strong>Phone:</strong> +91 70228 52377</li>
                  <li><strong>WhatsApp:</strong> +91 70228 52377</li>
                  <li><strong>Business Hours:</strong> Monday - Saturday, 10:00 AM to 7:00 PM IST</li>
                </ul>
              </div>
            </div>

            <div className="tc-last-updated">
              Last Updated: March 2026
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}