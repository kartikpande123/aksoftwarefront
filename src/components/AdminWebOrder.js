import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Mail,
  Phone,
  Clock,
  User,
  RefreshCw,
  Filter,
  DollarSign,
  MessageSquare,
  Send,
  AlertCircle,
  Tag,
  Globe,
  Smartphone,
  Settings,
  TrendingUp,
} from "lucide-react";
import API_BASE_URL from "./ApiConfig";

const adminQuoteStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --aq-bg: #0a0a0a;
    --aq-surface: rgba(255, 255, 255, 0.03);
    --aq-border: rgba(255, 255, 255, 0.06);
    --aq-accent: #3b82f6;
    --aq-accent-dim: rgba(59, 130, 246, 0.12);
    --aq-text: #ffffff;
    --aq-text-secondary: #a1a1aa;
    --aq-muted: rgba(255, 255, 255, 0.5);
    --aq-success: #4ade80;
    --aq-warning: #fbbf24;
    --aq-danger: #f87171;
    --aq-info: #8b5cf6;
    --aq-website: #3b82f6;
    --aq-android: #22c55e;
    --aq-custom: #8b5cf6;
  }

  .aq * { box-sizing: border-box; margin: 0; padding: 0; }

  .aq {
    background: var(--aq-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  /* Header */
  .aq-header {
    position: sticky;
    top: 0;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--aq-border);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    z-index: 100;
  }

  .aq-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .aq-back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--aq-surface);
    border: 1px solid var(--aq-border);
    border-radius: 8px;
    padding: 6px 12px;
    color: var(--aq-text-secondary);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .aq-back-btn:hover {
    background: var(--aq-accent-dim);
    color: var(--aq-accent);
    transform: translateX(-2px);
  }

  .aq-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .aq-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--aq-accent), #60a5fa);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
  }

  .aq-logo-text {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--aq-text);
  }

  .aq-logo-text span {
    background: linear-gradient(90deg, var(--aq-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .aq-refresh-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--aq-surface);
    border: 1px solid var(--aq-border);
    border-radius: 8px;
    padding: 8px 16px;
    color: var(--aq-text-secondary);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .aq-refresh-btn:hover {
    background: var(--aq-accent-dim);
    color: var(--aq-accent);
  }

  /* Main Content */
  .aq-main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .aq-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .aq-stat-card {
    background: var(--aq-surface);
    border: 1px solid var(--aq-border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .aq-stat-info h4 {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--aq-text-secondary);
    margin-bottom: 0.25rem;
  }

  .aq-stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--aq-text);
  }

  .aq-stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--aq-accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--aq-accent);
  }

  /* Filters */
  .aq-filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .aq-filter-btn {
    background: var(--aq-surface);
    border: 1px solid var(--aq-border);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.8rem;
    color: var(--aq-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .aq-filter-btn:hover {
    border-color: var(--aq-accent-dim);
    color: var(--aq-accent);
  }

  .aq-filter-btn.active {
    background: var(--aq-accent-dim);
    border-color: var(--aq-accent);
    color: var(--aq-accent);
  }

  /* Plan Type Filters */
  .aq-type-filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    border-top: 1px solid var(--aq-border);
    padding-top: 1.5rem;
  }

  .aq-type-btn {
    background: var(--aq-surface);
    border: 1px solid var(--aq-border);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.8rem;
    color: var(--aq-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .aq-type-btn:hover {
    border-color: var(--aq-accent-dim);
    color: var(--aq-accent);
  }

  .aq-type-btn.active {
    background: var(--aq-accent-dim);
    border-color: var(--aq-accent);
    color: var(--aq-accent);
  }

  /* Table */
  .aq-table-container {
    background: var(--aq-surface);
    border: 1px solid var(--aq-border);
    border-radius: 16px;
    overflow-x: auto;
  }

  .aq-table {
    width: 100%;
    border-collapse: collapse;
  }

  .aq-table th {
    text-align: left;
    padding: 1rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--aq-text-secondary);
    border-bottom: 1px solid var(--aq-border);
  }

  .aq-table td {
    padding: 1rem 1rem;
    font-size: 0.85rem;
    color: var(--aq-text);
    border-bottom: 1px solid var(--aq-border);
  }

  .aq-table tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  /* Status Badges */
  .aq-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: 20px;
    font-weight: 500;
  }

  .aq-status-badge.pending {
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
  }

  .aq-status-badge.contacted {
    background: rgba(59, 130, 246, 0.12);
    color: #3b82f6;
  }

  .aq-status-badge.quoted {
    background: rgba(139, 92, 246, 0.12);
    color: #8b5cf6;
  }

  .aq-status-badge.completed {
    background: rgba(74, 222, 128, 0.12);
    color: #4ade80;
  }

  .aq-status-badge.rejected {
    background: rgba(248, 113, 113, 0.12);
    color: #f87171;
  }

  /* Priority Badges */
  .aq-priority-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.65rem;
    padding: 2px 8px;
    border-radius: 20px;
    font-weight: 500;
  }

  .aq-priority-badge.normal {
    background: rgba(161, 161, 170, 0.12);
    color: #a1a1aa;
  }

  .aq-priority-badge.high {
    background: rgba(59, 130, 246, 0.12);
    color: #3b82f6;
  }

  .aq-priority-badge.urgent {
    background: rgba(248, 113, 113, 0.12);
    color: #f87171;
  }

  /* Plan Type Badges */
  .aq-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 500;
  }

  .aq-type-badge.website {
    background: rgba(59, 130, 246, 0.12);
    color: #3b82f6;
  }

  .aq-type-badge.android {
    background: rgba(34, 197, 94, 0.12);
    color: #22c55e;
  }

  .aq-type-badge.custom {
    background: rgba(139, 92, 246, 0.12);
    color: #8b5cf6;
  }

  /* Action Buttons */
  .aq-action-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .aq-action-btn {
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

  .aq-action-btn.view {
    color: var(--aq-accent);
  }

  .aq-action-btn.view:hover {
    background: var(--aq-accent-dim);
  }

  .aq-action-btn.contact {
    color: var(--aq-accent);
  }

  .aq-action-btn.contact:hover {
    background: rgba(59, 130, 246, 0.1);
  }

  .aq-action-btn.quote {
    color: var(--aq-info);
  }

  .aq-action-btn.quote:hover {
    background: rgba(139, 92, 246, 0.1);
  }

  .aq-action-btn.complete {
    color: var(--aq-success);
  }

  .aq-action-btn.complete:hover {
    background: rgba(74, 222, 128, 0.1);
  }

  .aq-action-btn.reject {
    color: var(--aq-danger);
  }

  .aq-action-btn.reject:hover {
    background: rgba(248, 113, 113, 0.1);
  }

  .aq-action-btn.delete {
    color: var(--aq-danger);
  }

  .aq-action-btn.delete:hover {
    background: rgba(248, 113, 113, 0.1);
  }

  /* Modal */
  .aq-modal {
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

  .aq-modal-content {
    background: var(--aq-bg);
    border: 1px solid var(--aq-border);
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    max-height: 85vh;
    overflow-y: auto;
  }

  .aq-modal-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--aq-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .aq-modal-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--aq-text);
  }

  .aq-modal-close {
    background: transparent;
    border: none;
    color: var(--aq-text-secondary);
    cursor: pointer;
    padding: 4px;
  }

  .aq-modal-body {
    padding: 1.5rem;
  }

  .aq-detail-row {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--aq-border);
  }

  .aq-detail-row:last-child {
    border-bottom: none;
  }

  .aq-detail-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--aq-text-secondary);
    margin-bottom: 0.25rem;
  }

  .aq-detail-value {
    font-size: 0.9rem;
    color: var(--aq-text);
    word-break: break-word;
  }

  .aq-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--aq-success);
  }

  /* Quote Form */
  .aq-quote-form {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--aq-border);
  }

  .aq-quote-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--aq-border);
    border-radius: 10px;
    padding: 10px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: var(--aq-text);
    outline: none;
    margin-bottom: 0.75rem;
  }

  .aq-quote-input:focus {
    border-color: var(--aq-accent);
    background: rgba(59, 130, 246, 0.04);
  }

  .aq-quote-textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--aq-border);
    border-radius: 10px;
    padding: 10px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: var(--aq-text);
    outline: none;
    resize: vertical;
    min-height: 80px;
    margin-bottom: 0.75rem;
  }

  .aq-quote-btn {
    background: var(--aq-info);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
  }

  .aq-quote-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  .aq-loading {
    text-align: center;
    padding: 3rem;
    color: var(--aq-text-secondary);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .aq-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid var(--aq-border);
    border-top-color: var(--aq-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }

  @media (max-width: 768px) {
    .aq-header { padding: 0 1rem; }
    .aq-main { padding: 1rem; }
    .aq-table th, .aq-table td { padding: 0.75rem; }
    .aq-action-btn span { display: none; }
  }
`;

export default function AdminWebOrder() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn");
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }
    fetchQuotes();
  }, [navigate]);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/quotes`);
      const data = await response.json();

      if (data.success) {
        setQuotes(data.data || []);
      } else {
        console.error("Failed to fetch quotes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/quote/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        fetchQuotes();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const updatePriority = async (id, priority) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/quote/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority }),
      });

      const data = await response.json();
      if (data.success) {
        fetchQuotes();
      }
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const sendQuote = async (id) => {
    if (!quoteAmount && !quoteNotes) {
      alert("Please enter a quote amount or notes");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/quote/${id}/send-quote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteAmount: quoteAmount ? parseFloat(quoteAmount) : null,
          notes: quoteNotes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchQuotes();
        setQuoteModalOpen(false);
        setQuoteAmount("");
        setQuoteNotes("");
      }
    } catch (error) {
      console.error("Error sending quote:", error);
    }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quote request?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/quote/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        fetchQuotes();
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  const viewDetails = (quote) => {
    setSelectedQuote(quote);
    setModalOpen(true);
  };

  const openQuoteModal = (quote) => {
    setSelectedQuote(quote);
    setQuoteAmount(quote.quoteAmount || "");
    setQuoteNotes(quote.notes || "");
    setQuoteModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "Pending", icon: <Clock size={10} /> },
      contacted: { label: "Contacted", icon: <Phone size={10} /> },
      quoted: { label: "Quoted", icon: <DollarSign size={10} /> },
      completed: { label: "Completed", icon: <CheckCircle size={10} /> },
      rejected: { label: "Rejected", icon: <XCircle size={10} /> },
    };
    const s = statusMap[status] || statusMap.pending;
    return (
      <span className={`aq-status-badge ${status || "pending"}`}>
        {s.icon} {s.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      normal: { label: "Normal", icon: <AlertCircle size={10} /> },
      high: { label: "High", icon: <TrendingUp size={10} /> },
      urgent: { label: "Urgent", icon: <AlertCircle size={10} /> },
    };
    const p = priorityMap[priority] || priorityMap.normal;
    return (
      <span className={`aq-priority-badge ${priority || "normal"}`}>
        {p.icon} {p.label}
      </span>
    );
  };

  const getPlanTypeBadge = (type) => {
    const typeMap = {
      website: { label: "Website", icon: <Globe size={10} /> },
      android: { label: "Android App", icon: <Smartphone size={10} /> },
      custom: { label: "Custom", icon: <Settings size={10} /> },
    };
    const t = typeMap[type] || typeMap.custom;
    return (
      <span className={`aq-type-badge ${type || "custom"}`}>
        {t.icon} {t.label}
      </span>
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFilteredQuotes = () => {
    let filtered = quotes;
    
    if (statusFilter !== "all") {
      filtered = filtered.filter((quote) => quote.status === statusFilter);
    }
    
    if (typeFilter !== "all") {
      filtered = filtered.filter((quote) => quote.planType === typeFilter);
    }
    
    return filtered;
  };

  const getStats = () => {
    const total = quotes.length;
    const pending = quotes.filter((q) => q.status === "pending").length;
    const contacted = quotes.filter((q) => q.status === "contacted").length;
    const quoted = quotes.filter((q) => q.status === "quoted").length;
    const completed = quotes.filter((q) => q.status === "completed").length;
    const rejected = quotes.filter((q) => q.status === "rejected").length;
    
    const totalQuoteValue = quotes
      .filter((q) => q.quoteAmount)
      .reduce((sum, q) => sum + (q.quoteAmount || 0), 0);
    
    return { total, pending, contacted, quoted, completed, rejected, totalQuoteValue };
  };

  const stats = getStats();
  const filteredQuotes = getFilteredQuotes();

  return (
    <>
      <style>{adminQuoteStyles}</style>

      <div className="aq">
        {/* Header */}
        <header className="aq-header">
          <div className="aq-header-left">
            <button
              className="aq-back-btn"
              onClick={() => navigate("/admindashboard")}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="aq-logo">
              <div className="aq-logo-icon">Q</div>
              <div className="aq-logo-text">
                Quote <span>Requests</span>
              </div>
            </div>
          </div>
          <button className="aq-refresh-btn" onClick={fetchQuotes}>
            <RefreshCw size={16} /> Refresh
          </button>
        </header>

        {/* Main Content */}
        <main className="aq-main">
          {/* Stats Cards */}
          <div className="aq-stats">
            <div className="aq-stat-card">
              <div className="aq-stat-info">
                <h4>Total Requests</h4>
                <div className="aq-stat-number">{stats.total}</div>
              </div>
              <div className="aq-stat-icon">
                <MessageSquare size={20} />
              </div>
            </div>
            <div className="aq-stat-card">
              <div className="aq-stat-info">
                <h4>Pending</h4>
                <div className="aq-stat-number" style={{ color: "#fbbf24" }}>
                  {stats.pending}
                </div>
              </div>
              <div
                className="aq-stat-icon"
                style={{
                  background: "rgba(251,191,36,0.12)",
                  color: "#fbbf24",
                }}
              >
                <Clock size={20} />
              </div>
            </div>
            <div className="aq-stat-card">
              <div className="aq-stat-info">
                <h4>Quoted</h4>
                <div className="aq-stat-number" style={{ color: "#8b5cf6" }}>
                  {stats.quoted}
                </div>
              </div>
              <div
                className="aq-stat-icon"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  color: "#8b5cf6",
                }}
              >
                <DollarSign size={20} />
              </div>
            </div>
            <div className="aq-stat-card">
              <div className="aq-stat-info">
                <h4>Completed</h4>
                <div className="aq-stat-number" style={{ color: "#4ade80" }}>
                  {stats.completed}
                </div>
              </div>
              <div
                className="aq-stat-icon"
                style={{
                  background: "rgba(74,222,128,0.12)",
                  color: "#4ade80",
                }}
              >
                <CheckCircle size={20} />
              </div>
            </div>
          </div>

          {/* Status Filters */}
          <div className="aq-filters">
            <button
              className={`aq-filter-btn ${statusFilter === "all" ? "active" : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              All ({stats.total})
            </button>
            <button
              className={`aq-filter-btn ${statusFilter === "pending" ? "active" : ""}`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending ({stats.pending})
            </button>
            <button
              className={`aq-filter-btn ${statusFilter === "contacted" ? "active" : ""}`}
              onClick={() => setStatusFilter("contacted")}
            >
              Contacted ({stats.contacted})
            </button>
            <button
              className={`aq-filter-btn ${statusFilter === "quoted" ? "active" : ""}`}
              onClick={() => setStatusFilter("quoted")}
            >
              Quoted ({stats.quoted})
            </button>
            <button
              className={`aq-filter-btn ${statusFilter === "completed" ? "active" : ""}`}
              onClick={() => setStatusFilter("completed")}
            >
              Completed ({stats.completed})
            </button>
            <button
              className={`aq-filter-btn ${statusFilter === "rejected" ? "active" : ""}`}
              onClick={() => setStatusFilter("rejected")}
            >
              Rejected ({stats.rejected})
            </button>
          </div>

          {/* Plan Type Filters */}
          <div className="aq-type-filters">
            <button
              className={`aq-type-btn ${typeFilter === "all" ? "active" : ""}`}
              onClick={() => setTypeFilter("all")}
            >
              <Globe size={12} /> All Types
            </button>
            <button
              className={`aq-type-btn ${typeFilter === "website" ? "active" : ""}`}
              onClick={() => setTypeFilter("website")}
            >
              <Globe size={12} /> Website
            </button>
            <button
              className={`aq-type-btn ${typeFilter === "android" ? "active" : ""}`}
              onClick={() => setTypeFilter("android")}
            >
              <Smartphone size={12} /> Android App
            </button>
            <button
              className={`aq-type-btn ${typeFilter === "custom" ? "active" : ""}`}
              onClick={() => setTypeFilter("custom")}
            >
              <Settings size={12} /> Custom
            </button>
          </div>

          {/* Table */}
          <div className="aq-table-container">
            {loading ? (
              <div className="aq-loading">
                <div className="aq-spinner" />
                <p>Loading quote requests...</p>
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="aq-loading">
                <MessageSquare
                  size={40}
                  style={{ opacity: 0.3, marginBottom: "1rem" }}
                />
                <p>No quote requests found</p>
              </div>
            ) : (
              <table className="aq-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Plan Type</th>
                    <th>Selected Plan</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id}>
                      <td>
                        <strong>{quote.name}</strong>
                      </td>
                      <td>
                        <div>
                          <Phone size={12} style={{ display: "inline", marginRight: "4px" }} />
                          {quote.phone}
                        </div>
                        {quote.email && (
                          <div style={{ fontSize: "0.75rem", color: "var(--aq-text-secondary)" }}>
                            {quote.email}
                          </div>
                        )}
                      </td>
                      <td>{getPlanTypeBadge(quote.planType)}</td>
                      <td>
                        <div style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          {quote.planName || "Custom Plan"}
                        </div>
                      </td>
                      <td>
                        <span style={{ color: "#4ade80", fontWeight: 600 }}>
                          {quote.planPrice || "Custom"}
                        </span>
                        {quote.quoteAmount && (
                          <div style={{ fontSize: "0.7rem", color: "#8b5cf6" }}>
                            Quote: ₹{quote.quoteAmount}
                          </div>
                        )}
                      </td>
                      <td>{getStatusBadge(quote.status)}</td>
                      <td>{getPriorityBadge(quote.priority)}</td>
                      <td style={{ fontSize: "0.75rem" }}>
                        {formatDate(quote.timestamp)}
                      </td>
                      <td>
                        <div className="aq-action-btns">
                          <button
                            className="aq-action-btn view"
                            onClick={() => viewDetails(quote)}
                            title="View Details"
                          >
                            <Eye size={14} /> <span>View</span>
                          </button>
                          {quote.status === "pending" && (
                            <button
                              className="aq-action-btn contact"
                              onClick={() => updateStatus(quote.id, "contacted")}
                              title="Mark Contacted"
                            >
                              <Phone size={14} /> <span>Contact</span>
                            </button>
                          )}
                          {(quote.status === "pending" || quote.status === "contacted") && (
                            <button
                              className="aq-action-btn quote"
                              onClick={() => openQuoteModal(quote)}
                              title="Send Quote"
                            >
                              <Send size={14} /> <span>Quote</span>
                            </button>
                          )}
                          {quote.status === "quoted" && (
                            <button
                              className="aq-action-btn complete"
                              onClick={() => updateStatus(quote.id, "completed")}
                              title="Mark Completed"
                            >
                              <CheckCircle size={14} /> <span>Complete</span>
                            </button>
                          )}
                          {quote.status !== "completed" && quote.status !== "rejected" && (
                            <button
                              className="aq-action-btn reject"
                              onClick={() => updateStatus(quote.id, "rejected")}
                              title="Reject"
                            >
                              <XCircle size={14} /> <span>Reject</span>
                            </button>
                          )}
                          <button
                            className="aq-action-btn delete"
                            onClick={() => deleteQuote(quote.id)}
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
        {modalOpen && selectedQuote && (
          <div className="aq-modal" onClick={() => setModalOpen(false)}>
            <div
              className="aq-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aq-modal-header">
                <h3>Quote Request Details</h3>
                <button
                  className="aq-modal-close"
                  onClick={() => setModalOpen(false)}
                >
                  <XCircle size={20} />
                </button>
              </div>
              <div className="aq-modal-body">
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Customer Name</div>
                  <div className="aq-detail-value">{selectedQuote.name}</div>
                </div>
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Phone Number</div>
                  <div className="aq-detail-value">{selectedQuote.phone}</div>
                </div>
                {selectedQuote.email && (
                  <div className="aq-detail-row">
                    <div className="aq-detail-label">Email</div>
                    <div className="aq-detail-value">{selectedQuote.email}</div>
                  </div>
                )}
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Selected Plan</div>
                  <div className="aq-detail-value">
                    <strong>{selectedQuote.planName || "Custom Plan"}</strong>
                  </div>
                </div>
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Plan Type</div>
                  <div className="aq-detail-value">
                    {getPlanTypeBadge(selectedQuote.planType)}
                  </div>
                </div>
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Plan Price</div>
                  <div className="aq-detail-value aq-price">
                    {selectedQuote.planPrice || "Custom Pricing"}
                  </div>
                </div>
                {selectedQuote.quoteAmount && (
                  <div className="aq-detail-row">
                    <div className="aq-detail-label">Quoted Amount</div>
                    <div className="aq-detail-value" style={{ color: "#8b5cf6", fontWeight: 700 }}>
                      ₹{selectedQuote.quoteAmount}
                    </div>
                  </div>
                )}
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Status</div>
                  <div className="aq-detail-value">
                    {getStatusBadge(selectedQuote.status)}
                  </div>
                </div>
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Priority</div>
                  <div className="aq-detail-value">
                    {getPriorityBadge(selectedQuote.priority)}
                  </div>
                </div>
                {selectedQuote.specialQuote && (
                  <div className="aq-detail-row">
                    <div className="aq-detail-label">Special Requirements</div>
                    <div className="aq-detail-value">
                      {selectedQuote.specialQuote}
                    </div>
                  </div>
                )}
                {selectedQuote.notes && (
                  <div className="aq-detail-row">
                    <div className="aq-detail-label">Admin Notes</div>
                    <div className="aq-detail-value">
                      {selectedQuote.notes}
                    </div>
                  </div>
                )}
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Request Date</div>
                  <div className="aq-detail-value">
                    {formatDate(selectedQuote.timestamp)}
                  </div>
                </div>
                {selectedQuote.quoteSentDate && (
                  <div className="aq-detail-row">
                    <div className="aq-detail-label">Quote Sent Date</div>
                    <div className="aq-detail-value">
                      {formatDate(selectedQuote.quoteSentDate)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Send Quote Modal */}
        {quoteModalOpen && selectedQuote && (
          <div className="aq-modal" onClick={() => setQuoteModalOpen(false)}>
            <div
              className="aq-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aq-modal-header">
                <h3>Send Quote to {selectedQuote.name}</h3>
                <button
                  className="aq-modal-close"
                  onClick={() => setQuoteModalOpen(false)}
                >
                  <XCircle size={20} />
                </button>
              </div>
              <div className="aq-modal-body">
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Selected Plan</div>
                  <div className="aq-detail-value">
                    <strong>{selectedQuote.planName || "Custom Plan"}</strong>
                  </div>
                </div>
                <div className="aq-detail-row">
                  <div className="aq-detail-label">Original Price</div>
                  <div className="aq-detail-value">
                    {selectedQuote.planPrice || "Custom Pricing"}
                  </div>
                </div>
                
                <div className="aq-quote-form">
                  <label className="aq-detail-label">Quote Amount (₹)</label>
                  <input
                    type="number"
                    className="aq-quote-input"
                    placeholder="Enter quoted amount"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                  />
                  
                  <label className="aq-detail-label">Notes / Message</label>
                  <textarea
                    className="aq-quote-textarea"
                    placeholder="Add any notes or special instructions for the customer..."
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                  />
                  
                  <button
                    className="aq-quote-btn"
                    onClick={() => sendQuote(selectedQuote.id)}
                  >
                    <Send size={16} /> Send Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}