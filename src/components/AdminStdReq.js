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
  GraduationCap,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  DollarSign,
  BookOpen,
} from "lucide-react";
import API_BASE_URL from "./ApiConfig";

const adminStdStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Sora:wght@400;600;700;800&display=swap');

  :root {
    --as-bg: #0a0a0a;
    --as-surface: rgba(255, 255, 255, 0.03);
    --as-border: rgba(255, 255, 255, 0.06);
    --as-accent: #3b82f6;
    --as-accent-dim: rgba(59, 130, 246, 0.12);
    --as-text: #ffffff;
    --as-text-secondary: #a1a1aa;
    --as-muted: rgba(255, 255, 255, 0.5);
    --as-success: #4ade80;
    --as-warning: #fbbf24;
    --as-danger: #f87171;
    --as-web: #3b82f6;
    --as-android: #22c55e;
  }

  .as * { box-sizing: border-box; margin: 0; padding: 0; }

  .as {
    background: var(--as-bg);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  /* Header */
  .as-header {
    position: sticky;
    top: 0;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--as-border);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    z-index: 100;
  }

  .as-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .as-back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--as-surface);
    border: 1px solid var(--as-border);
    border-radius: 8px;
    padding: 6px 12px;
    color: var(--as-text-secondary);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .as-back-btn:hover {
    background: var(--as-accent-dim);
    color: var(--as-accent);
    transform: translateX(-2px);
  }

  .as-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .as-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--as-accent), #60a5fa);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
  }

  .as-logo-text {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--as-text);
  }

  .as-logo-text span {
    background: linear-gradient(90deg, var(--as-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .as-refresh-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--as-surface);
    border: 1px solid var(--as-border);
    border-radius: 8px;
    padding: 8px 16px;
    color: var(--as-text-secondary);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .as-refresh-btn:hover {
    background: var(--as-accent-dim);
    color: var(--as-accent);
  }

  /* Main Content */
  .as-main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .as-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .as-stat-card {
    background: var(--as-surface);
    border: 1px solid var(--as-border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .as-stat-info h4 {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--as-text-secondary);
    margin-bottom: 0.25rem;
  }

  .as-stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--as-text);
  }

  .as-stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--as-accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--as-accent);
  }

  /* Filters */
  .as-filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .as-filter-btn {
    background: var(--as-surface);
    border: 1px solid var(--as-border);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.8rem;
    color: var(--as-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .as-filter-btn:hover {
    border-color: var(--as-accent-dim);
    color: var(--as-accent);
  }

  .as-filter-btn.active {
    background: var(--as-accent-dim);
    border-color: var(--as-accent);
    color: var(--as-accent);
  }

  /* Table */
  .as-table-container {
    background: var(--as-surface);
    border: 1px solid var(--as-border);
    border-radius: 16px;
    overflow-x: auto;
  }

  .as-table {
    width: 100%;
    border-collapse: collapse;
  }

  .as-table th {
    text-align: left;
    padding: 1rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--as-text-secondary);
    border-bottom: 1px solid var(--as-border);
  }

  .as-table td {
    padding: 1rem 1rem;
    font-size: 0.85rem;
    color: var(--as-text);
    border-bottom: 1px solid var(--as-border);
  }

  .as-table tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .as-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: 20px;
    font-weight: 500;
  }

  .as-status-badge.pending {
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
  }

  .as-status-badge.contacted {
    background: rgba(59, 130, 246, 0.12);
    color: #3b82f6;
  }

  .as-status-badge.enrolled {
    background: rgba(74, 222, 128, 0.12);
    color: #4ade80;
  }

  .as-status-badge.completed {
    background: rgba(74, 222, 128, 0.12);
    color: #4ade80;
  }

  .as-course-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 500;
  }

  .as-course-badge.web {
    background: rgba(59, 130, 246, 0.12);
    color: #3b82f6;
  }

  .as-course-badge.android {
    background: rgba(34, 197, 94, 0.12);
    color: #22c55e;
  }

  .as-action-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .as-action-btn {
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

  .as-action-btn.view {
    color: var(--as-accent);
  }

  .as-action-btn.view:hover {
    background: var(--as-accent-dim);
  }

  .as-action-btn.contact {
    color: var(--as-accent);
  }

  .as-action-btn.contact:hover {
    background: rgba(59, 130, 246, 0.1);
  }

  .as-action-btn.enroll {
    color: var(--as-success);
  }

  .as-action-btn.enroll:hover {
    background: rgba(74, 222, 128, 0.1);
  }

  .as-action-btn.delete {
    color: var(--as-danger);
  }

  .as-action-btn.delete:hover {
    background: rgba(248, 113, 113, 0.1);
  }

  /* Modal */
  .as-modal {
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

  .as-modal-content {
    background: var(--as-bg);
    border: 1px solid var(--as-border);
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .as-modal-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--as-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .as-modal-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--as-text);
  }

  .as-modal-close {
    background: transparent;
    border: none;
    color: var(--as-text-secondary);
    cursor: pointer;
    padding: 4px;
  }

  .as-modal-body {
    padding: 1.5rem;
  }

  .as-detail-row {
    margin-bottom: 1rem;
  }

  .as-detail-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--as-text-secondary);
    margin-bottom: 0.25rem;
  }

  .as-detail-value {
    font-size: 0.9rem;
    color: var(--as-text);
    word-break: break-word;
  }

  .as-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--as-success);
  }

  .as-loading {
    text-align: center;
    padding: 3rem;
    color: var(--as-text-secondary);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .as-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid var(--as-border);
    border-top-color: var(--as-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }

  @media (max-width: 768px) {
    .as-header { padding: 0 1rem; }
    .as-main { padding: 1rem; }
    .as-table th, .as-table td { padding: 0.75rem; }
    .as-action-btn span { display: none; }
  }
`;

export default function AdminStdReq() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem("adminLoggedIn");
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }
    fetchEnrollments();
  }, [navigate]);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/student/enrollments`);
      const data = await response.json();

      if (data.success) {
        setEnrollments(data.data || []);
      } else {
        console.error("Failed to fetch enrollments:", data.message);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/student/enrollment/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await response.json();
      if (data.success) {
        fetchEnrollments(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteEnrollment = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this enrollment request?",
      )
    )
      return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/student/enrollment/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();
      if (data.success) {
        fetchEnrollments(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting enrollment:", error);
    }
  };

  const viewDetails = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "Pending", icon: <Clock size={10} /> },
      contacted: { label: "Contacted", icon: <CheckCircle size={10} /> },
      enrolled: { label: "Enrolled", icon: <CheckCircle size={10} /> },
      completed: { label: "Completed", icon: <CheckCircle size={10} /> },
    };
    const s = statusMap[status] || statusMap.pending;
    return (
      <span className={`as-status-badge ${status || "pending"}`}>
        {s.icon} {s.label}
      </span>
    );
  };

  const getCourseBadge = (course) => {
    const courseMap = {
      web: { label: "Web Development", icon: <GlobeIcon size={10} /> },
      android: {
        label: "Android Development",
        icon: <SmartphoneIcon size={10} />,
      },
    };
    const c = courseMap[course] || courseMap.web;
    return (
      <span className={`as-course-badge ${course}`}>
        {c.icon} {c.label}
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

  const getFilteredEnrollments = () => {
    if (filter === "all") return enrollments;
    return enrollments.filter((enrollment) => enrollment.status === filter);
  };

  const getStats = () => {
    const total = enrollments.length;
    const pending = enrollments.filter((e) => e.status === "pending").length;
    const contacted = enrollments.filter(
      (e) => e.status === "contacted",
    ).length;
    const enrolled = enrollments.filter(
      (e) => e.status === "enrolled" || e.status === "completed",
    ).length;
    return { total, pending, contacted, enrolled };
  };

  const stats = getStats();
  const filteredEnrollments = getFilteredEnrollments();

  // Simple icon components
  function GlobeIcon({ size = 12 }) {
    return <span style={{ fontSize: size }}>🌐</span>;
  }

  function SmartphoneIcon({ size = 12 }) {
    return <span style={{ fontSize: size }}>📱</span>;
  }

  return (
    <>
      <style>{adminStdStyles}</style>

      <div className="as">
        {/* Header */}
        <header className="as-header">
          <div className="as-header-left">
            <button
              className="as-back-btn"
              onClick={() => navigate("/admindashboard")}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="as-logo">
              <div className="as-logo-icon">S</div>
              <div className="as-logo-text">
                Student <span>Enrollments</span>
              </div>
            </div>
          </div>
          <button className="as-refresh-btn" onClick={fetchEnrollments}>
            <RefreshCw size={16} /> Refresh
          </button>
        </header>

        {/* Main Content */}
        <main className="as-main">
          {/* Stats Cards */}
          <div className="as-stats">
            <div className="as-stat-card">
              <div className="as-stat-info">
                <h4>Total Enrollments</h4>
                <div className="as-stat-number">{stats.total}</div>
              </div>
              <div className="as-stat-icon">
                <GraduationCap size={20} />
              </div>
            </div>
            <div className="as-stat-card">
              <div className="as-stat-info">
                <h4>Pending</h4>
                <div className="as-stat-number" style={{ color: "#fbbf24" }}>
                  {stats.pending}
                </div>
              </div>
              <div
                className="as-stat-icon"
                style={{
                  background: "rgba(251,191,36,0.12)",
                  color: "#fbbf24",
                }}
              >
                <Clock size={20} />
              </div>
            </div>
            <div className="as-stat-card">
              <div className="as-stat-info">
                <h4>Contacted</h4>
                <div className="as-stat-number" style={{ color: "#3b82f6" }}>
                  {stats.contacted}
                </div>
              </div>
              <div
                className="as-stat-icon"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  color: "#3b82f6",
                }}
              >
                <Phone size={20} />
              </div>
            </div>
            <div className="as-stat-card">
              <div className="as-stat-info">
                <h4>Enrolled/Completed</h4>
                <div className="as-stat-number" style={{ color: "#4ade80" }}>
                  {stats.enrolled}
                </div>
              </div>
              <div
                className="as-stat-icon"
                style={{
                  background: "rgba(74,222,128,0.12)",
                  color: "#4ade80",
                }}
              >
                <CheckCircle size={20} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="as-filters">
            <button
              className={`as-filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({stats.total})
            </button>
            <button
              className={`as-filter-btn ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              Pending ({stats.pending})
            </button>
            <button
              className={`as-filter-btn ${filter === "contacted" ? "active" : ""}`}
              onClick={() => setFilter("contacted")}
            >
              Contacted ({stats.contacted})
            </button>
            <button
              className={`as-filter-btn ${filter === "enrolled" ? "active" : ""}`}
              onClick={() => setFilter("enrolled")}
            >
              Enrolled/Completed ({stats.enrolled})
            </button>
          </div>

          {/* Table */}
          <div className="as-table-container">
            {loading ? (
              <div className="as-loading">
                <div className="as-spinner" />
                <p>Loading enrollments...</p>
              </div>
            ) : filteredEnrollments.length === 0 ? (
              <div className="as-loading">
                <GraduationCap
                  size={40}
                  style={{ opacity: 0.3, marginBottom: "1rem" }}
                />
                <p>No student enrollments found</p>
              </div>
            ) : (
              <table className="as-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Contact</th>
                    <th>Course</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>
                        <strong>{enrollment.name}</strong>
                      </td>
                      <td>
                        <div>
                          <Phone
                            size={12}
                            style={{ display: "inline", marginRight: "4px" }}
                          />{" "}
                          {enrollment.phone}
                        </div>
                        {enrollment.email && (
                          <div>
                            <Mail
                              size={12}
                              style={{ display: "inline", marginRight: "4px" }}
                            />{" "}
                            {enrollment.email}
                          </div>
                        )}
                      </td>
                      <td>{getCourseBadge(enrollment.course)}</td>
                      <td>
                        <span style={{ color: "#4ade80", fontWeight: 600 }}>
                          ₹{enrollment.coursePrice}
                        </span>
                      </td>
                      <td>{formatDate(enrollment.timestamp)}</td>
                      <td>{getStatusBadge(enrollment.status)}</td>
                      <td>
                        <div className="as-action-btns">
                          <button
                            className="as-action-btn view"
                            onClick={() => viewDetails(enrollment)}
                            title="View Details"
                          >
                            <Eye size={14} /> <span>View</span>
                          </button>
                          {enrollment.status === "pending" && (
                            <button
                              className="as-action-btn contact"
                              onClick={() =>
                                updateStatus(enrollment.id, "contacted")
                              }
                              title="Mark Contacted"
                            >
                              <Phone size={14} /> <span>Contact</span>
                            </button>
                          )}
                          {enrollment.status === "contacted" && (
                            <button
                              className="as-action-btn enroll"
                              onClick={() =>
                                updateStatus(enrollment.id, "enrolled")
                              }
                              title="Mark Enrolled"
                            >
                              <CheckCircle size={14} /> <span>Enroll</span>
                            </button>
                          )}
                          <button
                            className="as-action-btn delete"
                            onClick={() => deleteEnrollment(enrollment.id)}
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
        {modalOpen && selectedEnrollment && (
          <div className="as-modal" onClick={() => setModalOpen(false)}>
            <div
              className="as-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="as-modal-header">
                <h3>Enrollment Details</h3>
                <button
                  className="as-modal-close"
                  onClick={() => setModalOpen(false)}
                >
                  <XCircle size={20} />
                </button>
              </div>
              <div className="as-modal-body">
                <div className="as-detail-row">
                  <div className="as-detail-label">Student Name</div>
                  <div className="as-detail-value">
                    {selectedEnrollment.name}
                  </div>
                </div>
                <div className="as-detail-row">
                  <div className="as-detail-label">Phone Number</div>
                  <div className="as-detail-value">
                    {selectedEnrollment.phone}
                  </div>
                </div>
                {selectedEnrollment.email && (
                  <div className="as-detail-row">
                    <div className="as-detail-label">Email</div>
                    <div className="as-detail-value">
                      {selectedEnrollment.email}
                    </div>
                  </div>
                )}
                <div className="as-detail-row">
                  <div className="as-detail-label">Selected Course</div>
                  <div className="as-detail-value">
                    <strong>{selectedEnrollment.courseName}</strong>
                  </div>
                </div>
                <div className="as-detail-row">
                  <div className="as-detail-label">Course Duration</div>
                  <div className="as-detail-value">
                    {selectedEnrollment.courseDuration}
                  </div>
                </div>
                <div className="as-detail-row">
                  <div className="as-detail-label">Course Fee</div>
                  <div className="as-detail-value as-price">
                    ₹{selectedEnrollment.coursePrice}
                  </div>
                </div>
                <div className="as-detail-row">
                  <div className="as-detail-label">Enrollment Date</div>
                  <div className="as-detail-value">
                    {formatDate(selectedEnrollment.timestamp)}
                  </div>
                </div>
                <div className="as-detail-row">
                  <div className="as-detail-label">Status</div>
                  <div className="as-detail-value">
                    {getStatusBadge(selectedEnrollment.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
