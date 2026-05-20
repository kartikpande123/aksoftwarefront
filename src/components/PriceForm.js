import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppNavbar from './Navbar'
import Footer from './Footer'
import API_BASE_URL from "./ApiConfig";

const priceFormStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

  :root {
    --pf-bg: #0a0a0a;
    --pf-surface: rgba(255, 255, 255, 0.03);
    --pf-border: rgba(255, 255, 255, 0.06);
    --pf-accent: #3b82f6;
    --pf-accent-dim: rgba(59, 130, 246, 0.12);
    --pf-text: #ffffff;
    --pf-text-secondary: #a1a1aa;
    --pf-muted: rgba(255, 255, 255, 0.5);
    --pf-error: #f87171;
    --pf-success: #4ade80;
    --pf-whatsapp: #25d366;
  }

  .pf * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Scroll reveal ── */
  .pf .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .pf .reveal.visible { opacity: 1; transform: translateY(0); }

  .pf .stagger > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .pf .stagger.visible > *:nth-child(1) { transition-delay: 0.04s; }
  .pf .stagger.visible > *:nth-child(2) { transition-delay: 0.10s; }
  .pf .stagger.visible > *:nth-child(3) { transition-delay: 0.16s; }
  .pf .stagger.visible > *:nth-child(4) { transition-delay: 0.22s; }
  .pf .stagger.visible > * { opacity: 1; transform: translateY(0); }

  /* ════ PAGE ════ */
  .pf {
    background: var(--pf-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    padding: 80px 1.5rem;
  }
  .pf-inner { max-width: 680px; margin: 0 auto; }

  /* ════ SELECTED PLAN CARD ════ */
  .pf-plan-card {
    background: linear-gradient(135deg, var(--pf-accent-dim), rgba(59, 130, 246, 0.05));
    border: 1px solid rgba(59, 130, 246, 0.25);
    border-radius: 20px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    overflow: hidden;
  }
  .pf-plan-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--pf-accent), #60a5fa);
  }
  .pf-plan-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(59, 130, 246, 0.15);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--pf-accent);
    margin-bottom: 0.75rem;
  }
  .pf-plan-name {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--pf-text);
    margin-bottom: 0.5rem;
  }
  .pf-plan-price {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--pf-accent);
    margin-bottom: 0.5rem;
  }
  .pf-plan-type {
    font-size: 0.8rem;
    color: var(--pf-text-secondary);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .pf-plan-type-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--pf-accent);
  }

  /* ════ FORM CARD ════ */
  .pf-card {
    background: var(--pf-surface);
    border: 1px solid var(--pf-border);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }
  .pf-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Form title inside card ── */
  .pf-form-title {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--pf-text);
    margin-bottom: 0.45rem;
  }
  .pf-form-title span {
    background: linear-gradient(90deg, var(--pf-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pf-form-subtitle {
    color: var(--pf-muted);
    font-size: 0.92rem;
    line-height: 1.6;
    margin-bottom: 1.75rem;
  }

  /* ════ FIELD ════ */
  .pf-field { margin-bottom: 1.4rem; position: relative; }
  .pf-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--pf-text-secondary);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.55rem;
  }
  .pf-label-optional {
    font-weight: 400;
    color: rgba(161,161,170,0.5);
    letter-spacing: 0;
    text-transform: none;
    font-size: 0.72rem;
    margin-left: 5px;
  }
  .pf-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--pf-border);
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 0.92rem;
    color: var(--pf-text);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    -webkit-appearance: none;
  }
  .pf-input::placeholder { color: rgba(161,161,170,0.45); }
  .pf-input:focus {
    border-color: rgba(59,130,246,0.5);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    background: rgba(59,130,246,0.04);
  }
  .pf-input.error {
    border-color: rgba(248,113,113,0.5);
    box-shadow: 0 0 0 3px rgba(248,113,113,0.08);
  }
  .pf-error-msg {
    font-size: 0.73rem;
    color: var(--pf-error);
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* ════ TEXTAREA ════ */
  .pf-textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--pf-border);
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    color: var(--pf-text);
    outline: none;
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }
  .pf-textarea::placeholder { color: rgba(161,161,170,0.45); }
  .pf-textarea:focus {
    border-color: rgba(59,130,246,0.5);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    background: rgba(59,130,246,0.04);
  }

  /* ════ SUBMIT ════ */
  .pf-submit {
    width: 100%;
    margin-top: 1.75rem;
    padding: 15px 24px;
    background: var(--pf-accent);
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
  .pf-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.08);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .pf-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59,130,246,0.35);
  }
  .pf-submit:hover:not(:disabled)::after { opacity: 1; }
  .pf-submit:active:not(:disabled) { transform: translateY(0); }
  .pf-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Spinner ── */
  @keyframes pfSpin { to { transform: rotate(360deg); } }
  .pf-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: pfSpin 0.7s linear infinite;
    flex-shrink: 0;
  }

  /* ════ TOAST ════ */
  .pf-toast {
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
    color: var(--pf-text);
    backdrop-filter: blur(12px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.1);
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(0.22,1,0.36,1),
                transform 0.35s cubic-bezier(0.22,1,0.36,1);
    white-space: nowrap;
  }
  .pf-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }
  .pf-toast-icon {
    width: 28px; height: 28px; flex-shrink: 0;
    background: rgba(74,222,128,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--pf-success);
  }

  /* ════ WHATSAPP FLOATING BUTTON ════ */
  @keyframes waPulseRing {
    0%   { transform: scale(1); opacity: 0.7; }
    70%  { transform: scale(1.55); opacity: 0; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  @keyframes waBounce {
    0%, 100% { transform: translateY(0); }
    30%       { transform: translateY(-6px); }
    60%       { transform: translateY(-2px); }
  }
  @keyframes waSlideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .wa-fab-wrap {
    position: fixed;
    bottom: 28px;
    right: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    animation: waSlideIn 0.5s 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }
  .wa-label {
    background: #111827;
    border: 1px solid rgba(37,211,102,0.25);
    border-radius: 100px;
    padding: 7px 13px 7px 10px;
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: 'Inter', sans-serif;
    font-size: 0.76rem;
    font-weight: 600;
    color: #e5e7eb;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .wa-label:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,211,102,0.2);
  }
  .wa-label-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--pf-whatsapp);
    flex-shrink: 0;
    animation: waDotPulse 1.8s ease-out infinite;
  }
  @keyframes waDotPulse {
    0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
    70%  { box-shadow: 0 0 0 6px rgba(37,211,102,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
  }
  .wa-btn {
    position: relative;
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--pf-whatsapp);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    text-decoration: none;
    flex-shrink: 0;
    animation: waBounce 3s 1.2s ease-in-out infinite;
    box-shadow: 0 4px 20px rgba(37,211,102,0.45);
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }
  .wa-btn:hover {
    background: #20c05a;
    box-shadow: 0 6px 28px rgba(37,211,102,0.6);
    transform: scale(1.08);
    animation-play-state: paused;
  }
  .wa-btn::before,
  .wa-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--pf-whatsapp);
    animation: waPulseRing 2.2s ease-out infinite;
  }
  .wa-btn::after { animation-delay: 0.7s; }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 640px) {
    .pf { padding: 60px 1rem; }
    .pf-card { padding: 1.75rem 1.25rem; }
    .pf-plan-card { padding: 1rem 1.25rem; }
    .wa-fab-wrap { bottom: 20px; right: 16px; }
    .wa-label { display: none; }
  }
`

const WA_NUMBER = '917022852377'
const WA_LINK = `https://wa.me/${WA_NUMBER}`

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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

export default function PriceForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedPlan, planName, planPrice, planType } = location.state || {}

  // Redirect to pricing if no plan data
  useEffect(() => {
    if (!selectedPlan && !planName) {
      navigate('/pricing')
    }
  }, [selectedPlan, planName, navigate])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [])

  useReveal()

  const [form, setForm] = useState({ name: '', phone: '', email: '', specialQuote: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)

  const update = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    return e
  }

const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length) { 
    setErrors(e); 
    return; 
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        specialQuote: form.specialQuote || null,
        selectedPlan: selectedPlan,
        planName: planName,
        planPrice: planPrice,
        planType: planType,
        services: [planType, planName].filter(Boolean),
      }),
    });

    const data = await response.json();

    if (data.success) {
      setForm({ name: '', phone: '', email: '', specialQuote: '' });
      setErrors({});
      setToast(true);
      setTimeout(() => setToast(false), 4000);
      console.log('Quote request submitted successfully:', data);
    } else {
      alert(data.message || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting quote request:', error);
    alert('Network error. Please check your connection and try again.');
  } finally {
    setLoading(false);
  }
};
  const getPlanTypeLabel = () => {
    if (planType === 'website') return '🌐 Website Development'
    if (planType === 'android') return '📱 Android App Development'
    if (planType === 'custom') return '⚙️ Custom Solution'
    return '💡 Development Service'
  }

  return (
    <>
      <style>{priceFormStyles}</style>
      <AppNavbar />

      <div className="pf">
        <div className="pf-inner">

          {/* Selected Plan Display Card */}
          <div className="pf-plan-card reveal" data-reveal>
            <div className="pf-plan-badge">
              <span>📋 SELECTED PLAN</span>
            </div>
            <div className="pf-plan-name">{planName || 'Custom Plan'}</div>
            <div className="pf-plan-price">{planPrice || 'Custom Pricing'}</div>
            <div className="pf-plan-type">
              <span className="pf-plan-type-dot" />
              {getPlanTypeLabel()}
            </div>
          </div>

          {/* Form Card */}
          <div className="pf-card reveal" data-reveal>
            <h1 className="pf-form-title">Request a <span>Quote</span></h1>
            <p className="pf-form-subtitle">
              Fill in your details and we'll get back to you with a personalized quote for your project.
            </p>

            {/* Name */}
            <div className="pf-field stagger" data-reveal>
              <label className="pf-label">Full Name</label>
              <input
                className={`pf-input${errors.name ? ' error' : ''}`}
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={e => update('name', e.target.value)}
              />
              {errors.name && <p className="pf-error-msg">⚠ {errors.name}</p>}
            </div>

            {/* Phone Number */}
            <div className="pf-field stagger" data-reveal>
              <label className="pf-label">Phone Number</label>
              <input
                className={`pf-input${errors.phone ? ' error' : ''}`}
                type="tel"
                placeholder="Enter your 10-digit phone number"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
              />
              {errors.phone && <p className="pf-error-msg">⚠ {errors.phone}</p>}
            </div>

            {/* Email (Optional) */}
            <div className="pf-field stagger" data-reveal>
              <label className="pf-label">
                Email Address
                <span className="pf-label-optional">(optional)</span>
              </label>
              <input
                className={`pf-input${errors.email ? ' error' : ''}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => update('email', e.target.value)}
              />
              {errors.email && <p className="pf-error-msg">⚠ {errors.email}</p>}
            </div>

            {/* Special Quote / Requirements (Optional) */}
            <div className="pf-field stagger" data-reveal>
              <label className="pf-label">
                Special Requirements
                <span className="pf-label-optional">(optional)</span>
              </label>
              <textarea
                className="pf-textarea"
                placeholder="Tell us any specific requirements, features, or questions you have..."
                value={form.specialQuote}
                onChange={e => update('specialQuote', e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button className="pf-submit" onClick={handleSubmit} disabled={loading}>
              {loading
                ? <><span className="pf-spinner" /> Sending...</>
                : <><SendIcon /> Request Quote</>
              }
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="wa-fab-wrap">
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-label">
          <span className="wa-label-dot" />
          We have Live Chat
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat on WhatsApp">
          <WhatsAppIcon />
        </a>
      </div>

      {/* Success Toast */}
      <div className={`pf-toast${toast ? ' show' : ''}`}>
        <div className="pf-toast-icon"><SuccessIcon /></div>
        <div className="pf-toast-text">
          <strong>Request sent!</strong>
          <span>We'll get back to you shortly.</span>
        </div>
      </div>

      <Footer />
    </>
  )
}