
const API_BASE_URL = 'http://localhost:5205/api'

export async function getRegistrations({
  participantName = '',
  type = '',
  status = '',
  page = 1,
  pageSize = 10,
} = {}) {
  const params = new URLSearchParams({
    participantName,
    type: type === 'All Types' ? '' : type,
    status: status === 'All Statuses' ? '' : status,
    page: String(page),
    pageSize: String(pageSize),
  })

  const response = await fetch(
    `${API_BASE_URL}/registrations?${params.toString()}`,
  )

  if (!response.ok) {
    throw new Error('Failed to load registrations.')
  }

  return response.json()
}

export async function getSummary() {
  const response = await fetch(
    `${API_BASE_URL}/registrations/summary`,
  )

  if (!response.ok) {
    throw new Error('Failed to load dashboard summary.')
  }

  return response.json()
}
