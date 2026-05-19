import React, { useEffect } from "react";
import AppNavbar from "./Navbar";
import Footer from "./Footer";

const aboutStyles = `
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
  }

  .ab * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Scroll reveal ── */
  .ab .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .ab .reveal.visible { opacity: 1; transform: translateY(0); }

  .ab .stagger > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .ab .stagger.visible > *:nth-child(1) { transition-delay: 0.04s; }
  .ab .stagger.visible > *:nth-child(2) { transition-delay: 0.10s; }
  .ab .stagger.visible > *:nth-child(3) { transition-delay: 0.16s; }
  .ab .stagger.visible > *:nth-child(4) { transition-delay: 0.22s; }
  .ab .stagger.visible > *:nth-child(5) { transition-delay: 0.28s; }
  .ab .stagger.visible > *:nth-child(6) { transition-delay: 0.34s; }
  .ab .stagger.visible > *:nth-child(7) { transition-delay: 0.40s; }
  .ab .stagger.visible > * { opacity: 1; transform: translateY(0); }

  /* ════ PAGE ════ */
  .ab {
    background: var(--ak-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    padding: 80px 1.5rem;
  }
  .ab-inner { max-width: 1100px; margin: 0 auto; }
  .ab-section { margin-bottom: 80px; }

  /* ════ HERO ════ */
  .ab-hero { text-align: center; margin-bottom: 72px; }
  .ab-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 100px;
    padding: 5px 14px 5px 9px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ak-text-secondary);
    margin-bottom: 1.5rem;
  }
  .ab-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--ak-accent);
    animation: abPulse 1.5s ease infinite;
  }
  @keyframes abPulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.4); opacity: 0.5; }
  }
  .ab-hero-title {
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--ak-text);
    margin-bottom: 1.2rem;
  }
  .ab-hero-title span {
    background: linear-gradient(90deg, var(--ak-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ab-hero-sub {
    color: var(--ak-muted);
    font-size: 1.05rem;
    line-height: 1.65;
    max-width: 560px;
    margin: 0 auto;
  }

  /* ════ SECTION HEADINGS ════ */
  .ab-sec-title {
    text-align: center;
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.6rem;
    background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ab-sec-sub {
    text-align: center;
    color: var(--ak-text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2.2rem;
  }

  /* ════ SERVICES — "What We Do"
     Hover: lightning bolt zap + bottom accent line  ════ */
  .ab-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }
  .ab-service-card {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 14px;
    padding: 18px 16px;
    display: flex;
    align-items: center;
    gap: 13px;
    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
    position: relative;
    overflow: hidden;
    cursor: default;
  }
  .ab-service-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    width: 0; height: 2px;
    background: var(--ak-accent);
    transform: translateX(-50%);
    transition: width 0.3s ease;
    border-radius: 2px;
  }
  .ab-service-card:hover {
    transform: translateY(-4px);
    border-color: var(--ak-accent-dim);
    background: rgba(59,130,246,0.04);
  }
  .ab-service-card:hover::after { width: 50%; }

  .ab-service-icon {
    width: 40px; height: 40px; flex-shrink: 0;
    background: var(--ak-accent-dim);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--ak-accent);
    transition: box-shadow 0.3s ease;
  }
  @keyframes zapBolt {
    0%,100% { transform: scale(1) rotate(0deg); }
    25%      { transform: scale(1.25) rotate(-8deg); }
    75%      { transform: scale(1.15) rotate(6deg); }
  }
  .ab-service-card:hover .ab-service-icon {
    box-shadow: 0 0 12px 3px rgba(59,130,246,0.22);
    animation: zapBolt 0.5s ease forwards;
  }
  .ab-service-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--ak-text-secondary);
    line-height: 1.4;
    transition: color 0.2s ease;
  }
  .ab-service-card:hover .ab-service-name { color: var(--ak-text); }

  /* ════ TECHNOLOGIES
     Hover: tag floats up + glows blue            ════ */
  .ab-tech-wrap {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }
  .ab-tech-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 110%, rgba(59,130,246,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .ab-tech-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 1;
  }
  .ab-tech-tag {
    padding: 7px 16px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    background: var(--ak-accent-dim);
    color: var(--ak-accent);
    border: 1px solid rgba(59,130,246,0.2);
    cursor: default;
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease, color 0.22s ease;
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }
  .ab-tech-tag::before {
    content: '';
    display: inline-block;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--ak-accent);
    opacity: 0.7;
    animation: abPulse 2s ease infinite;
    flex-shrink: 0;
  }
  .ab-tech-tag:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(59,130,246,0.22);
    background: rgba(59,130,246,0.22);
    color: #93c5fd;
  }
  .ab-tech-more {
    text-align: center;
    color: var(--ak-text-secondary);
    font-size: 0.8rem;
    position: relative;
    z-index: 1;
  }

  /* ════ TEAM
     Hover: rotating dashed avatar ring + corner glow ════ */
  .ab-team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  .ab-team-card {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 20px;
    padding: 2rem 1.75rem;
    text-align: center;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .ab-team-card::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 90px; height: 90px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%);
    transition: transform 0.4s ease, opacity 0.4s ease;
    opacity: 0;
  }
  .ab-team-card:hover {
    transform: translateY(-6px);
    border-color: var(--ak-accent-dim);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  .ab-team-card:hover::before { opacity: 1; transform: scale(1.4); }

  .ab-avatar-wrap {
    position: relative;
    width: 72px; height: 72px;
    margin: 0 auto 1.25rem auto;
  }
  .ab-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--ak-accent), #60a5fa);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    position: relative;
    z-index: 1;
  }
  .ab-avatar-ring {
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1.5px dashed rgba(59,130,246,0.35);
    animation: spinRing 8s linear infinite;
  }
  .ab-avatar-ring::after {
    content: '';
    position: absolute;
    top: 2px; left: 50%;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--ak-accent);
    transform: translateX(-50%);
    opacity: 0.9;
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .ab-team-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--ak-text);
    margin-bottom: 0.35rem;
  }
  .ab-team-role {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--ak-accent);
    margin-bottom: 0.75rem;
    letter-spacing: 0.02em;
  }
  .ab-team-desc {
    font-size: 0.83rem;
    color: var(--ak-text-secondary);
    line-height: 1.6;
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 640px) {
    .ab { padding: 60px 1rem; }
    .ab-tech-wrap { padding: 1.75rem 1rem; }
  }
`;

function BoltIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const services = [
  "Full Stack Web Development",
  "Android Application Development",
  "iOS Application Development",
  "Chatbots",
  "Hostings",
  "IT Consultancy",
  "AI Integration",
  "Teach Coding - Full Stack Web Development & Android Application Development",
];

const technologies = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "React Native",
  "TypeScript",
  "Firebase",
  "MongoDB",
];

const team = [
  {
    name: "Kartik Pande",
    role: "Full Stack Web, Android & iOS Application Developer",
    description:
      "Expert in building cross-platform solutions and scalable web architectures.",
  },
  {
    name: "Adil Betgeri",
    role: "Manager",
    description:
      "Leads project strategy, client relations, and delivery excellence.",
  },
];

export default function About() {
  // FIX: Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  useReveal();

  return (
    <>
      <style>{aboutStyles}</style>
      <AppNavbar />

      <div className="ab">
        <div className="ab-inner">
          {/* ── Hero ── */}
          <div className="ab-hero reveal" data-reveal>
            <div className="ab-hero-badge">
              <div className="ab-badge-dot" />
              Who We Are
            </div>
            <h1 className="ab-hero-title">
              About <span>AK Software</span>
            </h1>
            <p className="ab-hero-sub">
              We craft innovative digital solutions with cutting-edge technology
              and expert craftsmanship — turning your vision into
              high-performance products.
            </p>
          </div>

          {/* ── What We Do ── */}
          <div className="ab-section">
            <h2 className="ab-sec-title reveal" data-reveal>
              What We Do
            </h2>
            <p className="ab-sec-sub reveal" data-reveal>
              End-to-end services across every digital frontier
            </p>
            <div className="ab-services-grid stagger" data-reveal>
              {services.map((svc, i) => (
                <div className="ab-service-card" key={i}>
                  <div className="ab-service-icon">
                    <BoltIcon />
                  </div>
                  <span className="ab-service-name">{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Technologies ── */}
          <div className="ab-section">
            <h2 className="ab-sec-title reveal" data-reveal>
              Technologies We Use
            </h2>
            <p className="ab-sec-sub reveal" data-reveal>
              Staying ahead with the most advanced and reliable tools in the
              industry
            </p>
            <div className="ab-tech-wrap reveal" data-reveal>
              <div className="ab-tech-tags stagger" data-reveal>
                {technologies.map((tech, i) => (
                  <span className="ab-tech-tag" key={i}>
                    {tech}
                  </span>
                ))}
              </div>
              <p className="ab-tech-more">
                + AI/ML tools, Cloud Platforms (AWS / GCP / Azure), Docker,
                Kubernetes, and more.
              </p>
            </div>
          </div>

          {/* ── Team ── */}
          <div className="ab-section">
            <h2 className="ab-sec-title reveal" data-reveal>
              Meet Our Team
            </h2>
            <p className="ab-sec-sub reveal" data-reveal>
              The people behind every pixel and every line of code
            </p>
            <div className="ab-team-grid stagger" data-reveal>
              {team.map((member, i) => (
                <div className="ab-team-card" key={i}>
                  <div className="ab-avatar-wrap">
                    <div className="ab-avatar">{member.name.charAt(0)}</div>
                    <div className="ab-avatar-ring" />
                  </div>
                  <h3 className="ab-team-name">{member.name}</h3>
                  <p className="ab-team-role">{member.role}</p>
                  <p className="ab-team-desc">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
