import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Globe,
  Smartphone,
  Apple,
  Cloud,
  ComputerIcon,
  MessageSquare,
  Zap,
  Shield,
  Settings,
  Wrench,
  Code,
  Database,
  CreditCard,
  Layout,
  Monitor,
  ShoppingCart,
  Lock,
  Users,
} from 'lucide-react'

// Import local images for Website plans
import web1 from "../images/web1.jpg"
import web2 from "../images/web.2.2.2.jpg"
import web3 from "../images/web3.jpg"
import web4 from "../images/web4.jpg"
import web5 from "../images/web5.jpg"
import web6 from "../images/web6.jpg"

// Import local images for Android plans
import an1 from "../images/an1.jpg"
import an2 from "../images/an2.jpg"
import an3 from "../images/an3.jpg"

const headerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

  :root {
    --ak-bg: #0a0a0a;
    --ak-accent: #3b82f6;
    --ak-accent-dim: rgba(59, 130, 246, 0.1);
    --ak-text: #ffffff;
    --ak-text-secondary: #a1a1aa;
    --ak-muted: rgba(255, 255, 255, 0.45);
    --ak-border: rgba(255, 255, 255, 0.06);
    --ak-surface: rgba(255, 255, 255, 0.03);
    --ak-card-bg: rgba(15, 15, 20, 0.7);
    --ak-glow: 0 0 30px rgba(59, 130, 246, 0.15);
    --ak-whatsapp: #25d366;
  }

  .hdr * { box-sizing: border-box; margin: 0; padding: 0; }

  .hdr {
    position: relative;
    min-height: 100vh;
    background: var(--ak-bg);
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 2rem 80px;
  }

  .hdr-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .hdr-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    opacity: 0.25;
    animation: orbFloat 8s ease-in-out infinite alternate;
  }

  .hdr-orb-1 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%);
    top: -100px; left: -100px;
    animation-duration: 9s;
  }

  .hdr-orb-2 {
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%);
    bottom: -80px; right: -60px;
    animation-duration: 11s;
    animation-delay: -3s;
  }

  @keyframes orbFloat {
    0%   { transform: translate(0, 0) scale(1); }
    100% { transform: translate(20px, 30px) scale(1.05); }
  }

  .hdr-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .hdr-dot {
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

  .hdr-headline-wrap {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 880px;
  }

  .hdr-headline {
    font-weight: 800;
    font-size: clamp(2.8rem, 6vw, 5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--ak-text);
    opacity: 0;
    animation: fadeSlideUp 0.8s 0.4s ease forwards;
  }

  .hdr-headline .ak-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px);
    animation: wordReveal 0.5s ease forwards;
  }

  @keyframes wordReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  .hdr-headline .ak-grad {
    background: linear-gradient(90deg, var(--ak-accent) 0%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hdr-sub {
    margin-top: 1.5rem;
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    font-weight: 400;
    color: #B0B8C5;
    line-height: 1.6;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0;
    animation: fadeSlideUp 0.8s 0.85s ease forwards;
    position: relative;
    z-index: 2;
  }

  .hdr-cta-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 2.5rem;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    animation: fadeSlideUp 0.8s 1.1s ease forwards;
    position: relative;
    z-index: 2;
  }

  .hdr-btn-primary {
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    color: #ffffff;
    background: var(--ak-accent);
    border: none;
    border-radius: 8px;
    padding: 12px 28px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .hdr-btn-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -75%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transform: skewX(-20deg);
  }

  .hdr-btn-primary:hover::before {
    animation: shimmerBtn 0.6s ease forwards;
  }

  @keyframes shimmerBtn {
    0%   { left: -75%; }
    100% { left: 135%; }
  }

  .hdr-btn-primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  }

  .hdr-btn-primary:active { transform: translateY(0); }

  .hdr-btn-arrow {
    display: inline-block;
    transition: transform 0.2s ease;
    font-style: normal;
  }

  .hdr-btn-primary:hover .hdr-btn-arrow { transform: translate(3px, -2px); }

  .hdr-btn-secondary {
    font-weight: 500;
    font-size: 0.85rem;
    color: var(--ak-text-secondary);
    background: transparent;
    border: 1px solid var(--ak-border);
    border-radius: 8px;
    padding: 12px 28px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .hdr-btn-secondary:hover {
    color: var(--ak-text);
    border-color: var(--ak-accent-dim);
    background: var(--ak-surface);
    transform: translateY(-1px);
  }

  /* Pricing Section */
  .hdr-pricing-main {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin-top: 4rem;
    opacity: 0;
    animation: fadeSlideUp 0.8s 1.25s ease forwards;
  }

  .pricing-section-wrapper {
    margin-bottom: 3rem;
    border: 1px solid var(--ak-border);
    border-radius: 24px;
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s ease;
  }

  .pricing-section-wrapper:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }

  .pricing-header-with-image {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(0,0,0,0) 100%);
    border-radius: 20px;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--ak-border);
  }

  .pricing-header-text {
    flex: 1;
  }

  .pricing-header-text h2 {
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--ak-text);
  }

  .pricing-header-text h2 span {
    background: linear-gradient(90deg, var(--ak-accent) 0%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pricing-header-text p {
    color: var(--ak-accent);
    font-size: 0.85rem;
    margin-top: 0.5rem;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  /* 3x3 Grid for Website Plans */
  .hdr-pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 900px) {
    .hdr-pricing-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 550px) {
    .hdr-pricing-grid { grid-template-columns: 1fr; }
    .pricing-header-with-image { flex-direction: column; text-align: center; padding: 1rem; }
  }

  /* Enhanced Price Cards - Full Image Cover, No Icons */
  .hdr-price-card {
    background: var(--ak-card-bg);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(59, 130, 246, 0.2);
    border-radius: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    min-height: 380px;
  }

  .hdr-price-card:hover {
    transform: translateY(-6px);
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: var(--ak-glow);
    background: rgba(20, 25, 40, 0.8);
  }

  .hdr-price-card.featured {
    border-color: var(--ak-accent);
    background: linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.02));
    box-shadow: 0 0 20px rgba(59,130,246,0.2);
  }

  .hdr-price-card.custom-plan {
    border-style: dashed;
    border-color: rgba(59, 130, 246, 0.35);
  }

  .hdr-price-card.custom-plan:hover {
    border-style: solid;
    border-color: var(--ak-accent);
  }

  /* Card Image Section - Full Width Cover */
  .price-card-image {
    width: 100%;
    height: 220px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
  }

  .price-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .hdr-price-card:hover .price-card-image img {
    transform: scale(1.05);
  }

  .price-card-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
  }

  /* Card Content - Overlay on Image for Better Visibility */
  .price-card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 16px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.5), transparent);
    border-radius: 0 0 18px 18px;
  }

  .hdr-price-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--ak-text);
    line-height: 1.3;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }

  .hdr-price-amount {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--ak-text);
    line-height: 1;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }

  .hdr-price-amount .hdr-rupee {
    font-size: 1rem;
    font-weight: 600;
    color: var(--ak-accent);
    vertical-align: super;
    margin-right: 2px;
  }

  .hdr-price-amount-custom {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--ak-text);
    letter-spacing: 0.1em;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }

  .hdr-price-viewdetails {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--ak-accent);
    letter-spacing: 0.05em;
    transition: transform 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    background: rgba(0,0,0,0.4);
    padding: 4px 12px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
  }

  .hdr-price-card:hover .hdr-price-viewdetails {
    transform: translateX(3px);
    background: rgba(59,130,246,0.2);
  }

  .hdr-price-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--ak-accent);
    color: #fff;
    border-radius: 20px;
    padding: 4px 10px;
    box-shadow: 0 2px 8px rgba(59,130,246,0.4);
  }

  .pricing-divider {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
  }

  .divider-line {
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--ak-accent), transparent);
    border-radius: 3px;
  }

  /* Stats Section */
  .hdr-stats {
    display: flex;
    gap: 0;
    margin-top: 4rem;
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: fadeSlideUp 0.8s 1.5s ease forwards;
  }

  .hdr-stat {
    padding: 0 2.5rem;
    text-align: center;
    border-right: 1px solid var(--ak-border);
  }

  .hdr-stat:first-child { padding-left: 0; }
  .hdr-stat:last-child  { border-right: none; padding-right: 0; }

  .hdr-stat-num {
    font-weight: 800;
    font-size: 1.8rem;
    color: var(--ak-text);
    line-height: 1;
  }

  .hdr-stat-label {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--ak-text-secondary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 6px;
  }

  /* Services Section */
  .hdr-services-header {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 900px;
    margin-top: 5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .hdr-services-header-label {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ak-accent);
    margin-bottom: 6px;
  }

  .hdr-services-header-title {
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    font-weight: 700;
    color: var(--ak-text);
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .hdr-services-header-title span {
    background: linear-gradient(90deg, var(--ak-accent) 0%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hdr-services {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 1rem;
    width: 100%;
    max-width: 900px;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 700px) {
    .hdr-services { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .hdr-stat { padding: 0 1.2rem; }
    .hdr-stat-num { font-size: 1.4rem; }
  }

  @media (max-width: 480px) {
    .hdr-services { grid-template-columns: 1fr; }
  }

  .hdr-service-card {
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    border-radius: 18px;
    padding: 24px 12px 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    animation: cardReveal 0.5s ease forwards;
    transition: all 0.3s ease;
  }

  @keyframes cardReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  .hdr-service-card:hover {
    border-color: var(--ak-accent-dim);
    transform: translateY(-5px);
    background: rgba(59, 130, 246, 0.05);
  }

  .hdr-service-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ak-surface);
    border: 1px solid var(--ak-border);
    color: var(--ak-accent);
    transition: all 0.3s ease;
  }

  .hdr-service-card:hover .hdr-service-icon-wrap {
    background: var(--ak-accent-dim);
    transform: scale(1.08);
    border-color: var(--ak-accent);
  }

  .hdr-service-name {
    font-weight: 500;
    font-size: 0.85rem;
    color: var(--ak-text-secondary);
    text-align: center;
    line-height: 1.4;
    transition: color 0.2s ease;
  }

  .hdr-service-card:hover .hdr-service-name {
    color: var(--ak-text);
  }

  .hdr-scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    z-index: 2;
    opacity: 0;
    animation: fadeSlideUp 0.8s 2s ease forwards;
  }

  .hdr-scroll-label {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ak-text-secondary);
  }

  .hdr-scroll-bar {
    width: 1.5px;
    height: 36px;
    background: var(--ak-border);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .hdr-scroll-bar::after {
    content: '';
    position: absolute;
    top: -36px; left: 0;
    width: 100%; height: 100%;
    background: var(--ak-accent);
    animation: scrollBarDrop 1.8s ease infinite;
  }

  @keyframes scrollBarDrop {
    0%   { top: -36px; opacity: 1; }
    100% { top: 36px;  opacity: 0; }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── WhatsApp Floating Button ── */
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

  .hdr-wa-fab {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9998;
    animation: waSlideIn 0.5s 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }

  .hdr-wa-btn {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--ak-whatsapp);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    animation: waBounce 3s 1.2s ease-in-out infinite;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .hdr-wa-btn:hover {
    background: #20c05a;
    box-shadow: 0 6px 28px rgba(37, 211, 102, 0.6);
    transform: scale(1.08);
    animation-play-state: paused;
  }

  .hdr-wa-btn::before,
  .hdr-wa-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--ak-whatsapp);
    animation: waPulseRing 2.2s ease-out infinite;
  }
  .hdr-wa-btn::after { animation-delay: 0.7s; }

  @media (max-width: 640px) {
    .hdr-wa-fab { bottom: 20px; right: 16px; }
  }
`

const services = [
  { Icon: Globe,         name: 'Full Stack Web Application', to: '/contact' },
  { Icon: Smartphone,    name: 'Android Application',        to: '/contact' },
  { Icon: Apple,         name: 'iOS Application',            to: '/contact' },
  { Icon: Cloud,         name: 'Hosting Solution',           to: '/contact' },
  { Icon: ComputerIcon,  name: 'Learn Coding',               to: '/studentform' },
  { Icon: MessageSquare, name: 'Chatbots',                   to: '/contact' },
]

const websitePricingPlans = [
  { name: 'Static Website',                    amount: '2,499',  key: 'static_website',       featured: false, image: web1 },
  { name: 'Static Website + Hosting',          amount: '3,499',  key: 'static_website_hosting',featured: false, image: web2 },
  { name: 'Dynamic Website (Admin Panel)',      amount: '9,999',  key: 'dynamic_admin',         featured: true,  image: web3 },
  { name: 'Dynamic Website + PG Integration',  amount: '19,999', key: 'dynamic_pg',            featured: false, image: web4 },
  { name: 'Dynamic + PG + OTP Integration',    amount: '29,999', key: 'dynamic_pg_otp',        featured: false, image: web5 },
  { name: 'Customize Your Plan',               amount: null,     key: 'customize_website',     featured: false, isCustom: true, image: web6 },
]

const androidPricingPlans = [
  { name: 'Static Android App',                        amount: '4,999',  key: 'static_android', featured: false, image: an1 },
  { name: 'Android App with Database Connection',       amount: '8,999',  key: 'android_db',     featured: true,  image: an2 },
  { name: 'Android App with Payment Gateway',           amount: '19,999', key: 'android_pg',     featured: false, image: an3 },
]

const words = ['Building', 'Digital', 'Solutions', 'That', 'Scale.']

const dots = Array.from({ length: 20 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${(Math.random() * 5).toFixed(1)}s`,
  duration: `${(3 + Math.random() * 4).toFixed(1)}s`,
}))

const WA_NUMBER = '917022852377'
const WA_LINK = `https://wa.me/${WA_NUMBER}`

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// Circuit Canvas Component
function CircuitCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let animId

    const ACCENT = '59, 130, 246'
    const NODE_COUNT = 38
    const GRID = 60

    const cols = Math.floor(W / GRID) + 1
    const rows = Math.floor(H / GRID) + 1
    const allNodes = []
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        allNodes.push({ x: c * GRID, y: r * GRID })
      }
    }
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)
    const nodes = shuffle(allNodes).slice(0, NODE_COUNT).map(n => ({
      ...n,
      pulse: Math.random(),
      pulseSpeed: 0.004 + Math.random() * 0.006,
      size: Math.random() > 0.7 ? 3.5 : 2,
      ring: Math.random() > 0.6,
    }))

    const traces = []
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return
        const dx = Math.abs(a.x - b.x)
        const dy = Math.abs(a.y - b.y)
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < GRID * 3.5 && Math.random() > 0.45) {
          traces.push({
            ax: a.x, ay: a.y,
            bx: b.x, by: b.y,
            mx: a.x,
            my: b.y,
            progress: 0,
            speed: 0.003 + Math.random() * 0.004,
            delay: Math.random() * 200,
            active: false,
            opacity: 0.06 + Math.random() * 0.08,
          })
        }
      })
    })

    const packets = traces.slice(0, 14).map(t => ({
      trace: t,
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
      size: 1.5 + Math.random() * 1.5,
      opacity: 0.7 + Math.random() * 0.3,
      active: true,
    }))

    let frame = 0

    function getPointOnTrace(trace, pct) {
      const lenA = Math.sqrt(
        (trace.mx - trace.ax) ** 2 + (trace.my - trace.ay) ** 2
      )
      const lenB = Math.sqrt(
        (trace.bx - trace.mx) ** 2 + (trace.by - trace.my) ** 2
      )
      const total = lenA + lenB
      const d = pct * total
      if (d <= lenA) {
        const r = lenA === 0 ? 0 : d / lenA
        return {
          x: trace.ax + (trace.mx - trace.ax) * r,
          y: trace.ay + (trace.my - trace.ay) * r,
        }
      } else {
        const r = lenB === 0 ? 0 : (d - lenA) / lenB
        return {
          x: trace.mx + (trace.bx - trace.mx) * r,
          y: trace.my + (trace.by - trace.my) * r,
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      frame++

      traces.forEach(tr => {
        ctx.beginPath()
        ctx.moveTo(tr.ax, tr.ay)
        ctx.lineTo(tr.mx, tr.my)
        ctx.lineTo(tr.bx, tr.by)
        ctx.strokeStyle = `rgba(${ACCENT}, ${tr.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      nodes.forEach(n => {
        n.pulse = (n.pulse + n.pulseSpeed) % 1

        if (n.ring) {
          const ringAlpha = 0.08 + Math.sin(n.pulse * Math.PI * 2) * 0.08
          const ringR = n.size + 3 + Math.sin(n.pulse * Math.PI * 2) * 2
          ctx.beginPath()
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${ACCENT}, ${ringAlpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        const alpha = 0.25 + Math.sin(n.pulse * Math.PI * 2) * 0.15
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, ${alpha + 0.2})`
        ctx.fill()
      })

      packets.forEach(pkt => {
        pkt.t += pkt.speed
        if (pkt.t > 1) {
          pkt.t = 0
          pkt.trace = traces[Math.floor(Math.random() * traces.length)]
        }
        const pos = getPointOnTrace(pkt.trace, pkt.t)

        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pkt.size * 5)
        grad.addColorStop(0, `rgba(${ACCENT}, ${pkt.opacity})`)
        grad.addColorStop(0.4, `rgba(${ACCENT}, ${pkt.opacity * 0.3})`)
        grad.addColorStop(1, `rgba(${ACCENT}, 0)`)
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pkt.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pkt.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 220, 255, ${pkt.opacity})`
        ctx.fill()
      })

      if (frame % 90 === 0) {
        const tr = traces[Math.floor(Math.random() * traces.length)]
        tr._flash = 1
      }
      traces.forEach(tr => {
        if (tr._flash > 0) {
          ctx.beginPath()
          ctx.moveTo(tr.ax, tr.ay)
          ctx.lineTo(tr.mx, tr.my)
          ctx.lineTo(tr.bx, tr.by)
          ctx.strokeStyle = `rgba(${ACCENT}, ${tr._flash * 0.4})`
          ctx.lineWidth = 1.5
          ctx.stroke()
          tr._flash -= 0.04
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hdr-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

// Price Card Component
function PriceCard({ plan, onClick }) {
  return (
    <div
      className={`hdr-price-card${plan.featured ? ' featured' : ''}${plan.isCustom ? ' custom-plan' : ''}`}
      onClick={() => onClick(plan)}
    >
      {plan.featured && <span className="hdr-price-badge">Popular</span>}
      <div className="price-card-image">
        <img src={plan.image} alt={plan.name} loading="lazy" />
        <div className="price-card-image-overlay"></div>
      </div>
      <div className="price-card-content">
        <div className="hdr-price-name">{plan.name}</div>
        {plan.isCustom ? (
          <div className="hdr-price-amount-custom">₹ -----</div>
        ) : (
          <div className="hdr-price-amount">
            <span className="hdr-rupee">₹</span>
            {plan.amount}
          </div>
        )}
        <div className="hdr-price-viewdetails">View More Details →</div>
      </div>
    </div>
  )
}

export default function Header() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const handlePriceCardClick = (plan) => {
    navigate('/price', {
      state: {
        selectedPlan: plan.key,
        planName: plan.name,
        planAmount: plan.amount,
      },
    })
  }

  return (
    <>
      <style>{headerStyles}</style>

      <section className="hdr" id="home">
        <CircuitCanvas />

        <div className="hdr-orb hdr-orb-1" />
        <div className="hdr-orb hdr-orb-2" />

        <div className="hdr-particles">
          {dots.map((d, i) => (
            <div
              key={i}
              className="hdr-dot"
              style={{ left: d.left, top: d.top, '--delay': d.delay, '--d': d.duration }}
            />
          ))}
        </div>

        {/* Headline */}
        <div className="hdr-headline-wrap">
          <h1 className="hdr-headline">
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  className={`ak-word${(i === 1 || i === 2) ? ' ak-grad' : ''}`}
                  style={{ animationDelay: `${0.45 + i * 0.1}s` }}
                >
                  {word}
                </span>
                {i < words.length - 1 && ' '}
              </React.Fragment>
            ))}
          </h1>
          <p className="hdr-sub">
            From sleek mobile apps to robust cloud infrastructure — AK Software Developers delivers full-spectrum IT solutions that transform your vision into high-performance digital products.
          </p>
        </div>

        {/* Pricing Section */}
        <div className="hdr-pricing-main">

          {/* WEBSITE PRICING SECTION */}
          <div className="pricing-section-wrapper">
            <div className="pricing-header-with-image">
              <div className="pricing-header-text">
                <h2><span>Affordable Website</span> Development</h2>
                <p>✨ Affordable & scalable web solutions for every need</p>
              </div>
            </div>
            <div className="hdr-pricing-grid">
              {websitePricingPlans.map((plan, i) => (
                <PriceCard key={`web-${i}`} plan={plan} onClick={handlePriceCardClick} />
              ))}
            </div>
          </div>

          <div className="pricing-divider">
            <div className="divider-line"></div>
          </div>

          {/* ANDROID PRICING SECTION */}
          <div className="pricing-section-wrapper">
            <div className="pricing-header-with-image">
              <div className="pricing-header-text">
                <h2><span>Affordable Android</span> App Development</h2>
                <p>🚀 Powerful native apps with seamless backend integration</p>
              </div>
            </div>
            <div className="hdr-pricing-grid">
              {androidPricingPlans.map((plan, i) => (
                <PriceCard key={`android-${i}`} plan={plan} onClick={handlePriceCardClick} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hdr-cta-row">
          <button className="hdr-btn-primary" onClick={() => navigate('/contact')}>
            Get Started <span className="hdr-btn-arrow">↗</span>
          </button>
          <button className="hdr-btn-secondary" onClick={() => navigate('/ourwork')}>
            View Our Work →
          </button>
        </div>

        {/* Stats */}
        <div className="hdr-stats">
          {[
            { num: '100+', label: 'Projects' },
            { num: '98%',  label: 'Satisfaction' },
            { num: '4+',   label: 'Years' },
            { num: '24/7', label: 'Support' },
          ].map((s, i) => (
            <div className="hdr-stat" key={i}>
              <div className="hdr-stat-num">{s.num}</div>
              <div className="hdr-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Services Header */}
        <div className="hdr-services-header">
          <div className="hdr-services-header-label">What We Do</div>
          <div className="hdr-services-header-title">
            Our <span>Services</span>
          </div>
        </div>

        {/* Service Cards */}
        <div className="hdr-services">
          {services.map((svc, i) => (
            <div
              className="hdr-service-card"
              key={i}
              style={{ animationDelay: `${1.6 + i * 0.08}s` }}
              onClick={() => navigate(svc.to)}
            >
              <div className="hdr-service-icon-wrap">
                <svc.Icon size={22} strokeWidth={1.6} />
              </div>
              <div className="hdr-service-name">{svc.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Floating Button — icon only */}
      <div className="hdr-wa-fab">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hdr-wa-btn"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </>
  )
}