import { useEffect, useState } from 'react'

const API_BASE_URL = 'http://localhost:5205/api/registrations'

function RegistrationsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const [registrations, setRegistrations] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState({
    totalRegistrations: 0,
    confirmed: 0,
    checkedIn: 0,
    pending: 0,
    cancelled: 0,
    totalFees: 0,
    totalPayments: 0,
    uncollectedPayments: 0,
  })

  // Modal State
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    participantName: '',
    contactNumber: '',
    email: '',
    address: '',
    carMakeModel: '',
    plateNumber: '',
    registrationType: 'Competitor',
    amountPaid: 0,
  })

  // Fetch KPI Summary
  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/summary`)
      if (res.ok) {
        const data = await res.json()
        setSummary(data)
      }
    } catch (err) {
      console.error('Failed to fetch summary:', err)
    }
  }

  // Fetch Registrations list with filters & pagination
  const fetchRegistrations = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search.trim()) params.append('participantName', search.trim())
      if (typeFilter) params.append('type', typeFilter)
      if (statusFilter) params.append('status', statusFilter)
      params.append('page', page.toString())
      params.append('pageSize', pageSize.toString())

      const res = await fetch(`${API_BASE_URL}?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setRegistrations(data.items || [])
        setTotalCount(data.totalCount || 0)
        setTotalPages(data.totalPages || 1)
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  useEffect(() => {
    fetchRegistrations()
  }, [search, typeFilter, statusFilter, page])

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amountPaid' ? parseFloat(value) || 0 : value,
    }))
  }

  // Handle Submit New Registration
  const handleCreateRegistration = async (e) => {
    e.preventDefault()
    setFormSubmitting(true)
    setFormError(null)

    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const resData = await res.json()

      if (res.ok) {
        setShowModal(false)
        setFormData({
          participantName: '',
          contactNumber: '',
          email: '',
          address: '',
          carMakeModel: '',
          plateNumber: '',
          registrationType: 'Competitor',
          amountPaid: 0,
        })
        fetchSummary()
        fetchRegistrations()
      } else {
        if (resData.errors) {
          const firstKey = Object.keys(resData.errors)[0]
          setFormError(resData.errors[firstKey][0] || 'Validation failed.')
        } else if (resData.detail) {
          setFormError(resData.detail)
        } else {
          setFormError('Failed to create registration.')
        }
      }
    } catch (err) {
      setFormError('Network error connecting to API server.')
    } finally {
      setFormSubmitting(false)
    }
  }

  const stats = [
    {
      title: 'Total Registrations',
      value: summary.totalRegistrations.toString(),
      icon: 'bi-car-front',
      color: 'primary',
    },
    {
      title: 'Total Payments',
      value: `₱${(summary.totalPayments || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      icon: 'bi-cash-stack',
      color: 'success',
    },
    {
      title: 'Uncollected Payments',
      value: `₱${(summary.uncollectedPayments || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      icon: 'bi-wallet2',
      color: 'warning',
    },
    {
      title: 'Confirmed',
      value: summary.confirmed.toString(),
      icon: 'bi-check-circle',
      color: 'info',
    },
    {
      title: 'Checked In',
      value: summary.checkedIn.toString(),
      icon: 'bi-person-check',
      color: 'danger',
    },
  ]

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">AV</div>
          <div>
            <h4>AutoVista</h4>
            <small>EVENTS 2027</small>
          </div>
        </div>

        <div className="sidebar-label">MAIN MENU</div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-link active">
            <i className="bi bi-grid"></i>
            Dashboard
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-car-front"></i>
            Registrations
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-credit-card"></i>
            Payments
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-people"></i>
            Participants
          </a>
        </nav>

        <div className="sidebar-bottom">
          <i className="bi bi-gear"></i> Settings
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h6>AutoVista Events</h6>
            <small>Car Show Registration System</small>
          </div>
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>Event Manager</small>
            </div>
          </div>
        </header>

        <section className="page-heading">
          <div>
            <span className="event-tag">2027 CAR SHOW</span>
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening with your event.</p>
          </div>
          <a
            href="http://localhost:5205/scalar/v1"
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            <i className="bi bi-file-earmark-code me-2"></i>
            Scalar API Docs
          </a>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.title}>
              <div className={`stat-icon ${stat.color}`}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <div>
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          ))}
        </section>

        <section className="registration-section">
          <div className="section-header">
            <div>
              <h4>Recent Registrations</h4>
              <p>Manage and monitor car show participants (showing {registrations.length} of {totalCount}).</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <i className="bi bi-plus-lg me-2"></i>
              Add Registration
            </button>
          </div>

          <div className="filter-bar">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search participant..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
              />
            </div>

            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value)
                setPage(1)
              }}
            >
              <option value="">All Types</option>
              <option value="Exhibitor">Exhibitor (₱1,500)</option>
              <option value="Competitor">Competitor (₱2,500)</option>
              <option value="VIP">VIP (₱5,000)</option>
            </select>

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="CheckedIn">Checked In</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="table-responsive">
            <table className="table registration-table">
              <thead>
                <tr>
                  <th>REGISTRATION</th>
                  <th>PARTICIPANT</th>
                  <th>CAR</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                  <th>PAYMENT</th>
                  <th>FEE</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td><code>{registration.registrationNumber}</code></td>
                    <td>
                      <strong>{registration.participantName}</strong>
                      <br />
                      <small className="text-muted">{registration.contactNumber}</small>
                    </td>
                    <td>
                      {registration.carMakeModel}
                      <br />
                      <small className="text-muted">{registration.plateNumber}</small>
                    </td>
                    <td>{registration.registrationType}</td>
                    <td>
                      <span className={`status-badge ${registration.status.toLowerCase().replace(' ', '-')}`}>
                        {registration.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${registration.paymentStatus === 'Paid' ? 'bg-success' : registration.paymentStatus === 'Partial' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                        {registration.paymentStatus}
                      </span>
                      <br />
                      <small className="text-muted">₱{registration.amountPaid.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</small>
                    </td>
                    <td><strong>₱{registration.registrationFee.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong></td>
                  </tr>
                ))}

                {registrations.length === 0 && !loading && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No registrations found matching the criteria.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      Loading registrations...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3 px-2">
              <small className="text-muted">
                Page {page} of {totalPages}
              </small>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>

        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Car Show Registration</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleCreateRegistration}>
                  <div className="modal-body">
                    {formError && (
                      <div className="alert alert-danger py-2">{formError}</div>
                    )}
                    <div className="mb-2">
                      <label className="form-label small fw-bold">Participant Name</label>
                      <input
                        type="text"
                        name="participantName"
                        className="form-control form-control-sm"
                        required
                        value={formData.participantName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <label className="form-label small fw-bold">Contact Number (09XXXXXXXXX)</label>
                        <input
                          type="text"
                          name="contactNumber"
                          className="form-control form-control-sm"
                          required
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-sm"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="form-label small fw-bold">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control form-control-sm"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <label className="form-label small fw-bold">Car Make & Model</label>
                        <input
                          type="text"
                          name="carMakeModel"
                          className="form-control form-control-sm"
                          placeholder="e.g. Toyota Supra MK4"
                          required
                          value={formData.carMakeModel}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold">Plate Number</label>
                        <input
                          type="text"
                          name="plateNumber"
                          className="form-control form-control-sm"
                          placeholder="e.g. ABC 1234"
                          required
                          value={formData.plateNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <label className="form-label small fw-bold">Registration Type</label>
                        <select
                          name="registrationType"
                          className="form-select form-select-sm"
                          value={formData.registrationType}
                          onChange={handleInputChange}
                        >
                          <option value="Exhibitor">Exhibitor (₱1,500)</option>
                          <option value="Competitor">Competitor (₱2,500)</option>
                          <option value="VIP">VIP (₱5,000)</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold">Amount Paid (₱)</label>
                        <input
                          type="number"
                          name="amountPaid"
                          className="form-control form-control-sm"
                          min="0"
                          step="0.01"
                          value={formData.amountPaid}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm" disabled={formSubmitting}>
                      {formSubmitting ? 'Submitting...' : 'Register Car'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <footer className="dashboard-footer">
          © 2027 AutoVista Events. Car Show Registration System.
        </footer>
      </main>
    </div>
  )
}

export default RegistrationsPage
