import React, { useEffect, useState } from "react";
import AppNavbar from "./Navbar";
import Footer from "./Footer";
import API_BASE_URL from "./ApiConfig";

const studentStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --ak-bg: #0a0a0a;
    --ak-surface: rgba(255, 255, 255, 0.03);
    --ak-border: rgba(255, 255, 255, 0.06);
    --ak-accent: #3b82f6;
    --ak-accent-dim: rgba(59, 130, 246, 0.12);
    --ak-text: #ffffff;
    --ak-text-secondary: #a1a1aa;
    --ak-muted: rgba(255, 255, 255, 0.5);
    --ak-error: #f87171;
    --ak-success: #4ade80;
    --ak-web-accent: #3b82f6;
    --ak-android-accent: #22c55e;
  }

  .st * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Scroll reveal ── */
  .st .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .st .reveal.visible { opacity: 1; transform: translateY(0); }

  .st .stagger > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .st .stagger.visible > *:nth-child(1) { transition-delay: 0.04s; }
  .st .stagger.visible > *:nth-child(2) { transition-delay: 0.10s; }
  .st .stagger.visible > *:nth-child(3) { transition-delay: 0.16s; }
  .st .stagger.visible > *:nth-child(4) { transition-delay: 0.22s; }
  .st .stagger.visible > *:nth-child(5) { transition-delay: 0.28s; }
  .st .stagger.visible > *:nth-child(6) { transition-delay: 0.34s; }
  .st .stagger.visible > *:nth-child(7) { transition-delay: 0.40s; }
  .st .stagger.visible > *:nth-child(8) { transition-delay: 0.46s; }
  .st .stagger.visible > * { opacity: 1; transform: translateY(0); }

  /* ════ PAGE ════ */
  .st {
    background: var(--ak-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    padding: 80px 1.5rem 100px;
  }
  .st-inner { max-width: 720px; margin: 0 auto; }

  /* ════ HERO ════ */
  .st-hero {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .st-badge {
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
    margin-bottom: 1.25rem;
    opacity: 0;
    animation: stFadeUp 0.6s ease forwards 0.1s;
  }
  .st-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--ak-accent);
    animation: stPulse 1.5s ease infinite;
  }
  @keyframes stPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.5; }
  }
  .st-hero-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--ak-text);
    margin-bottom: 0.75rem;
    opacity: 0;
    animation: stFadeUp 0.6s ease forwards 0.2s;
  }
  .st-hero-title span {
    background: linear-gradient(90deg, var(--ak-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .st-hero-sub {
    color: var(--ak-muted);
    font-size: 0.95rem;
    line-height: 1.65;
    max-width: 500px;
    margin: 0 auto;
    opacity: 0;
    animation: stFadeUp 0.6s ease forwards 0.3s;
  }

  @keyframes stFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ════ CARD ════ */
  .st-card {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .st-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ════ SECTION LABEL ════ */
  .st-section-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ak-text-secondary);
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .st-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--ak-border);
  }

  /* ════ FIELD ════ */
  .st-field { margin-bottom: 1.3rem; position: relative; }
  .st-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--ak-text-secondary);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.55rem;
  }
  .st-label-optional {
    font-weight: 400;
    color: rgba(161,161,170,0.5);
    letter-spacing: 0;
    text-transform: none;
    font-size: 0.72rem;
    margin-left: 5px;
  }
  .st-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--ak-border);
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 0.92rem;
    color: var(--ak-text);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    -webkit-appearance: none;
  }
  .st-input::placeholder { color: rgba(161,161,170,0.45); }
  .st-input:focus {
    border-color: rgba(59,130,246,0.5);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    background: rgba(59,130,246,0.04);
  }
  .st-input.error {
    border-color: rgba(248,113,113,0.5);
    box-shadow: 0 0 0 3px rgba(248,113,113,0.08);
  }
  .st-error-msg {
    font-size: 0.73rem;
    color: var(--ak-error);
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .st-divider {
    border: none;
    border-top: 1px solid var(--ak-border);
    margin: 1.75rem 0;
  }

  /* ════ COURSE SELECTOR CARDS ════ */
  .st-course-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 0.5rem;
  }
  @media (max-width: 520px) {
    .st-course-grid { grid-template-columns: 1fr; }
  }

  .st-course-card {
    border: 1.5px solid var(--ak-border);
    border-radius: 16px;
    padding: 20px 18px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,0.02);
    transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  }
  .st-course-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    width: 0; height: 2px;
    transform: translateX(-50%);
    transition: width 0.3s ease;
    border-radius: 2px;
  }
  .st-course-card.web::after { background: var(--ak-web-accent); }
  .st-course-card.android::after { background: var(--ak-android-accent); }

  .st-course-card:hover { transform: translateY(-3px); }
  .st-course-card:hover::after { width: 50%; }

  .st-course-card.web:hover {
    border-color: rgba(59,130,246,0.35);
    background: rgba(59,130,246,0.04);
  }
  .st-course-card.android:hover {
    border-color: rgba(34,197,94,0.35);
    background: rgba(34,197,94,0.04);
  }

  .st-course-card.web.selected {
    border-color: rgba(59,130,246,0.55);
    background: rgba(59,130,246,0.07);
    box-shadow: 0 8px 28px rgba(59,130,246,0.12);
  }
  .st-course-card.android.selected {
    border-color: rgba(34,197,94,0.55);
    background: rgba(34,197,94,0.07);
    box-shadow: 0 8px 28px rgba(34,197,94,0.12);
  }

  .st-course-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .st-course-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
    transition: transform 0.25s ease;
  }
  .st-course-card:hover .st-course-icon { transform: scale(1.1) rotate(-4deg); }
  .st-course-card.web .st-course-icon { background: rgba(59,130,246,0.12); color: var(--ak-web-accent); }
  .st-course-card.android .st-course-icon { background: rgba(34,197,94,0.12); color: var(--ak-android-accent); }

  .st-course-radio {
    width: 18px; height: 18px; flex-shrink: 0;
    border-radius: 50%;
    border: 1.5px solid var(--ak-border);
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s, background 0.2s;
  }
  .st-course-card.web.selected .st-course-radio {
    border-color: var(--ak-web-accent);
    background: var(--ak-web-accent);
  }
  .st-course-card.android.selected .st-course-radio {
    border-color: var(--ak-android-accent);
    background: var(--ak-android-accent);
  }
  .st-course-radio-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: white;
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .st-course-card.selected .st-course-radio-dot { opacity: 1; transform: scale(1); }

  .st-course-name {
    font-family: 'Sora', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--ak-text);
    margin-bottom: 4px;
    line-height: 1.3;
  }
  .st-course-duration {
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--ak-text-secondary);
    letter-spacing: 0.03em;
  }

  /* ════ COURSE DETAILS PANEL ════ */
  .st-details-panel {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.5s cubic-bezier(0.22,1,0.36,1),
                opacity 0.4s ease,
                transform 0.4s cubic-bezier(0.22,1,0.36,1),
                margin-top 0.3s ease;
    transform: translateY(-8px);
    margin-top: 0;
  }
  .st-details-panel.open {
    max-height: 600px;
    opacity: 1;
    transform: translateY(0);
    margin-top: 20px;
  }

  .st-details-inner {
    border-radius: 16px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }
  .st-details-inner.web {
    background: rgba(59,130,246,0.06);
    border: 1px solid rgba(59,130,246,0.18);
  }
  .st-details-inner.android {
    background: rgba(34,197,94,0.06);
    border: 1px solid rgba(34,197,94,0.18);
  }
  .st-details-inner::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 120px; height: 120px;
    border-radius: 50%;
    pointer-events: none;
  }
  .st-details-inner.web::before { background: radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%); }
  .st-details-inner.android::before { background: radial-gradient(circle, rgba(34,197,94,0.1), transparent 70%); }

  .st-details-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    gap: 10px;
  }
  .st-details-title {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--ak-text);
  }
  .st-price-badge {
    display: inline-flex;
    align-items: baseline;
    gap: 3px;
    border-radius: 10px;
    padding: 6px 14px;
    font-weight: 700;
  }
  .st-price-badge.web { background: rgba(59,130,246,0.15); color: #60a5fa; }
  .st-price-badge.android { background: rgba(34,197,94,0.15); color: #4ade80; }
  .st-price-currency { font-size: 0.8rem; }
  .st-price-amount { font-size: 1.3rem; font-family: 'Sora', sans-serif; }
  .st-price-period { font-size: 0.72rem; font-weight: 500; opacity: 0.75; }

  .st-tech-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ak-text-secondary);
    margin-bottom: 10px;
  }
  .st-tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .st-tech-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 600;
    opacity: 0;
    transform: translateY(8px) scale(0.95);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .st-details-panel.open .st-tech-tag { opacity: 1; transform: translateY(0) scale(1); }
  .st-tech-tag.web {
    background: rgba(59,130,246,0.1);
    color: #93c5fd;
    border: 1px solid rgba(59,130,246,0.2);
  }
  .st-tech-tag.android {
    background: rgba(34,197,94,0.1);
    color: #86efac;
    border: 1px solid rgba(34,197,94,0.2);
  }
  .st-tech-tag::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .st-tech-tag.web::before { background: #3b82f6; }
  .st-tech-tag.android::before { background: #22c55e; }

  /* stagger tech tags */
  .st-details-panel.open .st-tech-tag:nth-child(1) { transition-delay: 0.05s; }
  .st-details-panel.open .st-tech-tag:nth-child(2) { transition-delay: 0.09s; }
  .st-details-panel.open .st-tech-tag:nth-child(3) { transition-delay: 0.13s; }
  .st-details-panel.open .st-tech-tag:nth-child(4) { transition-delay: 0.17s; }
  .st-details-panel.open .st-tech-tag:nth-child(5) { transition-delay: 0.21s; }
  .st-details-panel.open .st-tech-tag:nth-child(6) { transition-delay: 0.25s; }
  .st-details-panel.open .st-tech-tag:nth-child(7) { transition-delay: 0.29s; }
  .st-details-panel.open .st-tech-tag:nth-child(8) { transition-delay: 0.33s; }
  .st-details-panel.open .st-tech-tag:nth-child(9) { transition-delay: 0.37s; }

  /* ════ SUBMIT ════ */
  .st-submit {
    width: 100%;
    margin-top: 1.75rem;
    padding: 15px 24px;
    background: var(--ak-accent);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .st-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.08);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .st-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59,130,246,0.35);
  }
  .st-submit:hover:not(:disabled)::after { opacity: 1; }
  .st-submit:active:not(:disabled) { transform: translateY(0); }
  .st-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Spinner ── */
  @keyframes stSpin { to { transform: rotate(360deg); } }
  .st-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: stSpin 0.7s linear infinite;
    flex-shrink: 0;
  }

  /* ════ TOAST ════ */
  .st-toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(74, 222, 128, 0.3);
    border-radius: 14px;
    padding: 14px 22px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    color: var(--ak-text);
    backdrop-filter: blur(12px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.1);
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(0.22,1,0.36,1),
                transform 0.35s cubic-bezier(0.22,1,0.36,1);
    white-space: nowrap;
  }
  .st-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }
  .st-toast-icon {
    width: 28px; height: 28px; flex-shrink: 0;
    background: rgba(74,222,128,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--ak-success);
  }
  .st-toast-text strong { color: var(--ak-success); }
  .st-toast-text span { color: var(--ak-text-secondary); font-size: 0.8rem; display: block; }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 640px) {
    .st { padding: 60px 1rem 80px; }
    .st-card { padding: 1.75rem 1.25rem; }
  }
`;

const WEB_TECHS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React JS",
  "Bootstrap",
  "Node JS",
  "Express JS",
  "MongoDB",
  "Git & GitHub",
];

const ANDROID_TECHS = [
  "JavaScript",
  "React Basics",
  "TypeScript",
  "React Native",
  "Expo",
  "Node JS",
  "Express JS",
  "Firebase",
];

const COURSES = {
  web: {
    name: "Full Stack Web Development",
    duration: "3 Months",
    price: "15,000",
    techs: WEB_TECHS,
    type: "web",
  },
  android: {
    name: "Full Stack Android Development",
    duration: "3 Months",
    price: "20,000",
    techs: ANDROID_TECHS,
    type: "android",
  },
};

function GlobeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
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

export default function StudentEnroll() {
  // FIX: Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  useReveal();

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!selectedCourse) e.course = "Please select a course";
    return e;
  };

const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/student/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        course: selectedCourse,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Clear form on success
      setForm({ name: "", phone: "", email: "" });
      setSelectedCourse(null);
      setErrors({});
      setToast(true);
      setTimeout(() => setToast(false), 4500);
      console.log("Enrollment submitted successfully:", data);
    } else {
      // Handle API error
      alert(data.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting enrollment:", error);
    alert("Network error. Please check your connection and try again.");
  } finally {
    setLoading(false);
  }
};

  const course = selectedCourse ? COURSES[selectedCourse] : null;

  return (
    <>
      <style>{studentStyles}</style>
      <AppNavbar />

      <div className="st">
        <div className="st-inner">
          {/* ── Hero ── */}
          <div className="st-hero">
            <div className="st-badge">
              <div className="st-badge-dot" />
              Learn Coding
            </div>
            <h1 className="st-hero-title">
              Start Your <span>Coding Journey</span>
            </h1>
            <p className="st-hero-sub">
              Enroll in a structured 3-month course with live projects,
              mentorship, and real-world skills.
            </p>
          </div>

          {/* ── Form Card ── */}
          <div className="st-card reveal" data-reveal>

            {/* ── Course Selection (moved to top) ── */}
            <p className="st-section-label">Choose Your Course</p>

            <div className="st-course-grid stagger" data-reveal>
              {/* Web Dev Card */}
              <div
                className={`st-course-card web${selectedCourse === "web" ? " selected" : ""}`}
                onClick={() => {
                  setSelectedCourse("web");
                  setErrors((e) => ({ ...e, course: "" }));
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div className="st-course-icon">
                    <GlobeIcon />
                  </div>
                  <div className="st-course-radio">
                    <div className="st-course-radio-dot" />
                  </div>
                </div>
                <div className="st-course-name">Full Stack Web Development</div>
                <div className="st-course-duration">3 Months · ₹15,000</div>
              </div>

              {/* Android Dev Card */}
              <div
                className={`st-course-card android${selectedCourse === "android" ? " selected" : ""}`}
                onClick={() => {
                  setSelectedCourse("android");
                  setErrors((e) => ({ ...e, course: "" }));
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div className="st-course-icon">
                    <SmartphoneIcon />
                  </div>
                  <div className="st-course-radio">
                    <div className="st-course-radio-dot" />
                  </div>
                </div>
                <div className="st-course-name">
                  Full Stack Android Development
                </div>
                <div className="st-course-duration">3 Months · ₹20,000</div>
              </div>
            </div>

            {errors.course && (
              <p className="st-error-msg" style={{ marginTop: "8px" }}>
                ⚠ {errors.course}
              </p>
            )}

            {/* ── Course Details Panel ── */}
            <div className={`st-details-panel${course ? " open" : ""}`}>
              {course && (
                <div className={`st-details-inner ${course.type}`}>
                  <div className="st-details-header">
                    <div className="st-details-title">{course.name}</div>
                    <div className={`st-price-badge ${course.type}`}>
                      <span className="st-price-currency">₹</span>
                      <span className="st-price-amount">{course.price}</span>
                      <span className="st-price-period">
                        / {course.duration}
                      </span>
                    </div>
                  </div>
                  <p className="st-tech-label">What you'll learn</p>
                  <div className="st-tech-grid">
                    {course.techs.map((tech, i) => (
                      <span key={i} className={`st-tech-tag ${course.type}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <hr className="st-divider" />

            {/* ── Personal Details (moved below course selection) ── */}
            <p className="st-section-label">Personal Details</p>

            <div className="st-field">
              <label className="st-label">Full Name</label>
              <input
                className={`st-input${errors.name ? " error" : ""}`}
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name && <p className="st-error-msg">⚠ {errors.name}</p>}
            </div>

            <div className="st-field">
              <label className="st-label">Phone Number</label>
              <input
                className={`st-input${errors.phone ? " error" : ""}`}
                type="tel"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              {errors.phone && <p className="st-error-msg">⚠ {errors.phone}</p>}
            </div>

            <div className="st-field">
              <label className="st-label">
                Email
                <span className="st-label-optional">(optional)</span>
              </label>
              <input
                className={`st-input${errors.email ? " error" : ""}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {errors.email && <p className="st-error-msg">⚠ {errors.email}</p>}
            </div>

            {/* Submit */}
            <button
              className="st-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="st-spinner" /> Enrolling…
                </>
              ) : (
                <>
                  <SendIcon /> Enroll Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      <div className={`st-toast${toast ? " show" : ""}`}>
        <div className="st-toast-icon">
          <SuccessIcon />
        </div>
        <div className="st-toast-text">
          <strong>Enrollment submitted!</strong>
          <span>We'll reach out to you shortly.</span>
        </div>
      </div>
      <Footer />
    </>
  );
}