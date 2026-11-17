import { useEffect, useState } from 'react'
import { getRegistrations, getSummary } from '../api/sample-data'

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount)

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

function RegistrationsPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')
  const [currentPage, setCurrentPage] = useState(1)

  const [registrations, setRegistrations] = useState([])
  const [summary, setSummary] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [theme, setTheme] = useState(
    () => localStorage.getItem('autovista-theme') || 'light'
  )

  const pageSize = 10

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('autovista-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => current === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    let isActive = true

    async function loadDashboard() {
      try {
        setLoading(true)
        setError('')

        const [registrationData, summaryData] = await Promise.all([
          getRegistrations({
            participantName: debouncedSearch,
            type: selectedType,
            status: selectedStatus,
            page: currentPage,
            pageSize,
          }),
          getSummary(),
        ])

        if (!isActive) return

        setRegistrations(registrationData.items)
        setTotalCount(registrationData.totalCount)
        setTotalPages(registrationData.totalPages)
        setSummary(summaryData)
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load dashboard data.')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      isActive = false
    }
  }, [debouncedSearch, selectedType, selectedStatus, currentPage])

  const stats = summary
    ? [
        {
          title: 'Total Registrations',
          value: summary.totalRegistrations,
          icon: 'bi-car-front',
        },
        {
          title: 'Confirmed',
          value: summary.confirmed,
          icon: 'bi-person-check',
        },
        {
          title: 'Checked In',
          value: summary.checkedIn,
          icon: 'bi-clipboard-check',
        },
        {
          title: 'Total Fees',
          value: formatCurrency(summary.totalFees),
          icon: 'bi-receipt',
        },
        {
          title: 'Uncollected Payments',
          value: formatCurrency(summary.uncollectedPayments),
          icon: 'bi-wallet2',
        },
      ]
    : []

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
    setCurrentPage(1)
  }

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearch('')
    setDebouncedSearch('')
    setSelectedType('All Types')
    setSelectedStatus('All Statuses')
    setCurrentPage(1)
  }

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

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-link active">
            <i className="bi bi-grid"></i>
            Dashboard
          </a>

          <a href="#registrations" className="nav-link">
            <i className="bi bi-car-front"></i>
            Registrations
          </a>
        </nav>
      </aside>

      <main className="main-content" id="dashboard">
        
        {/* FIRST SCREEN CONTAINER (Saktong 100vh para sa Hero at Summary Cards) */}
        <div className="first-screen-container">
          {/* HERO SECTION */}
          <section className="hero-section">
            <img
              className="hero-car-photo"
              src="/autovista-car-hero.jpg"
              alt="Blue sports car"
            />

            <div className="hero-overlay"></div>

            <div className="hero-content">
              <span className="event-tag">2027 CAR SHOW</span>
              <h1>AutoVista Events</h1>
              <p>Manage and monitor car show participants.</p>
            </div>

            <div className="hero-actions">
              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>

              <div className="admin-profile">
                <div className="admin-avatar">A</div>
                <div>
                  <strong>Admin</strong>
                  <small>Administrator</small>
                </div>
              </div>
            </div>
          </section>

          {/* KPI CARDS */}
          <section className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.title}>
                <div className="stat-icon">
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <div>
                  <p>{stat.title}</p>
                  <h3>{stat.value}</h3>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* REGISTRATIONS (Nasa ibaba at makikita lang kapag nag-scroll) */}
        <section className="registration-section" id="registrations">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">EVENT MANAGEMENT</span>
              <h2>Recent Registrations</h2>
              <p>Manage and monitor car show participants.</p>
            </div>

            <button className="btn btn-primary" type="button">
              <i className="bi bi-plus-lg me-2"></i>
              Add Registration
            </button>
          </div>

          <div className="filter-bar">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search participant name..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              className="form-select"
              value={selectedType}
              onChange={handleTypeChange}
              aria-label="Filter by registration type"
            >
              <option>All Types</option>
              <option>Exhibitor</option>
              <option>Competitor</option>
              <option>VIP</option>
            </select>

            <select
              className="form-select"
              value={selectedStatus}
              onChange={handleStatusChange}
              aria-label="Filter by registration status"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Checked In</option>
              <option>Cancelled</option>
            </select>

            <button
              type="button"
              className="btn btn-outline-secondary clear-filters-btn"
              onClick={handleClearFilters}
              title="Clear all filters"
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Clear Filters
            </button>
          </div>

          <div className="table-responsive">
            <table className="table registration-table">
              <thead>
                <tr>
                  <th>REGISTRATION</th>
                  <th>DATE</th>
                  <th>PARTICIPANT / CONTACT</th>
                  <th>CAR / PLATE</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                  <th>AMOUNT PAID</th>
                  <th>PAYMENT</th>
                  <th>REGISTRATION FEE</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></div>
                      Loading registrations...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-danger">
                      <i className="bi bi-exclamation-circle fs-3 d-block mb-2"></i>
                      {error}
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <i className="bi bi-search fs-3 d-block mb-2"></i>
                      <strong>No registrations found</strong>
                      <p className="mb-0">
                        Try changing your search or filter selections.
                      </p>
                    </td>
                  </tr>
                ) : (
                  registrations.map((registration) => (
                    <tr key={registration.id}>
                      <td>{registration.registrationNumber}</td>
                      <td>{formatDate(registration.registrationDate)}</td>
                      <td>
                        <strong>{registration.participantName}</strong>
                        <br />
                        <small>{registration.contactNumber}</small>
                      </td>
                      <td>
                        <strong>{registration.carMakeModel}</strong>
                        <br />
                        <small>{registration.plateNumber}</small>
                      </td>
                      <td>{registration.registrationType}</td>
                      <td>
                        <span
                          className={`status-badge ${registration.status.toLowerCase().replace(' ', '-')}`}
                        >
                          {registration.status}
                        </span>
                      </td>
                      <td>
                        <strong>{formatCurrency(registration.amountPaid)}</strong>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${registration.paymentStatus.toLowerCase()}`}
                        >
                          {registration.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <strong>{formatCurrency(registration.registrationFee)}</strong>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">
            <small className="text-muted">
              Showing {totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              {' '}to {Math.min(currentPage * pageSize, totalCount)}
              {' '}of {totalCount} registrations
            </small>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                <i className="bi bi-chevron-left me-1"></i>
                Previous
              </button>

              <span className="small">
                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
              </span>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage >= totalPages || loading}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next
                <i className="bi bi-chevron-right ms-1"></i>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RegistrationsPage