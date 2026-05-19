import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../images/logo.jpg'
import logo2 from "../images/logo2.png"
import { useNavigate, useLocation } from 'react-router-dom'

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');

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

  /* ── Navbar shell ── */
  .ak-navbar {
    background: #0a0a0a;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--ak-border);
    padding: 0 !important;
    min-height: 72px;
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: background var(--ak-transition), box-shadow var(--ak-transition);
    font-family: 'Inter', sans-serif;
  }

  /* Bottom gradient line for separation */
  .ak-navbar::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--ak-accent), 
      rgba(59, 130, 246, 0.5), 
      var(--ak-accent), 
      transparent
    );
    opacity: 0.6;
    pointer-events: none;
  }

  .ak-navbar.scrolled {
    background: rgba(10, 10, 10, 0.97) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  }

  .ak-navbar .container-fluid {
    padding: 0 2rem;
    min-height: 82px;
    display: flex;
    align-items: center;
  }

  .ak-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none !important;
    padding: 12px 0;
    cursor: pointer;
  }

  .ak-logo-wrap {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
  }

  .ak-logo-wrap img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 10px;
    display: block;
    transition: transform 0.25s ease, filter 0.25s ease;
  }

  .ak-brand:hover .ak-logo-wrap img {
    transform: scale(1.05);
    filter: brightness(1.05);
  }

  .ak-brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .ak-brand-line1 {
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: -0.01em;
    color: var(--ak-text);
    white-space: nowrap;
  }

  .ak-brand-line2 {
    font-weight: 500;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--ak-text-secondary);
    white-space: nowrap;
  }

  /* ── Nav Links ── */
  .ak-nav-link {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--ak-muted) !important;
    letter-spacing: normal;
    padding: 6px 14px !important;
    border-radius: 6px;
    position: relative;
    transition: color 0.2s ease, background 0.2s ease !important;
    margin: 0 2px;
    white-space: nowrap;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .ak-nav-link:hover {
    color: var(--ak-text) !important;
    background: var(--ak-surface) !important;
  }

  .ak-nav-link.active {
    color: var(--ak-accent) !important;
    background: rgba(59, 130, 246, 0.08);
  }

  .ak-nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 14px;
    right: 14px;
    height: 2px;
    background: var(--ak-accent);
    border-radius: 2px;
  }

  /* ── CTA Button ── */
  .ak-cta {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 0.85rem;
    color: var(--ak-text) !important;
    background: linear-gradient(135deg, var(--ak-accent), #2563eb);
    border: none;
    border-radius: 8px;
    padding: 8px 20px !important;
    text-decoration: none !important;
    transition: all 0.25s ease !important;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    margin-left: 8px;
    cursor: pointer;
  }

  .ak-cta:hover {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    transform: translateY(-2px);
  }

  .ak-cta:active { transform: translateY(0); }

  .ak-cta .ak-arrow {
    display: inline-block;
    transition: transform 0.2s ease;
  }

  .ak-cta:hover .ak-arrow { transform: translate(3px, -2px); }

  /* ── Toggler ── */
  .ak-toggler {
    border: 1px solid var(--ak-border) !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    background: transparent !important;
    box-shadow: none !important;
    transition: all 0.2s ease !important;
  }

  .ak-toggler:hover {
    background: var(--ak-surface) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
  }

  .ak-toggler-icon {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 18px;
  }

  .ak-toggler-icon span {
    display: block;
    height: 2px;
    background: var(--ak-text-secondary);
    border-radius: 2px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ak-toggler-icon span:nth-child(2) { width: 70%; }

  .ak-toggler.open .ak-toggler-icon span:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 100%; }
  .ak-toggler.open .ak-toggler-icon span:nth-child(2) { opacity: 0; width: 0; }
  .ak-toggler.open .ak-toggler-icon span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 100%; }

  /* ── Mobile ── */
  @media (max-width: 991px) {
    .ak-navbar .container-fluid { padding: 0 1rem; }

    .navbar-collapse {
      background: rgba(15, 15, 15, 0.98);
      backdrop-filter: blur(12px);
      border: 1px solid var(--ak-border);
      border-radius: 16px;
      padding: 16px;
      margin-top: 12px;
    }

    .ak-nav-link {
      padding: 10px 14px !important;
      justify-content: center;
      width: 100%;
    }

    .ak-cta {
      margin: 12px 0 4px 0 !important;
      justify-content: center;
    }
  }
`

export default function AppNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const path = location.pathname
    if (path === '/') setActiveItem('Home')
    else if (path === '/ourwork') setActiveItem('Work')
    else if (path === '/about') setActiveItem('About')
    else if (path === '/services') setActiveItem('Services')
    else if (path === '/contact') setActiveItem('Contact')
    else if (path === '/price') setActiveItem('')
    else setActiveItem('')
  }, [location])

  const handleNavigation = (path, itemName) => {
    navigate(path)
    setActiveItem(itemName)
    setExpanded(false)
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/ourwork' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Choose Us', path: '/whychooseus' },
  ]

  return (
    <>
      <style>{navStyles}</style>

      <Navbar
        expand="lg"
        className={`ak-navbar${scrolled ? ' scrolled' : ''}`}
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container fluid>

          <div className="ak-brand" onClick={() => handleNavigation('/', 'Home')}>
            <div className="ak-logo-wrap">
              <img src={logo2} alt="AK Software Developers logo" />
            </div>
            <div className="ak-brand-text">
              <span className="ak-brand-line1">AK Software Developers</span>
              <span className="ak-brand-line2">Engineering Tomorrow</span>
            </div>
          </div>

          <Navbar.Toggle
            aria-controls="ak-navmenu"
            className={`ak-toggler${expanded ? ' open' : ''}`}
          >
            <div className="ak-toggler-icon">
              <span /><span /><span />
            </div>
          </Navbar.Toggle>

          <Navbar.Collapse id="ak-navmenu">
            <Nav className="mx-auto align-items-lg-center gap-lg-1">
              {navItems.map(item => (
                <Nav.Link
                  key={item.name}
                  className={`ak-nav-link${activeItem === item.name ? ' active' : ''}`}
                  onClick={() => handleNavigation(item.path, item.name)}
                >
                  <span className="ak-link-text">{item.name}</span>
                </Nav.Link>
              ))}
            </Nav>

            <Nav className="align-items-lg-center">
              <div
                className="ak-cta"
                onClick={() => handleNavigation('/contact', 'Contact')}
              >
                Contact Us <span className="ak-arrow">↗</span>
              </div>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}