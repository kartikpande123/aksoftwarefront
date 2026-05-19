import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Database,
  Globe,
  Layout,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  ShoppingCart,
  Smartphone,
  Users,
  Zap,
  CreditCard,
  Server,
  Code,
  Cloud,
  Settings,
  Wrench,
} from "lucide-react";
import AppNavbar from "./Navbar";
import Footer from "./Footer";

const priceStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --pr-bg: #0a0a0a;
    --pr-surface: rgba(255, 255, 255, 0.03);
    --pr-border: rgba(255, 255, 255, 0.06);
    --pr-accent: #3b82f6;
    --pr-accent-dim: rgba(59, 130, 246, 0.12);
    --pr-text: #ffffff;
    --pr-text-secondary: #a1a1aa;
    --pr-muted: rgba(255, 255, 255, 0.5);
    --pr-success: #4ade80;
  }

  .pr * { box-sizing: border-box; margin: 0; padding: 0; }

  .pr {
    background: var(--pr-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  /* Header */
  .pr-header {
    position: sticky;
    top: 0;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--pr-border);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    z-index: 100;
  }

  .pr-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .pr-back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--pr-surface);
    border: 1px solid var(--pr-border);
    border-radius: 8px;
    padding: 6px 12px;
    color: var(--pr-text-secondary);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pr-back-btn:hover {
    background: var(--pr-accent-dim);
    color: var(--pr-accent);
    transform: translateX(-2px);
  }

  .pr-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pr-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--pr-accent), #60a5fa);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
  }

  .pr-logo-text {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--pr-text);
  }

  .pr-logo-text span {
    background: linear-gradient(90deg, var(--pr-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Main Content */
  .pr-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Plan Header */
  .pr-plan-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .pr-plan-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--pr-surface);
    border: 1px solid var(--pr-border);
    border-radius: 100px;
    padding: 5px 14px 5px 9px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--pr-text-secondary);
    margin-bottom: 1rem;
  }

  .pr-plan-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--pr-accent);
    animation: prPulse 1.5s ease infinite;
  }

  @keyframes prPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.5; }
  }

  .pr-plan-name {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--pr-text);
    margin-bottom: 0.5rem;
  }

  .pr-plan-price {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--pr-accent);
    margin-bottom: 1rem;
  }

  .pr-plan-price small {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--pr-text-secondary);
  }

  .pr-plan-desc {
    color: var(--pr-text-secondary);
    font-size: 0.95rem;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Grid Layout */
  .pr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .pr-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .pr-header {
      padding: 0 1rem;
    }
    .pr-main {
      padding: 1rem;
    }
  }

  /* Features Card */
  .pr-card {
    background: var(--pr-surface);
    border: 1px solid var(--pr-border);
    border-radius: 20px;
    overflow: hidden;
  }

  .pr-card-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--pr-border);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pr-card-header h2 {
    font-family: 'Sora', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--pr-text);
  }

  .pr-card-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--pr-accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--pr-accent);
  }

  .pr-features-list {
    padding: 1.5rem;
  }

  .pr-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--pr-border);
  }

  .pr-feature-item:last-child {
    border-bottom: none;
  }

  .pr-feature-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--pr-success);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .pr-feature-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pr-feature-title {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--pr-text);
    line-height: 1.4;
  }

  .pr-feature-desc {
    font-size: 0.8rem;
    color: var(--pr-text-secondary);
    line-height: 1.55;
  }

  /* What's Included Section */
  .pr-included-list {
    padding: 1.5rem;
  }

  .pr-included-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    font-size: 0.85rem;
    color: var(--pr-text-secondary);
  }

  .pr-included-item svg {
    color: var(--pr-success);
    flex-shrink: 0;
  }

  /* Who is this for */
  .pr-for-list {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pr-for-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .pr-for-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--pr-accent);
    flex-shrink: 0;
    margin-top: 5px;
  }

  .pr-for-item-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pr-for-item-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--pr-text);
  }

  .pr-for-item-desc {
    font-size: 0.78rem;
    color: var(--pr-text-secondary);
    line-height: 1.5;
  }

  /* Tech Stack */
  .pr-tech-stack {
    padding: 1.5rem;
  }

  .pr-tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pr-tech-tag {
    background: var(--pr-accent-dim);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--pr-accent);
  }

  /* CTA Button */
  .pr-cta {
    margin-top: 2rem;
    text-align: center;
  }

  .pr-get-started {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, var(--pr-accent), #2563eb);
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    padding: 14px 36px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  }

  .pr-get-started:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.45);
  }

  /* Loading State */
  .pr-loading {
    text-align: center;
    padding: 4rem;
    color: var(--pr-text-secondary);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .pr-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid var(--pr-border);
    border-top-color: var(--pr-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }
`;

// Each feature now has a title + desc for clear, simple explanation
const planDetails = {
  // ─── WEBSITE PLANS ───────────────────────────────────────────────

  static_website: {
    name: "Static Website",
    price: "₹3,499",
    description:
      "Perfect for small businesses, portfolios, and informational websites. A fast, responsive, and SEO-friendly static website.",
    features: [
      {
        title: "📄 Up to 5 Pages",
        desc: "We design up to 5 pages for your website — like Home, About Us, Services, Gallery, and Contact. You tell us what you need, we build it professionally.",
      },
      {
        title: "📱 Works on All Devices",
        desc: "Your website will look great on any phone, tablet, or computer. Visitors won't need to zoom in or scroll sideways — it adjusts automatically.",
      },
      {
        title: "🔍 Shows Up on Google",
        desc: "We build your site in a way that helps Google find and rank it. More visibility means more customers discovering you online — without paying for ads.",
      },
      {
        title: "📩 Contact Form",
        desc: "Visitors can send you a message directly from your website. You'll get their name, number, or query straight to your email — no need to share your personal number publicly.",
      },
      {
        title: "🔗 Social Media Links",
        desc: "We connect your Instagram, Facebook, LinkedIn, or any other profile to your website. Visitors can follow you in one tap.",
      },
      {
        title: "📊 Visitor Tracking (Google Analytics)",
        desc: "See how many people visit your site, which pages they read, and where they come from — all in a simple, free dashboard.",
      },
      {
        title: "⚡ Fast Loading Speed",
        desc: "Nobody waits for a slow website. We make sure your site loads in seconds so visitors don't leave before they even see your content.",
      },
      {
        title: "🔒 Basic Security",
        desc: "We add essential protections to keep your website safe from common online threats and prevent misuse.",
      },
    ],
    included: [
      "1 Round of Revisions — you can ask for changes once after delivery",
      "Source Code Delivery — the full website files are yours to keep",
      "Basic SEO Setup — helps Google find your site from day one",
      "Mobile Friendly Design — tested and optimised for phones",
    ],
    whoIsItFor: [
      {
        title: "Small Business Owners",
        desc: "Get a professional online presence to attract local and online customers.",
      },
      {
        title: "Freelancers & Professionals",
        desc: "Showcase your skills, services, and past work in a clean portfolio.",
      },
      {
        title: "Startups & New Brands",
        desc: "Launch a landing page quickly and start building credibility online.",
      },
      {
        title: "Anyone Who Wants to Go Online",
        desc: "If you don't have a website yet, this is the perfect starting point.",
      },
    ],
    techStack: ["React.JS", "Bootstrap", "HTML+CSS+JS"],
    idealFor: "Portfolio, Business, Landing Page",
    category: "website",
  },

  static_website_hosting: {
    name: "Static Website + Hosting",
    price: "₹4,499",
    description:
      "Complete static website package with 1 year of free hosting. Everything you need to get online quickly.",
    features: [
      {
        title: "📄 Up to 5 Pages",
        desc: "We design up to 5 pages for your website — like Home, About Us, Services, Gallery, and Contact. Fully tailored to your business.",
      },
      {
        title: "📱 Works on All Devices",
        desc: "Your website looks and works perfectly on mobiles, tablets, and desktops — no extra effort needed from your side.",
      },
      {
        title: "🔍 Shows Up on Google",
        desc: "We structure your website so search engines like Google can easily find and show it to people searching for your business.",
      },
      {
        title: "📩 Contact Form",
        desc: "A ready-to-use form so customers can reach you directly from your website. Replies land straight in your inbox.",
      },
      {
        title: "🔗 Social Media Links",
        desc: "We add your social profiles so visitors can follow you on Instagram, Facebook, or wherever you are.",
      },
      {
        title: "🌐 We Handle Hosting",
        desc: "Once your website is ready, we host it for you. You don’t need to deal with servers or setup — we take care of everything.",
      },
      {
        title: "🌍 Free Domain Assistance",
        desc: "We help you pick and set up a domain name (like www.yourbusiness.com) so your site has a professional web address.",
      },
      {
        title: "🔐 SSL Certificate Included",
        desc: "Your website will show the padlock icon (https://) which tells visitors your site is safe and trustworthy — also helps with Google ranking.",
      },
      {
        title: "📧 Email Support",
        desc: "Got a question after delivery? Just email us and we'll help you out.",
      },
    ],
    included: [
      "Hosting — After creating your website, we can host it for you.",
      "Domain Assistance — we help you get your own web address",
      "SSL Certificate — secure padlock for your website",
      "1 Round of Revisions — request changes once after delivery",
    ],
    whoIsItFor: [
      {
        title: "Business Owners Going Online for the First Time",
        desc: "Everything is handled — design, hosting, and domain setup. Just share your details and we do the rest.",
      },
      {
        title: "Startups Who Want to Launch Fast",
        desc: "Get your business online in days, not weeks, with a complete ready-to-go package.",
      },
      {
        title: "Freelancers Building a Portfolio",
        desc: "A professional website with your own domain makes a great first impression on clients.",
      },
    ],
    techStack: ["React.JS", "Bootstrap", "HTML+CSS+JS", "Netlify/Vercel"],
    idealFor: "Business, Portfolio, Startup",
    category: "website",
  },

  dynamic_admin: {
    name: "Dynamic Website (Admin Panel)",
    price: "₹9,999",
    description:
      "Full-featured dynamic website with admin panel. Manage content, users, and settings easily.",
    features: [
      {
        title: "🛠️ Custom Admin Panel",
        desc: "You get a private dashboard where you can manage your website content yourself — no coding needed. Update text, images, and more from one place.",
      },
      {
        title: "📝 Content Management System",
        desc: "Add, edit, or delete content on your website anytime you want — just like editing a Word document, but for your website.",
      },
      {
        title: "👥 User Management",
        desc: "See who has registered on your website, manage their accounts, and control what they can access.",
      },
      {
        title: "🗄️ Database Integration",
        desc: "All your data — customers, leads, content — is stored safely in a cloud database and can be accessed anytime.",
      },
      {
        title: "🔑 Role-Based Access",
        desc: "Give different team members different levels of access. For example, an editor can update content but can't delete users.",
      },
      {
        title: "🔍 SEO Management",
        desc: "Control how each page of your website appears on Google — update titles, descriptions, and keywords from the admin panel.",
      },
      {
        title: "📰 Blog / News Module",
        desc: "Publish articles, news updates, or blog posts directly from your admin panel. Great for keeping your website fresh and engaging.",
      },
      {
        title: "📩 Contact Form with Database",
        desc: "All messages sent through your contact form are saved in your dashboard — so you never lose a customer inquiry.",
      },
      {
        title: "📊 Analytics Dashboard",
        desc: "See your website's performance data — visitors, popular pages, and more — all inside your admin panel.",
      },
    ],
    included: [
      "Admin Panel Access — manage your site without touching any code",
      "Database Setup — your data is stored safely in the cloud",
      "2 Rounds of Revisions — two chances to request changes after delivery",
      "Basic Training — we show you how to use the admin panel",
    ],
    whoIsItFor: [
      {
        title: "Business Owners Who Update Content Often",
        desc: "Change prices, add products, post announcements — without calling a developer every time.",
      },
      {
        title: "Bloggers & Content Creators",
        desc: "Write and publish posts from a simple dashboard — no coding knowledge required.",
      },
      {
        title: "News Portals & Media Sites",
        desc: "Publish breaking news or daily updates quickly using the built-in blog and news module.",
      },
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase"],
    idealFor: "Blogs, News Portals, Small Business with Content Updates",
    category: "website",
  },

  dynamic_pg: {
    name: "Dynamic Website + PG Integration",
    price: "₹19,999",
    description:
      "Dynamic website with Payment Gateway integration. Perfect for e-commerce and service bookings.",
    features: [
      {
        title: "🌐 Complete Dynamic Website",
        desc: "A fully functional website where content updates in real time — perfect for stores, bookings, and service businesses.",
      },
      {
        title: "💳 Payment Gateway Integration",
        desc: "Accept online payments directly on your website. Customers can pay by UPI, card, net banking, or wallets.",
      },
      {
        title: "📲 Razorpay / Stripe Support",
        desc: "We integrate India's most trusted payment platforms — Razorpay for Indian payments and Stripe for international ones.",
      },
      {
        title: "📦 Order Management System",
        desc: "Track every order placed on your website — see status, customer details, and payment info all from one dashboard.",
      },
      {
        title: "🛍️ Product / Service Catalog",
        desc: "List all your products or services with photos, prices, and descriptions. Customers can browse and buy easily.",
      },
      {
        title: "🛒 Shopping Cart",
        desc: "Customers can add multiple items to a cart and checkout in one go — just like on any major shopping website.",
      },
      {
        title: "📧 Email Notifications",
        desc: "Automatic emails are sent to you and your customer whenever an order is placed, confirmed, or updated.",
      },
      {
        title: "🧾 Invoice Generation",
        desc: "A professional invoice is automatically created for every order — you and your customer both get a copy.",
      },
      {
        title: "📋 Transaction History",
        desc: "See a complete record of all payments received — helpful for accounting and customer support.",
      },
    ],
    included: [
      "Payment Gateway Setup — we handle the technical integration for you",
      "Admin Panel — manage orders, products, and customers easily",
      "Order Management — track and update every order from one place",
      "3 Rounds of Revisions — three chances to fine-tune the website",
    ],
    whoIsItFor: [
      {
        title: "Online Store Owners",
        desc: "Sell your products online and accept payments 24/7 — even while you sleep.",
      },
      {
        title: "Service Providers",
        desc: "Let customers book and pay for your services online — salons, tutors, coaches, and more.",
      },
      {
        title: "Subscription Businesses",
        desc: "Collect recurring payments for memberships, plans, or monthly services automatically.",
      },
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Other Payment Gateways",
    ],
    idealFor: "E-commerce, Service Booking, Subscription Sites",
    category: "website",
  },

  dynamic_pg_otp: {
    name: "Dynamic + PG + OTP Integration",
    price: "₹29,999",
    description:
      "Enterprise-grade website with Payment Gateway and OTP verification for maximum security.",
    features: [
      {
        title: "🌐 Complete Dynamic Website",
        desc: "A fully featured website with real-time updates — built to handle large volumes of users and transactions safely.",
      },
      {
        title: "💳 Payment Gateway Integration",
        desc: "Accept all types of online payments — UPI, cards, net banking, and wallets — fully integrated and tested.",
      },
      {
        title: "📲 OTP Verification System",
        desc: "Users verify their phone number or email with a one-time password before logging in or making a payment. This stops fake accounts and fraud.",
      },
      {
        title: "📱 SMS Integration",
        desc: "Automatic SMS messages are sent to users for OTP verification, order confirmation, and important updates.",
      },
      {
        title: "🔐 Advanced Security Features",
        desc: "Multiple layers of security protect your website and your customers' data from hackers and online threats.",
      },
      {
        title: "🔏 Two-Factor Authentication",
        desc: "Users need both their password AND an OTP to log in — making it much harder for anyone to break into accounts.",
      },
      {
        title: "📦 Order Management System",
        desc: "A complete system to manage, track, and update every order placed on your website.",
      },
      {
        title: "👤 User Dashboard",
        desc: "Each customer gets their own personal dashboard to track orders, manage their profile, and view transaction history.",
      },
      {
        title: "📧 Email & SMS Notifications",
        desc: "Automatic messages are sent via both email and SMS for every important action — order placed, payment received, etc.",
      },
      {
        title: "🕵️ Fraud Detection",
        desc: "Smart checks are in place to catch suspicious activity and block fraudulent transactions before they happen.",
      },
    ],
    included: [
      "Payment Gateway Setup — complete integration with major payment providers",
      "SMS / OTP Integration — secure verification for every login and payment",
      "Admin Panel — full control over users, orders, and content",
      "5 Rounds of Revisions — plenty of chances to get it exactly right",
      "Priority Support — your queries are handled first",
    ],
    whoIsItFor: [
      {
        title: "E-commerce Businesses Handling Large Orders",
        desc: "Need a secure, high-traffic online store? This plan is built for scale and safety.",
      },
      {
        title: "Fintech & Finance Apps",
        desc: "Platforms dealing with money transfers or loans need the highest level of security — this plan delivers that.",
      },
      {
        title: "Healthcare & High-Trust Services",
        desc: "Businesses where user identity and data privacy matter most benefit from OTP-based verification.",
      },
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Other Payment Gateways",
      "Twilio/SMSGup",
    ],
    idealFor: "E-commerce, Banking, High-Security Applications",
    category: "website",
  },

  // ─── ANDROID PLANS ───────────────────────────────────────────────

  static_android: {
    name: "Static Android App",
    price: "₹4,999",
    description:
      "Perfect for informational apps, portfolio showcases, and simple business presentations. A lightweight and fast Android application.",
    features: [
      {
        title: "📱 Up to 5 Screens",
        desc: "We design up to 5 screens for your app — like Home, About, Services, Gallery, and Contact. Clean, professional, and easy to navigate.",
      },
      {
        title: "🎨 Material Design UI",
        desc: "Your app will follow Google's design guidelines — meaning it looks modern, familiar, and easy to use for any Android user.",
      },
      {
        title: "🔄 Smooth Navigation",
        desc: "Users can move between screens easily with smooth transitions — no lag, no confusion.",
      },
      {
        title: "📶 Offline Content Support",
        desc: "Basic content in your app will still be visible even without internet — so users can always access key information.",
      },
      {
        title: "🔔 Push Notifications",
        desc: "Send alerts and updates directly to your users' phones — great for promotions, reminders, or announcements.",
      },
      {
        title: "🖼️ App Icon & Splash Screen",
        desc: "Your app will have a custom icon on the phone and a branded splash screen that shows when the app opens — making a great first impression.",
      },
      {
        title: "🏪 Play Store Listing Support",
        desc: "We help you prepare everything needed to publish your app on the Google Play Store — so users can download it easily.",
      },
      {
        title: "📊 Basic Analytics Integration",
        desc: "Track how many people use your app, which screens they visit, and how long they stay — useful data for growing your business.",
      },
      {
        title: "📐 Works on All Android Phones",
        desc: "Your app will look and work properly on all screen sizes — from budget phones to high-end devices.",
      },
    ],
    included: [
      "Source Code Delivery — the full app code is yours to keep",
      "APK File — ready-to-install file for Android devices",
      "1 Round of Revisions — one chance to request changes after delivery",
      "Basic Documentation — simple guide on how your app works",
      "30 Days Bug Support — if something breaks within 30 days, we fix it free",
    ],
    whoIsItFor: [
      {
        title: "Small Business Owners",
        desc: "Give your customers an easy way to view your services, contact you, or find your location — right from their phone.",
      },
      {
        title: "Freelancers & Professionals",
        desc: "Showcase your portfolio, resume, or services in a slick mobile app.",
      },
      {
        title: "Restaurants, Salons & Local Shops",
        desc: "Share your menu, price list, or service catalogue with customers in an app format.",
      },
    ],
    techStack: [
      "React Native",
      "Android Studio",
      "XML",
      "Firebase Basics",
      "Expo",
    ],
    idealFor: "Portfolio Apps, Business Info Apps, Brochure Apps",
    category: "android",
  },

  android_db: {
    name: "Android App with Database Connection",
    price: "₹8,999",
    description:
      "Dynamic Android app with cloud database integration. Perfect for apps requiring user data storage, login systems, and real-time content updates.",
    features: [
      {
        title: "📱 Unlimited Screens",
        desc: "No limit on how many screens your app can have — we build as many as your app needs to work properly.",
      },
      {
        title: "🔐 User Login & Registration",
        desc: "Users can create their own accounts and log in securely. Supports email/password and social logins.",
      },
      {
        title: "☁️ Cloud Database Integration",
        desc: "All user data — profiles, posts, bookings — is stored safely in the cloud. Accessible anytime, from any device.",
      },
      {
        title: "⚡ Real-Time Data Sync",
        desc: "When something changes in your app — like a new message or update — it appears instantly without needing to refresh.",
      },
      {
        title: "👤 User Profile Management",
        desc: "Each user gets their own profile page where they can view and update their personal information.",
      },
      {
        title: "🛠️ Admin Dashboard",
        desc: "You get a web-based admin panel to manage all users, content, and app data — without touching any code.",
      },
      {
        title: "🔔 Push Notifications",
        desc: "Send targeted messages to your users' phones — for updates, promotions, or reminders.",
      },
      {
        title: "🔄 In-App Updates",
        desc: "Push new content or announcements to all users instantly — no need to release a new app version.",
      },
      {
        title: "💾 Data Backup & Restore",
        desc: "Your app data is automatically backed up in the cloud — no risk of losing important information.",
      },
      {
        title: "🔌 Secure API Integration",
        desc: "Your app connects securely to your backend server — all data is encrypted and protected.",
      },
    ],
    included: [
      "Complete Source Code — the full app and backend code is yours",
      "Database Setup — cloud database configured and ready to use",
      "Admin Panel Access — manage your app data from a browser",
      "2 Rounds of Revisions — two chances to request changes after delivery",
      "Play Store Deployment Assistance — we help you publish the app",
      "3 Months Bug Support — free fixes for 3 months after launch",
    ],
    whoIsItFor: [
      {
        title: "Community & Social Apps",
        desc: "Build apps where users can sign up, create profiles, and interact with each other.",
      },
      {
        title: "Directory & Listing Apps",
        desc: "Apps that show restaurants, doctors, shops, or any kind of searchable listings stored in a database.",
      },
      {
        title: "News & Content Apps",
        desc: "Publish and update articles, videos, or content in real time — users always see the latest.",
      },
    ],
    techStack: [
      "React Native",
      "Expo",
      "Firebase Firestore",
      "Node.js",
      "MongoDB",
      "REST APIs",
    ],
    idealFor:
      "Social Apps, Content Apps, User-Based Applications, Directory Apps",
    category: "android",
  },

  android_pg: {
    name: "Android App with Payment Gateway",
    price: "₹19,999",
    description:
      "Full-featured e-commerce Android app with secure payment gateway integration. Built for online stores, service bookings, and subscription platforms.",
    features: [
      {
        title: "🛍️ Complete E-commerce Features",
        desc: "Everything you need to run an online store in an app — product listings, cart, checkout, order tracking, and more.",
      },
      {
        title: "💳 Payment Gateway Integration",
        desc: "Accept online payments securely inside your app. Customers can pay via UPI, cards, net banking, or wallets.",
      },
      {
        title: "📲 Razorpay / Stripe / PhonePe Support",
        desc: "We integrate the most popular and trusted payment platforms in India and globally — whichever suits your business.",
      },
      {
        title: "📦 Product Catalog Management",
        desc: "Easily add, edit, or remove products with photos, descriptions, and prices — all from your admin panel.",
      },
      {
        title: "🛒 Shopping Cart System",
        desc: "Customers can add multiple items and checkout in one step — a smooth buying experience like on Amazon or Flipkart.",
      },
      {
        title: "🚚 Order Tracking",
        desc: "Customers can track the status of their orders in real time — from placed to delivered.",
      },
      {
        title: "👛 User Wallet Integration",
        desc: "Customers can add money to a wallet inside your app and use it for faster checkout on future purchases.",
      },
      {
        title: "🧾 Invoice Generation",
        desc: "A professional invoice is automatically generated for every order — both you and your customer receive a copy.",
      },
      {
        title: "🏷️ Coupon & Discount System",
        desc: "Create discount codes and offers to attract more customers and run promotions easily.",
      },
      {
        title: "⭐ Ratings & Reviews",
        desc: "Customers can rate and review products — helps build trust and helps others make better buying decisions.",
      },
      {
        title: "❤️ Wishlist Feature",
        desc: "Users can save products they like and come back to buy them later — increases the chances of a sale.",
      },
      {
        title: "📋 Order History",
        desc: "Customers can see all their past orders in one place — easy to reorder or raise a query.",
      },
      {
        title: "🔐 Secure Payment Processing",
        desc: "All payment data is fully encrypted and handled according to industry security standards — safe for you and your customers.",
      },
    ],
    included: [
      "Payment Gateway Setup — complete integration, tested and ready",
      "Admin Dashboard — manage orders, products, and customers from a browser",
      "Order Management System — track and update every order easily",
      "Complete Source Code — the full app and backend code is yours",
      "3 Rounds of Revisions — three chances to get it exactly right",
      "Play Store Deployment — we publish the app for you",
      "6 Months Bug Support — free fixes for 6 months after launch",
      "Basic Maintenance — minor tweaks and updates included",
    ],
    whoIsItFor: [
      {
        title: "Online Stores & Sellers",
        desc: "Sell your products directly through your own branded app — no commission to third-party marketplaces.",
      },
      {
        title: "Service Booking Businesses",
        desc: "Let customers book appointments and pay in advance — salons, clinics, tutors, and more.",
      },
      {
        title: "Subscription & Membership Platforms",
        desc: "Charge users monthly or yearly for access to your content, community, or services.",
      },
      {
        title: "Marketplace Builders",
        desc: "Create a platform where multiple sellers list their products and buyers can browse and purchase.",
      },
    ],
    techStack: [
      "React Native",
      "Expo",
      "Firebase",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay API",
      "REST APIs",
      "Payment Gateways",
    ],
    idealFor:
      "E-commerce Stores, Service Booking Apps, Subscription Apps, Marketplace Apps",
    category: "android",
  },

  // ─── CUSTOM PLANS ────────────────────────────────────────────────

  customize_website: {
    name: "Customize Your Website Plan",
    price: "Custom",
    description:
      "Need something specific for your website? Let us create a custom solution tailored to your exact requirements.",
    features: [
      {
        title: "🎯 Tailored Functionality",
        desc: "We build exactly what your business needs — no unnecessary features, no missing ones.",
      },
      {
        title: "⚙️ Custom Features Development",
        desc: "Have a unique idea? We can build features that don't exist anywhere else — made just for you.",
      },
      {
        title: "📈 Scalable Architecture",
        desc: "Built to grow with your business — whether you have 10 users or 10,000, the website will handle it.",
      },
      {
        title: "🔌 Third-Party Integrations",
        desc: "We connect your website to any external tools you use — CRMs, ERPs, maps, communication platforms, and more.",
      },
      {
        title: "🔗 API Development",
        desc: "We build custom APIs so your website can talk to other apps, mobile apps, or services securely.",
      },
      {
        title: "🗄️ Custom Database Design",
        desc: "Your data is structured exactly the way your business logic requires — fast, organised, and easy to manage.",
      },
      {
        title: "🔐 Advanced Security Implementation",
        desc: "We apply the highest security standards — encryption, access controls, and monitoring — to keep your platform safe.",
      },
      {
        title: "⚡ Performance Optimization",
        desc: "Your website is fine-tuned to load fast and run smoothly — even under heavy traffic.",
      },
      {
        title: "🛡️ Lifetime Support Options",
        desc: "Choose a long-term maintenance and support plan so your website always stays updated and running.",
      },
    ],
    included: [
      "Free Consultation — we understand your requirements before quoting a price",
      "Custom Quote — you only pay for what you actually need",
      "Dedicated Project Manager — one point of contact throughout the project",
      "Flexible Payment Terms — we work around your budget and timeline",
    ],
    whoIsItFor: [
      {
        title: "Enterprises & Large Businesses",
        desc: "Complex workflows, large teams, and big data? We build platforms that can handle it all.",
      },
      {
        title: "Startups with Unique Ideas",
        desc: "If your idea doesn't fit a standard template, we build it from scratch exactly as you envision.",
      },
      {
        title: "Businesses Needing Custom Integrations",
        desc: "Already using specific software? We connect everything into one seamless system.",
      },
    ],
    techStack: ["Any Tech Stack", "Custom Architecture", "As per Requirements"],
    idealFor: "Complex Projects, Enterprises, Unique Requirements",
    category: "custom",
  },

  customize: {
    name: "Customize Your Plan",
    price: "Custom",
    description:
      "Need something specific? Let us create a custom solution tailored to your exact requirements.",
    features: [
      {
        title: "🎯 Tailored Functionality",
        desc: "We build exactly what your business needs — no unnecessary features, no missing ones.",
      },
      {
        title: "⚙️ Custom Features Development",
        desc: "Have a unique idea? We can build features that don't exist anywhere else — made just for you.",
      },
      {
        title: "📈 Scalable Architecture",
        desc: "Built to grow with your business — whether you have 10 users or 10,000, the solution will handle it.",
      },
      {
        title: "🔌 Third-Party Integrations",
        desc: "We connect your platform to any external tools — CRMs, payment systems, maps, communication tools, and more.",
      },
      {
        title: "🔗 API Development",
        desc: "We build custom APIs so your platform can talk to other apps and services securely.",
      },
      {
        title: "🗄️ Custom Database Design",
        desc: "Your data is structured exactly the way your business needs — fast, organised, and easy to manage.",
      },
      {
        title: "🔐 Advanced Security Implementation",
        desc: "Top-level security standards applied across the board — encryption, access controls, and real-time monitoring.",
      },
      {
        title: "⚡ Performance Optimization",
        desc: "Fine-tuned to load fast and run smoothly — even during high traffic or heavy usage.",
      },
      {
        title: "🛡️ Lifetime Support Options",
        desc: "Choose a long-term maintenance plan so your platform always stays up-to-date and running.",
      },
    ],
    included: [
      "Free Consultation — we understand your requirements before quoting",
      "Custom Quote — you only pay for what you actually need",
      "Dedicated Project Manager — one point of contact from start to finish",
      "Flexible Payment Terms — we work around your budget and timeline",
    ],
    whoIsItFor: [
      {
        title: "Enterprises & Large Businesses",
        desc: "Complex workflows, large teams, and big data? We build platforms that handle it all.",
      },
      {
        title: "Startups with Unique Ideas",
        desc: "If your idea doesn't fit a standard plan, we build it from scratch exactly as you envision.",
      },
      {
        title: "Businesses Needing Custom Integrations",
        desc: "Already using specific software? We connect everything into one seamless system.",
      },
    ],
    techStack: ["Any Tech Stack", "Custom Architecture", "As per Requirements"],
    idealFor: "Complex Projects, Enterprises, Unique Requirements",
    category: "custom",
  },
};

export default function Price() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan, planName, planAmount } = location.state || {};

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  let plan = planDetails[selectedPlan];

  if (!plan) {
    if (selectedPlan?.includes("customize")) {
      plan = planDetails.customize;
    } else {
      plan = planDetails.customize;
    }
  }

  const displayName = planName || plan.name;
  const displayPrice = planAmount || plan.price;

  const getCategoryBadge = (category) => {
    if (category === "android") {
      return {
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.1)",
        text: "Android App",
      };
    } else if (category === "website") {
      return {
        color: "#3b82f6",
        bg: "rgba(59, 130, 246, 0.1)",
        text: "Website Development",
      };
    }
    return {
      color: "#8b5cf6",
      bg: "rgba(139, 92, 246, 0.1)",
      text: "Custom Solution",
    };
  };

  const categoryInfo = getCategoryBadge(plan.category);

  const getTechStackIcons = () => {
    return plan.techStack.map((tech, i) => (
      <span key={i} className="pr-tech-tag">
        {tech}
      </span>
    ));
  };

  return (
    <>
      <style>{priceStyles}</style>
      <AppNavbar />

      <div className="pr">
        {/* Header */}
        <header className="pr-header">
          <div className="pr-header-left">
            <button className="pr-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Back
            </button>
            <div className="pr-logo">
              <div className="pr-logo-icon">P</div>
              <div className="pr-logo-text">
                Plan <span>Details</span>
              </div>
            </div>
          </div>
        </header>

        <main className="pr-main">
          {/* Plan Header */}
          <div className="pr-plan-header">
            <div className="pr-plan-badge">
              <div
                className="pr-plan-badge-dot"
                style={{ background: categoryInfo.color }}
              />
              <span style={{ color: categoryInfo.color }}>
                {categoryInfo.text}
              </span>
            </div>
            <h1 className="pr-plan-name">{displayName}</h1>
            <div className="pr-plan-price">
              {displayPrice}
              <small> / one-time</small>
            </div>
            <p className="pr-plan-desc">{plan.description}</p>
          </div>

          {/* Grid Layout */}
          <div className="pr-grid">
            {/* Features Section */}
            <div className="pr-card">
              <div className="pr-card-header">
                <div className="pr-card-icon">
                  <CheckCircle size={16} />
                </div>
                <h2>What's Included</h2>
              </div>
              <div className="pr-features-list">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="pr-feature-item">
                    <div className="pr-feature-icon">
                      <CheckCircle size={16} />
                    </div>
                    <div className="pr-feature-content">
                      <div className="pr-feature-title">{feature.title}</div>
                      <div className="pr-feature-desc">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* What You Get */}
              <div className="pr-card" style={{ marginBottom: "1.5rem" }}>
                <div className="pr-card-header">
                  <div className="pr-card-icon">
                    <Zap size={16} />
                  </div>
                  <h2>What You Get</h2>
                </div>
                <div className="pr-included-list">
                  {plan.included.map((item, idx) => (
                    <div key={idx} className="pr-included-item">
                      <CheckCircle size={14} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who is this for */}
              <div className="pr-card" style={{ marginBottom: "1.5rem" }}>
                <div className="pr-card-header">
                  <div className="pr-card-icon">
                    <Users size={16} />
                  </div>
                  <h2>Who Is This For?</h2>
                </div>
                <div className="pr-for-list">
                  {plan.whoIsItFor.map((item, idx) => (
                    <div key={idx} className="pr-for-item">
                      <div className="pr-for-dot" />
                      <div className="pr-for-item-content">
                        <div className="pr-for-item-title">{item.title}</div>
                        <div className="pr-for-item-desc">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="pr-card">
                <div className="pr-card-header">
                  <div className="pr-card-icon">
                    <Code size={16} />
                  </div>
                  <h2>Technologies Used</h2>
                </div>
                <div className="pr-tech-stack">
                  <div className="pr-tech-tags">{getTechStackIcons()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pr-cta">
            <button
              className="pr-get-started"
              onClick={() => navigate("/contact")}
            >
              Get Started Now{" "}
              <ArrowLeft size={16} style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
