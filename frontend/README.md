# AutoVista Events — Frontend

A React-based dashboard for managing and monitoring registrations for the 2027 Car Show.

## Technologies Used

- React
- Vite
- JavaScript
- Bootstrap
- Bootstrap Icons
- C# ASP.NET Core Web API

## Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the frontend

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

`http://localhost:5173`

## Backend API Connection

The frontend connects to the C# ASP.NET Core backend.

Default API base URL:

`http://localhost:5205/api`

The API service is configured in:

`src/api/sample-data.js`

### Changing the API URL

To connect to another backend server, update the `API_BASE_URL` constant in `src/api/sample-data.js`.

Example:

```js
const API_BASE_URL = 'http://localhost:5205/api'
```

Replace the URL with the address of your backend API when necessary.

## API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/registrations` | Retrieve registrations with search, filters, and pagination |
| GET | `/api/registrations/summary` | Retrieve dashboard statistics |
| POST | `/api/registrations` | Create a new registration |

## Main Features

- Dashboard summary cards
- Participant name search with debounce
- Registration type and status filters
- Clear filters
- Server-side pagination
- Page-size selection
- Loading, empty, and error states
- Retry button when the API is unavailable
- New registration form
- Light and dark themes

## Running the Application

Make sure the backend API is running before using the frontend so registration data can load correctly.