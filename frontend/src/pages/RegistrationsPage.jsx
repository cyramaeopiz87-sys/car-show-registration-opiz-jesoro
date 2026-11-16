
import { useState } from 'react'

function RegistrationsPage() {
  const [search, setSearch] = useState('')

  const stats = [
    { title: 'Total Registrations', value: '125', icon: 'bi-car-front', color: 'primary' },
    { title: 'Total Payments', value: '₱85,000', icon: 'bi-cash-stack', color: 'success' },
    { title: 'Uncollected Payments', value: '₱12,500', icon: 'bi-wallet2', color: 'warning' },
    { title: 'Confirmed', value: '85', icon: 'bi-check-circle', color: 'info' },
    { title: 'Checked In', value: '40', icon: 'bi-person-check', color: 'danger' },
  ]

  const registrations = [
    { id: 1, number: 'REG-2027-001', name: 'Juan Dela Cruz', car: 'Toyota Supra', type: 'Competitor', status: 'Confirmed', payment: 'Paid', fee: '₱2,500' },
    { id: 2, number: 'REG-2027-002', name: 'Maria Santos', car: 'Honda Civic', type: 'Exhibitor', status: 'Pending', payment: 'Unpaid', fee: '₱1,500' },
    { id: 3, number: 'REG-2027-003', name: 'Pedro Reyes', car: 'Mitsubishi Lancer', type: 'VIP', status: 'Checked In', payment: 'Paid', fee: '₱3,500' },
    { id: 4, number: 'REG-2027-004', name: 'Ana Garcia', car: 'Nissan GTR', type: 'Competitor', status: 'Confirmed', payment: 'Paid', fee: '₱2,500' },
    { id: 5, number: 'REG-2027-005', name: 'Mark Villanueva', car: 'Mazda RX-7', type: 'Exhibitor', status: 'Pending', payment: 'Partial', fee: '₱1,500' },
  ]

  const filteredRegistrations = registrations.filter((registration) =>
    registration.name.toLowerCase().includes(search.toLowerCase())
  )

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
          <button className="btn btn-dark">
            <i className="bi bi-download me-2"></i>
            Export Report
          </button>
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
              <p>Manage and monitor car show participants.</p>
            </div>
            <button className="btn btn-primary">
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select className="form-select">
              <option>All Types</option>
              <option>Exhibitor</option>
              <option>Competitor</option>
              <option>VIP</option>
            </select>

            <select className="form-select">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Checked In</option>
              <option>Cancelled</option>
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
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id}>
                    <td>{registration.number}</td>
                    <td><strong>{registration.name}</strong></td>
                    <td>{registration.car}</td>
                    <td>{registration.type}</td>
                    <td>
                      <span className={`status-badge ${registration.status.toLowerCase().replace(' ', '-')}`}>
                        {registration.status}
                      </span>
                    </td>
                    <td>{registration.payment}</td>
                    <td><strong>{registration.fee}</strong></td>
                  </tr>
                ))}

                {filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="dashboard-footer">
          © 2027 AutoVista Events. Car Show Registration System.
        </footer>
      </main>
    </div>
  )
}

export default RegistrationsPage
