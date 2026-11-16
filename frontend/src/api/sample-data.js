
const registrations = [
  { id: 1, registrationNumber: 'REG-2027-001', registrationDate: '2027-02-10T08:30:00Z', participantName: 'Juan Dela Cruz', contactNumber: '09171234567', email: 'juan@example.com', address: 'Sorsogon City', carMakeModel: 'Toyota Supra', plateNumber: 'ABC 1234', registrationType: 'Competitor', status: 'Confirmed', registrationFee: 2500, amountPaid: 2500, paymentStatus: 'Paid' },
  { id: 2, registrationNumber: 'REG-2027-002', registrationDate: '2027-02-10T09:00:00Z', participantName: 'Maria Santos', contactNumber: '09182345678', email: 'maria@example.com', address: 'Legazpi City', carMakeModel: 'Honda Civic', plateNumber: 'DEF 2345', registrationType: 'Exhibitor', status: 'Pending', registrationFee: 1500, amountPaid: 0, paymentStatus: 'Unpaid' },
  { id: 3, registrationNumber: 'REG-2027-003', registrationDate: '2027-02-10T09:30:00Z', participantName: 'Pedro Reyes', contactNumber: '09193456789', email: 'pedro@example.com', address: 'Naga City', carMakeModel: 'Mitsubishi Lancer', plateNumber: 'GHI 3456', registrationType: 'VIP', status: 'Checked In', registrationFee: 3500, amountPaid: 3500, paymentStatus: 'Paid' },
  { id: 4, registrationNumber: 'REG-2027-004', registrationDate: '2027-02-10T10:00:00Z', participantName: 'Ana Garcia', contactNumber: '09204567891', email: 'ana@example.com', address: 'Sorsogon City', carMakeModel: 'Nissan GT-R', plateNumber: 'JKL 4567', registrationType: 'Competitor', status: 'Confirmed', registrationFee: 2500, amountPaid: 2500, paymentStatus: 'Paid' },
  { id: 5, registrationNumber: 'REG-2027-005', registrationDate: '2027-02-10T10:30:00Z', participantName: 'Mark Villanueva', contactNumber: '09215678912', email: 'mark@example.com', address: 'Daraga', carMakeModel: 'Mazda RX-7', plateNumber: 'MNO 5678', registrationType: 'Exhibitor', status: 'Pending', registrationFee: 1500, amountPaid: 500, paymentStatus: 'Partial' },
  { id: 6, registrationNumber: 'REG-2027-006', registrationDate: '2027-02-10T11:00:00Z', participantName: 'Carlo Mendoza', contactNumber: '09226789123', email: 'carlo@example.com', address: 'Sorsogon City', carMakeModel: 'Subaru WRX STI', plateNumber: 'PQR 6789', registrationType: 'Competitor', status: 'Confirmed', registrationFee: 2500, amountPaid: 2500, paymentStatus: 'Paid' },
  { id: 7, registrationNumber: 'REG-2027-007', registrationDate: '2027-02-10T11:30:00Z', participantName: 'Sofia Ramos', contactNumber: '09237891234', email: 'sofia@example.com', address: 'Legazpi City', carMakeModel: 'Toyota 86', plateNumber: 'STU 7890', registrationType: 'VIP', status: 'Checked In', registrationFee: 3500, amountPaid: 3500, paymentStatus: 'Paid' },
  { id: 8, registrationNumber: 'REG-2027-008', registrationDate: '2027-02-10T12:00:00Z', participantName: 'Daniel Cruz', contactNumber: '09248912345', email: 'daniel@example.com', address: 'Naga City', carMakeModel: 'Honda Accord', plateNumber: 'VWX 8901', registrationType: 'Exhibitor', status: 'Cancelled', registrationFee: 1500, amountPaid: 0, paymentStatus: 'Unpaid' },
  { id: 9, registrationNumber: 'REG-2027-009', registrationDate: '2027-02-10T12:30:00Z', participantName: 'Angela Flores', contactNumber: '09259012345', email: 'angela@example.com', address: 'Sorsogon City', carMakeModel: 'BMW M3', plateNumber: 'YZA 9012', registrationType: 'Competitor', status: 'Confirmed', registrationFee: 2500, amountPaid: 1500, paymentStatus: 'Partial' },
  { id: 10, registrationNumber: 'REG-2027-010', registrationDate: '2027-02-10T13:00:00Z', participantName: 'Kevin Torres', contactNumber: '09260123456', email: 'kevin@example.com', address: 'Daraga', carMakeModel: 'Ford Mustang', plateNumber: 'BCD 0123', registrationType: 'VIP', status: 'Pending', registrationFee: 3500, amountPaid: 0, paymentStatus: 'Unpaid' },
  { id: 11, registrationNumber: 'REG-2027-011', registrationDate: '2027-02-10T13:30:00Z', participantName: 'Nicole Perez', contactNumber: '09271234567', email: 'nicole@example.com', address: 'Sorsogon City', carMakeModel: 'Mazda MX-5', plateNumber: 'EFG 1234', registrationType: 'Exhibitor', status: 'Confirmed', registrationFee: 1500, amountPaid: 1500, paymentStatus: 'Paid' },
  { id: 12, registrationNumber: 'REG-2027-012', registrationDate: '2027-02-10T14:00:00Z', participantName: 'Joshua Lim', contactNumber: '09282345678', email: 'joshua@example.com', address: 'Legazpi City', carMakeModel: 'Toyota GR86', plateNumber: 'HIJ 2345', registrationType: 'Competitor', status: 'Checked In', registrationFee: 2500, amountPaid: 2500, paymentStatus: 'Paid' },
  { id: 13, registrationNumber: 'REG-2027-013', registrationDate: '2027-02-10T14:30:00Z', participantName: 'Patricia Diaz', contactNumber: '09293456789', email: 'patricia@example.com', address: 'Naga City', carMakeModel: 'Honda Jazz', plateNumber: 'KLM 3456', registrationType: 'Exhibitor', status: 'Pending', registrationFee: 1500, amountPaid: 500, paymentStatus: 'Partial' },
  { id: 14, registrationNumber: 'REG-2027-014', registrationDate: '2027-02-10T15:00:00Z', participantName: 'Michael Tan', contactNumber: '09304567891', email: 'michael@example.com', address: 'Sorsogon City', carMakeModel: 'Nissan Silvia S15', plateNumber: 'NOP 4567', registrationType: 'Competitor', status: 'Confirmed', registrationFee: 2500, amountPaid: 2500, paymentStatus: 'Paid' },
  { id: 15, registrationNumber: 'REG-2027-015', registrationDate: '2027-02-10T15:30:00Z', participantName: 'Isabella Lopez', contactNumber: '09315678912', email: 'isabella@example.com', address: 'Daraga', carMakeModel: 'Mercedes-Benz C63', plateNumber: 'QRS 5678', registrationType: 'VIP', status: 'Cancelled', registrationFee: 3500, amountPaid: 0, paymentStatus: 'Unpaid' },
  { id: 16, registrationNumber: 'REG-2027-016', registrationDate: '2027-02-10T16:00:00Z', participantName: 'Gabriel Bautista', contactNumber: '09326789123', email: 'gabriel@example.com', address: 'Sorsogon City', carMakeModel: 'Toyota Corolla', plateNumber: 'TUV 6789', registrationType: 'Exhibitor', status: 'Confirmed', registrationFee: 1500, amountPaid: 1500, paymentStatus: 'Paid' },
  { id: 17, registrationNumber: 'REG-2027-017', registrationDate: '2027-02-10T16:30:00Z', participantName: 'Camille Aquino', contactNumber: '09337891234', email: 'camille@example.com', address: 'Legazpi City', carMakeModel: 'Mitsubishi Evo X', plateNumber: 'WXY 7890', registrationType: 'Competitor', status: 'Pending', registrationFee: 2500, amountPaid: 0, paymentStatus: 'Unpaid' },
  { id: 18, registrationNumber: 'REG-2027-018', registrationDate: '2027-02-10T17:00:00Z', participantName: 'Nathan Rivera', contactNumber: '09348912345', email: 'nathan@example.com', address: 'Naga City', carMakeModel: 'Porsche 911', plateNumber: 'ZAB 8901', registrationType: 'VIP', status: 'Checked In', registrationFee: 3500, amountPaid: 3500, paymentStatus: 'Paid' },
  { id: 19, registrationNumber: 'REG-2027-019', registrationDate: '2027-02-10T17:30:00Z', participantName: 'Bianca Castillo', contactNumber: '09359012345', email: 'bianca@example.com', address: 'Sorsogon City', carMakeModel: 'Hyundai Genesis Coupe', plateNumber: 'CDE 9012', registrationType: 'Exhibitor', status: 'Confirmed', registrationFee: 1500, amountPaid: 1000, paymentStatus: 'Partial' },
  { id: 20, registrationNumber: 'REG-2027-020', registrationDate: '2027-02-10T18:00:00Z', participantName: 'Francis Uy', contactNumber: '09360123456', email: 'francis@example.com', address: 'Daraga', carMakeModel: 'Chevrolet Camaro', plateNumber: 'FGH 0123', registrationType: 'Competitor', status: 'Pending', registrationFee: 2500, amountPaid: 0, paymentStatus: 'Unpaid' },
  { id: 21, registrationNumber: 'REG-2027-021', registrationDate: '2027-02-10T18:30:00Z', participantName: 'Andrea Valdez', contactNumber: '09371234567', email: 'andrea@example.com', address: 'Sorsogon City', carMakeModel: 'Toyota Vios', plateNumber: 'IJK 1234', registrationType: 'Exhibitor', status: 'Confirmed', registrationFee: 1500, amountPaid: 1500, paymentStatus: 'Paid' },
  { id: 22, registrationNumber: 'REG-2027-022', registrationDate: '2027-02-10T19:00:00Z', participantName: 'Rafael Gomez', contactNumber: '09382345678', email: 'rafael@example.com', address: 'Legazpi City', carMakeModel: 'Honda Civic Type R', plateNumber: 'LMN 2345', registrationType: 'Competitor', status: 'Checked In', registrationFee: 2500, amountPaid: 2500, paymentStatus: 'Paid' },
  { id: 23, registrationNumber: 'REG-2027-023', registrationDate: '2027-02-10T19:30:00Z', participantName: 'Chloe Martin', contactNumber: '09393456789', email: 'chloe@example.com', address: 'Naga City', carMakeModel: 'BMW M4', plateNumber: 'OPQ 3456', registrationType: 'VIP', status: 'Confirmed', registrationFee: 3500, amountPaid: 3500, paymentStatus: 'Paid' },
  { id: 24, registrationNumber: 'REG-2027-024', registrationDate: '2027-02-10T20:00:00Z', participantName: 'Ethan Sy', contactNumber: '09404567891', email: 'ethan@example.com', address: 'Sorsogon City', carMakeModel: 'Nissan 350Z', plateNumber: 'RST 4567', registrationType: 'Competitor', status: 'Pending', registrationFee: 2500, amountPaid: 1000, paymentStatus: 'Partial' },
  { id: 25, registrationNumber: 'REG-2027-025', registrationDate: '2027-02-10T20:30:00Z', participantName: 'Gabrielle Chua', contactNumber: '09415678912', email: 'gabrielle@example.com', address: 'Daraga', carMakeModel: 'Mazda 3', plateNumber: 'UVW 5678', registrationType: 'Exhibitor', status: 'Confirmed', registrationFee: 1500, amountPaid: 1500, paymentStatus: 'Paid' },
]

export async function getRegistrations({
  participantName = '',
  type = '',
  status = '',
  page = 1,
  pageSize = 10,
} = {}) {
  let filtered = [...registrations]

  if (participantName) {
    filtered = filtered.filter((item) =>
      item.participantName
        .toLowerCase()
        .includes(participantName.toLowerCase()),
    )
  }

  if (type && type !== 'All Types') {
    filtered = filtered.filter(
      (item) => item.registrationType === type,
    )
  }

  if (status && status !== 'All Statuses') {
    filtered = filtered.filter(
      (item) => item.status === status,
    )
  }

  const totalCount = filtered.length
  const totalPages = Math.ceil(totalCount / pageSize)
  const startIndex = (page - 1) * pageSize

  return {
    items: filtered.slice(startIndex, startIndex + pageSize),
    page,
    pageSize,
    totalCount,
    totalPages,
  }
}

export async function getSummary() {
  const totalFees = registrations.reduce(
    (total, item) => total + item.registrationFee,
    0,
  )

  const totalPayments = registrations.reduce(
    (total, item) => total + item.amountPaid,
    0,
  )

  return {
    totalRegistrations: registrations.length,
    confirmed: registrations.filter(
      (item) => item.status === 'Confirmed',
    ).length,
    checkedIn: registrations.filter(
      (item) => item.status === 'Checked In',
    ).length,
    pending: registrations.filter(
      (item) => item.status === 'Pending',
    ).length,
    cancelled: registrations.filter(
      (item) => item.status === 'Cancelled',
    ).length,
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  }
}
