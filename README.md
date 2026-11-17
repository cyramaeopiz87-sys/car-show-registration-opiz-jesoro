# AutoVista Events — Car Show 2027 Registration System

A full-stack event registration management application designed for the AutoVista Events "Car Show 2027" held at Sorsogon City Coliseum. Built with a Vertical Slice Architecture .NET 10 Minimal API backend and a modern React (Vite) frontend.

---

## 👥 Project Team & Roles

| Member | Role | Responsibilities |
|---|---|---|
| **Dianne Jesoro** | **Backend Developer** | C# .NET 10 Vertical Slice Architecture, Minimal APIs, EF Core, SQLite, FluentValidation, Scalar OpenAPI, Domain Logic |
| **Cyra Mae Opiz** | **Frontend Developer** | React 19 (Vite), Bootstrap UI, Dashboard, Registration management interface |

---

## 🏗️ Architecture & Technology Stack

### Backend
- **Framework**: C# / .NET 10 (ASP.NET Core Minimal APIs)
- **Architecture**: Vertical Slice Architecture & Domain-Driven Design (DDD)
- **Data Access & Persistence**: Entity Framework Core 10 with SQLite (`carshow.db`)
- **Validation**: FluentValidation with route-level `ValidationFilter<T>`
- **API Documentation**: Scalar OpenAPI (`/scalar/v1`)
- **Patterns**: Result pattern (`Result<T>`), CQRS command/query handlers, RFC 7807 `ProblemDetails`

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Bootstrap 5 + Bootstrap Icons

---

## 🚀 How to Run the Applications

### 1. Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [Node.js](https://nodejs.org/) (v20+ or v24+)

### 2. Backend API Setup
```bash
cd backend/Api
dotnet restore
dotnet ef database update --project ../Infrastructure
dotnet run
```
- API Host: `http://localhost:5205`
- Scalar OpenAPI Documentation: `http://localhost:5205/scalar/v1`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Frontend Dev Server: `http://localhost:5173`
