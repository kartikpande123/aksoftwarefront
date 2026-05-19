import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Eye, CheckCircle, XCircle, Trash2, 
  Mail, Phone, Clock, User, MessageSquare, RefreshCw,
  Briefcase, ChevronLeft, ChevronRight, Filter
} from 'lucide-react'
import API_BASE_URL from "./ApiConfig";

const adminContactStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --ac-bg: #0a0a0a;
    --ac-surface: rgba(255, 255, 255, 0.03);
    --ac-border: rgba(255, 255, 255, 0.06);
    --ac-accent: #3b82f6;
    --ac-accent-dim: rgba(59, 130, 246, 0.12);
    --ac-text: #ffffff;
    --ac-text-secondary: #a1a1aa;
    --ac-muted: rgba(255, 255, 255, 0.5);
    --ac-success: #4ade80;
    --ac-warning: #fbbf24;
    --ac-danger: #f87171;
  }

  .ac * { box-sizing: border-box; margin: 0; padding: 0; }

  .ac {
    background: var(--ac-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  /* Header */
  .ac-header {
    position: sticky;
    top: 0;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--ac-border);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    z-index: 100;
  }

  .ac-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .ac-back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-radius: 8px;
    padding: 6px 12px;
    color: var(--ac-text-secondary);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ac-back-btn:hover {
    background: var(--ac-accent-dim);
    color: var(--ac-accent);
    transform: translateX(-2px);
  }

  .ac-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ac-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--ac-accent), #60a5fa);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
  }

  .ac-logo-text {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--ac-text);
  }

  .ac-logo-text span {
    background: linear-gradient(90deg, var(--ac-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .ac-refresh-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-radius: 8px;
    padding: 8px 16px;
    color: var(--ac-text-secondary);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ac-refresh-btn:hover {
    background: var(--ac-accent-dim);
    color: var(--ac-accent);
  }

  /* Main Content */
  .ac-main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .ac-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .ac-stat-card {
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ac-stat-info h4 {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ac-text-secondary);
    margin-bottom: 0.25rem;
  }

  .ac-stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ac-text);
  }

  .ac-stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--ac-accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ac-accent);
  }

  /* Filters */
  .ac-filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .ac-filter-btn {
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.8rem;
    color: var(--ac-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ac-filter-btn:hover {
    border-color: var(--ac-accent-dim);
    color: var(--ac-accent);
  }

  .ac-filter-btn.active {
    background: var(--ac-accent-dim);
    border-color: var(--ac-accent);
    color: var(--ac-accent);
  }

  /* Table */
  .ac-table-container {
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-radius: 16px;
    overflow-x: auto;
  }

  .ac-table {
    width: 100%;
    border-collapse: collapse;
  }

  .ac-table th {
    text-align: left;
    padding: 1rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ac-text-secondary);
    border-bottom: 1px solid var(--ac-border);
  }

  .ac-table td {
    padding: 1rem 1rem;
    font-size: 0.85rem;
    color: var(--ac-text);
    border-bottom: 1px solid var(--ac-border);
  }

  .ac-table tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .ac-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: 20px;
    font-weight: 500;
  }

  .ac-status-badge.pending {
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
  }

  .ac-status-badge.contacted {
    background: rgba(59, 130, 246, 0.12);
    color: #3b82f6;
  }

  .ac-status-badge.completed {
    background: rgba(74, 222, 128, 0.12);
    color: #4ade80;
  }

  .ac-service-tag {
    display: inline-block;
    font-size: 0.7rem;
    background: var(--ac-accent-dim);
    color: var(--ac-accent);
    padding: 2px 8px;
    border-radius: 12px;
    margin: 2px;
  }

  .ac-action-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .ac-action-btn {
    background: transparent;
    border: none;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
  }

  .ac-action-btn.view {
    color: var(--ac-accent);
  }

  .ac-action-btn.view:hover {
    background: var(--ac-accent-dim);
  }

  .ac-action-btn.complete {
    color: var(--ac-success);
  }

  .ac-action-btn.complete:hover {
    background: rgba(74, 222, 128, 0.1);
  }

  .ac-action-btn.delete {
    color: var(--ac-danger);
  }

  .ac-action-btn.delete:hover {
    background: rgba(248, 113, 113, 0.1);
  }

  /* Modal */
  .ac-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .ac-modal-content {
    background: var(--ac-bg);
    border: 1px solid var(--ac-border);
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .ac-modal-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--ac-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ac-modal-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ac-text);
  }

  .ac-modal-close {
    background: transparent;
    border: none;
    color: var(--ac-text-secondary);
    cursor: pointer;
    padding: 4px;
  }

  .ac-modal-body {
    padding: 1.5rem;
  }

  .ac-detail-row {
    margin-bottom: 1rem;
  }

  .ac-detail-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ac-text-secondary);
    margin-bottom: 0.25rem;
  }

  .ac-detail-value {
    font-size: 0.9rem;
    color: var(--ac-text);
    word-break: break-word;
  }

  .ac-loading {
    text-align: center;
    padding: 3rem;
    color: var(--ac-text-secondary);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .ac-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid var(--ac-border);
    border-top-color: var(--ac-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }

  @media (max-width: 768px) {
    .ac-header { padding: 0 1rem; }
    .ac-main { padding: 1rem; }
    .ac-table th, .ac-table td { padding: 0.75rem; }
    .ac-action-btn span { display: none; }
  }
`



export default function AdminContact() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('adminLoggedIn')
    if (!isAdmin) {
      navigate('/adminlogin')
      return
    }
    fetchContacts()
  }, [navigate])

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`)
      const data = await response.json()
      
      if (data.success) {
        setContacts(data.data || [])
      } else {
        console.error('Failed to fetch contacts:', data.message)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      const data = await response.json()
      if (data.success) {
        fetchContacts() // Refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact request?')) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      if (data.success) {
        fetchContacts() // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const viewDetails = (contact) => {
    setSelectedContact(contact)
    setModalOpen(true)
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'Pending', icon: <Clock size={10} /> },
      contacted: { label: 'Contacted', icon: <CheckCircle size={10} /> },
      completed: { label: 'Completed', icon: <CheckCircle size={10} /> }
    }
    const s = statusMap[status] || statusMap.pending
    return (
      <span className={`ac-status-badge ${status || 'pending'}`}>
        {s.icon} {s.label}
      </span>
    )
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFilteredContacts = () => {
    if (filter === 'all') return contacts
    return contacts.filter(contact => contact.status === filter)
  }

  const getStats = () => {
    const total = contacts.length
    const pending = contacts.filter(c => c.status === 'pending').length
    const contacted = contacts.filter(c => c.status === 'contacted').length
    const completed = contacts.filter(c => c.status === 'completed').length
    return { total, pending, contacted, completed }
  }

  const stats = getStats()
  const filteredContacts = getFilteredContacts()

  return (
    <>
      <style>{adminContactStyles}</style>
      
      <div className="ac">
        {/* Header */}
        <header className="ac-header">
          <div className="ac-header-left">
            <button className="ac-back-btn" onClick={() => navigate('/admindashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
            <div className="ac-logo">
              <div className="ac-logo-icon">C</div>
              <div className="ac-logo-text">Project <span>Requests</span></div>
            </div>
          </div>
          <button className="ac-refresh-btn" onClick={fetchContacts}>
            <RefreshCw size={16} /> Refresh
          </button>
        </header>

        {/* Main Content */}
        <main className="ac-main">
          {/* Stats Cards */}
          <div className="ac-stats">
            <div className="ac-stat-card">
              <div className="ac-stat-info">
                <h4>Total Requests</h4>
                <div className="ac-stat-number">{stats.total}</div>
              </div>
              <div className="ac-stat-icon">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="ac-stat-card">
              <div className="ac-stat-info">
                <h4>Pending</h4>
                <div className="ac-stat-number" style={{ color: '#fbbf24' }}>{stats.pending}</div>
              </div>
              <div className="ac-stat-icon" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>
                <Clock size={20} />
              </div>
            </div>
            <div className="ac-stat-card">
              <div className="ac-stat-info">
                <h4>Contacted</h4>
                <div className="ac-stat-number" style={{ color: '#3b82f6' }}>{stats.contacted}</div>
              </div>
              <div className="ac-stat-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="ac-stat-card">
              <div className="ac-stat-info">
                <h4>Completed</h4>
                <div className="ac-stat-number" style={{ color: '#4ade80' }}>{stats.completed}</div>
              </div>
              <div className="ac-stat-icon" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80' }}>
                <CheckCircle size={20} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="ac-filters">
            <button 
              className={`ac-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({stats.total})
            </button>
            <button 
              className={`ac-filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({stats.pending})
            </button>
            <button 
              className={`ac-filter-btn ${filter === 'contacted' ? 'active' : ''}`}
              onClick={() => setFilter('contacted')}
            >
              Contacted ({stats.contacted})
            </button>
            <button 
              className={`ac-filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({stats.completed})
            </button>
          </div>

          {/* Table */}
          <div className="ac-table-container">
            {loading ? (
              <div className="ac-loading">
                <div className="ac-spinner" />
                <p>Loading requests...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="ac-loading">
                <Mail size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p>No contact requests found</p>
              </div>
            ) : (
              <table className="ac-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Services</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>
                        <strong>{contact.name}</strong>
                      </td>
                      <td>
                        <div><Phone size={12} style={{ display: 'inline', marginRight: '4px' }} /> {contact.phone}</div>
                        {contact.email && (
                          <div><Mail size={12} style={{ display: 'inline', marginRight: '4px' }} /> {contact.email}</div>
                        )}
                      </td>
                      <td>
                        {contact.services && contact.services.length > 0 ? (
                          contact.services.map((service, idx) => (
                            <span key={idx} className="ac-service-tag">{service}</span>
                          ))
                        ) : (
                          <span className="ac-service-tag">General Inquiry</span>
                        )}
                      </td>
                      <td>{formatDate(contact.timestamp)}</td>
                      <td>{getStatusBadge(contact.status)}</td>
                      <td>
                        <div className="ac-action-btns">
                          <button 
                            className="ac-action-btn view"
                            onClick={() => viewDetails(contact)}
                            title="View Details"
                          >
                            <Eye size={14} /> <span>View</span>
                          </button>
                          {contact.status !== 'contacted' && (
                            <button 
                              className="ac-action-btn complete"
                              onClick={() => updateStatus(contact.id, 'contacted')}
                              title="Mark Contacted"
                            >
                              <CheckCircle size={14} /> <span>Contact</span>
                            </button>
                          )}
                          {contact.status === 'contacted' && (
                            <button 
                              className="ac-action-btn complete"
                              onClick={() => updateStatus(contact.id, 'completed')}
                              title="Mark Completed"
                            >
                              <CheckCircle size={14} /> <span>Complete</span>
                            </button>
                          )}
                          <button 
                            className="ac-action-btn delete"
                            onClick={() => deleteContact(contact.id)}
                            title="Delete"
                          >
                            <Trash2 size={14} /> <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* Details Modal */}
        {modalOpen && selectedContact && (
          <div className="ac-modal" onClick={() => setModalOpen(false)}>
            <div className="ac-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="ac-modal-header">
                <h3>Request Details</h3>
                <button className="ac-modal-close" onClick={() => setModalOpen(false)}>
                  <XCircle size={20} />
                </button>
              </div>
              <div className="ac-modal-body">
                <div className="ac-detail-row">
                  <div className="ac-detail-label">Name</div>
                  <div className="ac-detail-value">{selectedContact.name}</div>
                </div>
                <div className="ac-detail-row">
                  <div className="ac-detail-label">Phone</div>
                  <div className="ac-detail-value">{selectedContact.phone}</div>
                </div>
                {selectedContact.email && (
                  <div className="ac-detail-row">
                    <div className="ac-detail-label">Email</div>
                    <div className="ac-detail-value">{selectedContact.email}</div>
                  </div>
                )}
                {selectedContact.services && selectedContact.services.length > 0 && (
                  <div className="ac-detail-row">
                    <div className="ac-detail-label">Services Interested</div>
                    <div className="ac-detail-value">
                      {selectedContact.services.map((s, i) => (
                        <span key={i} className="ac-service-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedContact.other && (
                  <div className="ac-detail-row">
                    <div className="ac-detail-label">Message</div>
                    <div className="ac-detail-value" style={{ fontStyle: 'italic' }}>"{selectedContact.other}"</div>
                  </div>
                )}
                <div className="ac-detail-row">
                  <div className="ac-detail-label">Submitted On</div>
                  <div className="ac-detail-value">{formatDate(selectedContact.timestamp)}</div>
                </div>
                <div className="ac-detail-row">
                  <div className="ac-detail-label">Status</div>
                  <div className="ac-detail-value">{getStatusBadge(selectedContact.status)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}