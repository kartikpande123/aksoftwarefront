import React, { useEffect, useRef } from "react";
import AppNavbar from "./Navbar";
import Footer from "./Footer";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Sora:wght@300;400;600;700;800&display=swap');

  :root {
    --wc-bg: #0a0a0a;
    --wc-surface: rgba(255, 255, 255, 0.03);
    --wc-border: rgba(255, 255, 255, 0.06);
    --wc-accent: #3b82f6;
    --wc-accent-dim: rgba(59, 130, 246, 0.12);
    --wc-amber: #f59e0b;
    --wc-amber-dim: rgba(245, 158, 11, 0.10);
    --wc-text: #ffffff;
    --wc-text-secondary: #a1a1aa;
    --wc-muted: rgba(255, 255, 255, 0.5);
    --wc-red: #ef4444;
    --wc-red-dim: rgba(239, 68, 68, 0.10);
    --wc-green: #22c55e;
    --wc-green-dim: rgba(34, 197, 94, 0.10);
  }

  .wc-page {
    background: var(--wc-bg);
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    color: var(--wc-text);
  }

  /* ── Hero ── */
  .wc-hero {
    position: relative;
    padding: 100px 2rem 80px;
    text-align: center;
    overflow: hidden;
  }

  .wc-hero::before {
    content: '';
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .wc-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--wc-accent-dim);
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 100px;
    padding: 6px 18px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--wc-accent);
    margin-bottom: 28px;
  }

  .wc-hero-badge span {
    width: 6px;
    height: 6px;
    background: var(--wc-accent);
    border-radius: 50%;
    display: inline-block;
    animation: wc-pulse 2s ease-in-out infinite;
  }

  @keyframes wc-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }

  .wc-hero-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
    color: var(--wc-text);
  }

  .wc-hero-title em {
    font-style: normal;
    color: var(--wc-accent);
  }

  .wc-hero-subtitle {
    max-width: 640px;
    margin: 0 auto 0;
    font-size: 1.1rem;
    color: var(--wc-text-secondary);
    line-height: 1.75;
    font-weight: 400;
  }

  /* ── Divider ── */
  .wc-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--wc-border), transparent);
    margin: 0 2rem;
  }

  /* ── Problem Section ── */
  .wc-section {
    padding: 80px 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .wc-section-label {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .wc-section-label-line {
    height: 1px;
    width: 40px;
    background: var(--wc-border);
  }

  .wc-section-label span {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--wc-text-secondary);
  }

  .wc-section-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    margin-bottom: 48px;
    letter-spacing: -0.02em;
  }

  .wc-section-title.danger { color: var(--wc-red); }
  .wc-section-title.success { color: var(--wc-green); }

  /* ── Problem Cards ── */
  .wc-problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .wc-problem-card {
    background: var(--wc-red-dim);
    border: 1px solid rgba(239, 68, 68, 0.15);
    border-radius: 16px;
    padding: 28px;
    position: relative;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .wc-problem-card:hover {
    border-color: rgba(239, 68, 68, 0.35);
    transform: translateY(-3px);
  }

  .wc-card-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin-bottom: 16px;
  }

  .wc-card-icon.red { background: rgba(239, 68, 68, 0.15); }
  .wc-card-icon.blue { background: var(--wc-accent-dim); }
  .wc-card-icon.green { background: var(--wc-green-dim); }

  .wc-card-title {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--wc-text);
  }

  .wc-card-body {
    font-size: 0.9rem;
    color: var(--wc-text-secondary);
    line-height: 1.7;
  }

  /* ── Promise Cards ── */
  .wc-promise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .wc-promise-card {
    background: var(--wc-surface);
    border: 1px solid var(--wc-border);
    border-radius: 16px;
    padding: 28px;
    transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .wc-promise-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--wc-accent), #2563eb);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .wc-promise-card:hover {
    border-color: rgba(59,130,246,0.3);
    transform: translateY(-3px);
    background: rgba(59,130,246,0.05);
  }

  .wc-promise-card:hover::before { opacity: 1; }

  /* ── Bottom CTA ── */
  .wc-cta-section {
    margin: 0 2rem 80px;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.04));
    border: 1px solid rgba(59,130,246,0.2);
    padding: 64px 48px;
    text-align: center;
    position: relative;
    overflow: hidden;
    max-width: 1060px;
    margin-left: auto;
    margin-right: auto;
  }

  .wc-cta-section::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .wc-cta-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .wc-cta-body {
    color: var(--wc-text-secondary);
    font-size: 1rem;
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto 32px;
  }

  .wc-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, var(--wc-accent), #2563eb);
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    padding: 14px 32px;
    border-radius: 10px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .wc-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59,130,246,0.3);
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    text-decoration: none;
  }

  /* ── Animations ── */
  .wc-fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .wc-fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .wc-hero { padding: 60px 1.25rem 50px; }
    .wc-section { padding: 60px 1.25rem; }
    .wc-cta-section { padding: 48px 24px; margin: 0 1.25rem 60px; }
  }
`;

const problemItems = [
  {
    icon: "🤖",
    title: "It Doesn't Know You",
    body: "AI just scrapes the internet and guesses. It gives you a cookie-cutter template that makes you look exactly like every other competitor in your industry.",
  },
  {
    icon: "❄️",
    title: "Cold, Robotic Words",
    body: "AI writes text that feels fake and lifeless. It doesn't know how to speak to your customers' emotions or build trust.",
  },
  {
    icon: "🚫",
    title: "You Are Entirely On Your Own",
    body: "If an AI-generated site breaks, glitches on mobile, or stops working, there is no one to call. You are left completely stranded.",
  },
];

const promiseItems = [
  {
    icon: "👂",
    title: "We Listen and Understand",
    body: "We don't guess. We take the time to learn exactly what makes your business special. We hand-craft every single detail so your website feels uniquely, authentically yours.",
  },
  {
    icon: "💬",
    title: "Words That Make Real Connections",
    body: "We write clear, warm, and persuasive copy that speaks to real humans — helping your visitors feel confident in choosing you over anyone else.",
  },
  {
    icon: "🤝",
    title: "Total Accountability",
    body: "We are real people who pick up the phone. No confusing tech jargon, no hidden fees, no disappearing acts. If you have a question or run into a problem, we are right here.",
  },
];

function FadeCard({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`wc-fade-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function WhyChoose() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <div className="wc-page">
      <style>{styles}</style>

      <AppNavbar />

      {/* Hero */}
      <section className="wc-hero">
        <FadeCard>
          <div className="wc-hero-badge">
            <span></span> Our Promise
          </div>
          <h1 className="wc-hero-title">
            Why Choose Us? Because Your Business
            <br />
            is not Too Important for a <em>Robot.</em>
          </h1>
          <p className="wc-hero-subtitle">
            You have poured your heart, late nights, and endless energy into
            building your business. So when it comes to your website — the
            digital front door of all your hard work — why hand it over to a
            soulless machine?
          </p>
        </FadeCard>
      </section>

      <div className="wc-divider" />

      {/* Problem Section */}
      <section className="wc-section">
        <FadeCard>
          <div className="wc-section-label">
            <div className="wc-section-label-line" />
            <span>The Problem</span>
          </div>
          <h2 className="wc-section-title danger">
            The "Two-Minute" AI Website Trap
          </h2>
        </FadeCard>

        <div className="wc-problem-grid">
          {problemItems.map((item, i) => (
            <FadeCard key={item.title} delay={i * 100}>
              <div className="wc-problem-card">
                <div className="wc-card-icon red">{item.icon}</div>
                <div className="wc-card-title">{item.title}</div>
                <div className="wc-card-body">{item.body}</div>
              </div>
            </FadeCard>
          ))}
        </div>
      </section>

      <div className="wc-divider" />

      {/* Promise Section */}
      <section className="wc-section">
        <FadeCard>
          <div className="wc-section-label">
            <div className="wc-section-label-line" />
            <span>Our Difference</span>
          </div>
          <h2 className="wc-section-title success">
            The Human Difference — Our Promise to You
          </h2>
        </FadeCard>

        <div className="wc-promise-grid">
          {promiseItems.map((item, i) => (
            <FadeCard key={item.title} delay={i * 100}>
              <div className="wc-promise-card">
                <div className="wc-card-icon blue">{item.icon}</div>
                <div className="wc-card-title">{item.title}</div>
                <div className="wc-card-body">{item.body}</div>
              </div>
            </FadeCard>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <FadeCard>
        <div className="wc-cta-section">
          <h2 className="wc-cta-title">
            You didn't use a robot to build your dream.
          </h2>
          <p className="wc-cta-body">
            Don't use one to build your website. Let's build something real,
            reliable, and beautifully yours — together.
          </p>
          <a href="/contact" className="wc-cta-btn">
            Let's Build Together <span>↗</span>
          </a>
        </div>
      </FadeCard>

      <Footer />
    </div>
  );
}
