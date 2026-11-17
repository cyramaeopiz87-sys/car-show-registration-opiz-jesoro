# AutoVista Events "Car Show 2027" Registration System
## Backend Task Technical Documentation & Project Verification Report

---

### Cover Page
- **Institution**: Computer Communication Development Institute (CCDI) — Sorsogon Campus
- **Course**: API Backend Development (Integrative Programming 2)
- **Instructor**: Elvin Manuel R. Luces, MIT (`cscoo2006@gmail.com` / `vhinle@gmail.com`)
- **Project Title**: Test Project — AutoVista Events "Car Show 2027" Registration System (Backend Task: C# Vertical Slice API)
- **Repository URL**: `https://github.com/cyramaeopiz87-sys/car-show-registration-opiz-jesoro`
- **Date of Submission**: November 2026
- **Team Members & Roles**:
  - **Dianne Jesoro** (`diannejesoro08-cloud` / `diannejesoro08@gmail.com`) — Backend Developer
  - **Cyra Mae Opiz** (`cyramaeopiz87-sys` / `cyramaeopiz87@example.com`) — Frontend Developer

---

## Table of Contents
1. [Executive Summary & Architecture Overview](#1-executive-summary--architecture-overview)
2. [Documented Screenshots & Endpoint Verification](#2-documented-screenshots--endpoint-verification)
   - [Screenshot 1 – Solution/Folder Structure](#screenshot-1--solutionfolder-structure-featuresregistrations-and-its-slices)
   - [Screenshot 2 – Scalar OpenAPI Documentation](#screenshot-2--scalar-ui-listing-all-registration-endpoints)
   - [Screenshot 3 – SQLite Database Schema & Migrations](#screenshot-3--carshowdb-in-sqlite-viewer--migrations-folder)
   - [Screenshot 4 – POST: Successful Create (201 Created)](#screenshot-4--post-successful-create-201-created)
   - [Screenshot 5 – POST: Validation Error (400 Bad Request)](#screenshot-5--post-validation-error-400-bad-request)
   - [Screenshot 6 – POST: Duplicate Plate Number (409 Conflict)](#screenshot-6--post-duplicate-plate-number-409-conflict)
   - [Screenshot 7 – GET All: Paged Result (200 OK)](#screenshot-7--get-all-paged-result-200-ok)
   - [Screenshot 8a – GET Filtered by Type](#screenshot-8a--get-filtered-by-type-vip)
   - [Screenshot 8b – GET Filtered by Status](#screenshot-8b--get-filtered-by-status-confirmed)
   - [Screenshot 8c – GET Filtered by Participant Name](#screenshot-8c--get-filtered-by-participant-name-juan)
   - [Screenshot 9a – GET by ID: Found (200 OK)](#screenshot-9a--get-by-id-found-200-ok)
   - [Screenshot 9b – GET by ID: Not Found (404 Not Found)](#screenshot-9b--get-by-id-not-found-404-not-found)
   - [Screenshot 10 – GET Summary: KPI Totals (200 OK)](#screenshot-10--get-summary-kpi-totals)
   - [Screenshot 11 – Completed Sample Test Scenarios Table (40/40 Passed)](#screenshot-11--completed-sample-test-scenarios-table-all-40-cases-passed)
   - [Screenshot 12 – Git Commit History](#screenshot-12--github-commit-history-showing-author-commits)
   - [Screenshot 13 – Running Full Application (React Dashboard + Backend API)](#screenshot-13--running-full-application-react-dashboard-consuming-backend-api)
3. [Reflection Answers (Backend Developer)](#3-reflection-answers-backend-developer)
   - [Question 1: Vertical Slice vs. Traditional Technical Layers](#question-1-vertical-slice-vs-traditional-technical-layers)
   - [Question 2: Validation, RFC 7807 ProblemDetails & HTTP Status Codes](#question-2-validation-rfc-7807-problemdetails--http-status-codes)
   - [Question 3: Server-Side Authority & Business Invariants](#question-3-server-side-authority--business-invariants)
   - [Question 4: Server-Side Filtering, Paging & Summary Aggregations](#question-4-server-side-filtering-paging--summary-aggregations)
   - [Question 5: Frontend-Backend Collaboration & JSON Contract Alignment](#question-5-frontend-backend-collaboration--json-contract-alignment)

---

## 1. Executive Summary & Architecture Overview

The **AutoVista Events "Car Show 2027" Registration API** was engineered in **C# / .NET 10** using a strict **Vertical Slice Architecture**, Domain-Driven Design (DDD) principles, ASP.NET Core Minimal APIs, and Entity Framework Core 10 with SQLite (`carshow.db`).

The domain revolves around a single core aggregate: `Registration`. The backend serves as the single source of truth for all business invariants:
- Automatic server calculation of `RegistrationFee` according to registration type: Exhibitor (₱1,500), Competitor (₱2,500), and VIP (₱5,000).
- Automatic generation of sequential registration identifiers in format `CS27-XXXX`.
- UTC timestamp generation (`RegistrationDate`) and default initial status (`Pending`).
- Verification that `AmountPaid` is non-negative and does not exceed the designated category fee.
- Duplicate detection on `PlateNumber` returning RFC 7807 `409 Conflict`.
- Server-side filtering, sorting (newest first), and pagination (1–50 items per page).
- Dedicated summary calculations excluding cancelled registrations from monetary totals.

---

## 2. Documented Screenshots & Endpoint Verification

### Screenshot 1 – Solution/Folder Structure (Features/Registrations and its Slices)
- **Image**: `docs/screenshots/01-solution-structure.png`
- **Explanation**: This screenshot demonstrates the Vertical Slice project layout under `Application/Features/Registrations/` and `Api/Features/Registrations/`. Instead of scattering files across global technical layers, all components of a feature are co-located: `CreateRegistration` (command, handler, response, validator), `GetRegistrations` (query, handler, response, validator), `GetRegistrationById` (query, handler, response), and `GetRegistrationSummary` (query, handler, response). This cohesion minimizes cognitive load and ensures that modifying or extending a slice has zero regression risk on unrelated features.

### Screenshot 2 – Scalar UI Listing All Registration Endpoints
- **Image**: `docs/screenshots/02-scalar-endpoints.png`
- **Explanation**: This screenshot displays the interactive Scalar API documentation available at `http://localhost:5205/scalar/v1`. It exhibits all exposed endpoints under the `Registrations` tag: `POST /api/registrations`, `GET /api/registrations`, `GET /api/registrations/summary`, and `GET /api/registrations/{id}` with `{id:guid}` route constraint. Scalar provides clear schemas, request bodies with string enum options, and sample responses for all four Minimal API endpoints.

### Screenshot 3 – carshow.db in SQLite Viewer & Migrations Folder
- **Image**: `docs/screenshots/03-sqlite-db-browser-and-migrations.png`
- **Explanation**: This capture shows `carshow.db` inspected via SQLite viewer alongside the `Infrastructure/Migrations/` directory. The `Registrations` table contains the 25 seeded records with diverse types, statuses, and payment states. Crucially, the schema inspection confirms the presence of unique indexes `IX_Registrations_PlateNumber` and `IX_Registrations_RegistrationNumber`, satisfying the database-level uniqueness constraint.

### Screenshot 4 – POST: Successful Create (201 Created)
- **Image**: `docs/screenshots/04-post-create-201.png`
- **Explanation**: This test submits a valid POST request for a Competitor with `amountPaid: 1000.00`. The API returns HTTP status `201 Created` with a `Location` header pointing to `/api/registrations/{id}`. The returned payload contains the generated sequential identifier `CS27-0026`, server-calculated fee `2500.00`, status `Pending`, and computed `paymentStatus: "Partial"`.

### Screenshot 5 – POST: Validation Error (400 Bad Request)
- **Image**: `docs/screenshots/05-post-validation-400.png`
- **Explanation**: When submitting a request body with empty strings for all six mandatory text fields, the endpoint filter intercepts the request prior to the handler. The API returns HTTP status `400 Bad Request` formatted as RFC 7807 `ValidationProblemDetails`. The `errors` dictionary contains explicit, localized messages for `ParticipantName`, `ContactNumber`, `Email`, `Address`, `CarMakeModel`, and `PlateNumber`.

### Screenshot 6 – POST: Duplicate Plate Number (409 Conflict)
- **Image**: `docs/screenshots/06-post-duplicate-plate-409.png`
- **Explanation**: Attempting to register another car with an existing plate number (e.g. `TST 1001`) triggers the business conflict check in the command handler. The API immediately halts the operation and returns HTTP status `409 Conflict` with ProblemDetails title `"Registration.Conflict"`. The detail message clearly states: `"A registration with plate number 'TST 1001' already exists."`

### Screenshot 7 – GET All: Paged Result (200 OK)
- **Image**: `docs/screenshots/07-get-all-paged-200.png`
- **Explanation**: Calling `GET /api/registrations` returns HTTP status `200 OK` with pagination metadata: `page: 1`, `pageSize: 10`, `totalCount: 26`, and `totalPages: 3`. Items are sorted by `RegistrationDate` in descending order, placing newly registered cars at the top of the feed followed by seeded entries.

### Screenshot 8a – GET Filtered by Type (VIP)
- **Image**: `docs/screenshots/08a-get-filter-type.png`
- **Explanation**: Querying `GET /api/registrations?type=VIP` filters the records on the server. Every item in the returned `items` array has `registrationType: "VIP"`. Unrelated records are excluded from both the items list and the returned `totalCount`.

### Screenshot 8b – GET Filtered by Status (Confirmed)
- **Image**: `docs/screenshots/08b-get-filter-status.png`
- **Explanation**: Querying `GET /api/registrations?status=Confirmed` isolates participants whose registrations are confirmed. The response contains only records where `status: "Confirmed"`, matching the 10 seeded confirmed entries and accurately calculating pagination for confirmed entries only.

### Screenshot 8c – GET Filtered by Participant Name (juan)
- **Image**: `docs/screenshots/08c-get-filter-name.png`
- **Explanation**: Querying `GET /api/registrations?participantName=juan` executes a case-insensitive SQL `LIKE` search. The result returns all records whose participant name contains the substring "juan", including both "Juan Dela Cruz" entries, regardless of casing.

### Screenshot 9a – GET by ID: Found (200 OK)
- **Image**: `docs/screenshots/09a-get-by-id-200.png`
- **Explanation**: Sending `GET /api/registrations/3f2c9a1e-8765-4321-ba98-fedcba098765` retrieves the exact registration record for Juan Dela Cruz (`CS27-0001`). The response returns HTTP `200 OK` with complete participant, car, fee, and payment details matching the shared contract.

### Screenshot 9b – GET by ID: Not Found (404 Not Found)
- **Image**: `docs/screenshots/09b-get-by-id-404.png`
- **Explanation**: Requesting a non-existent GUID (`GET /api/registrations/00000000-0000-0000-0000-000000000001`) returns HTTP status `404 Not Found`. The `Result<T>` failure is cleanly converted by `ResultExtensions` into a ProblemDetails payload with title `"Registration.NotFound"`.

### Screenshot 10 – GET Summary: KPI Totals
- **Image**: `docs/screenshots/10-get-summary-kpis.png`
- **Explanation**: Querying `GET /api/registrations/summary` returns HTTP `200 OK` with overall event KPIs. Before adding new registrations, the baseline seed metrics yield: `totalRegistrations: 25`, `confirmed: 10`, `checkedIn: 6`, `pending: 6`, `cancelled: 3`, `totalFees: 61500.00`, `totalPayments: 42000.00`, and `uncollectedPayments: 19500.00`. Crucially, cancelled registrations are excluded from the monetary sums.

### Screenshot 11 – Completed Sample Test Scenarios Table (All 40 Cases Passed)
- **Image**: `docs/screenshots/11-test-scenarios-pass.png`
- **Explanation**: The comprehensive automated test suite `scratch/test_all_40_cases.py` and `Api.http` executed all 40 scenarios from Section 3G against the running backend server. All 40 test cases achieved 100% `PASS`, validating validation errors, business conflict handling, paging, sorting, filtering, and database persistence.

### Screenshot 12 – GitHub Commit History Showing Author Commits
- **Image**: `docs/screenshots/12-github-commits-author.png`
- **Explanation**: The Git commit log illustrates the 11 required atomic commits authored under `diannejesoro08-cloud <diannejesoro08@gmail.com>` on the `backend` feature branch. Each commit corresponds to an incremental milestone with exact commit titles following the syllabus guidelines.

### Screenshot 13 – Running Full Application (React Dashboard Consuming Backend API)
- **Image**: `docs/screenshots/13-running-full-application.png`
- **Explanation**: The running React dashboard (`http://localhost:5173`) communicates seamlessly with the .NET 10 Minimal API (`http://localhost:5205`). The KPI cards dynamically reflect the server summary totals, the table displays live paged records from SQLite, and the "Add Registration" modal successfully registers participants through the REST API.

---

## 3. Reflection Answers (Backend Developer)

### Question 1: Vertical Slice vs. Traditional Technical Layers
**How did organizing code by feature (`CreateRegistration`, `GetRegistrations`, ...) instead of by technical layer affect how you added and found code? Give one concrete example from this project.**

Organizing the codebase by feature slices fundamentally altered our development velocity by keeping high-cohesion code grouped together. In a traditional layered architecture, implementing a single capability like `CreateRegistration` requires navigating through distant folders: `Controllers/`, `Services/`, `Interfaces/`, `DTOs/`, and `Validators/`. This creates significant mental friction and cross-layer coupling. With Vertical Slice Architecture, everything required for `CreateRegistration` lives in one dedicated folder: `Application/Features/Registrations/CreateRegistration/` containing the command, handler, response, and validator. When I needed to refine the rule ensuring that `AmountPaid` cannot exceed the `RegistrationFee` for a chosen type, I only needed to modify `CreateRegistrationValidator.cs` right next to its command and handler. This eliminated the fear of breaking the `GetRegistrations` or `GetRegistrationSummary` slices, because slices do not share fragile generic service classes.

### Question 2: Validation, RFC 7807 ProblemDetails & HTTP Status Codes
**Why does the API return 400, 404, and 409 instead of throwing exceptions or always returning 500? How does this help your frontend partner build a better UI?**

Returning explicit RFC 7807 HTTP status codes (`400 Bad Request`, `404 Not Found`, `409 Conflict`) establishes a reliable, predictable communication contract between the server and the frontend client. When an API carelessly throws unhandled exceptions or returns generic `500 Internal Server Error` responses, it forces the frontend into defensive programming where it can only display vague "Something went wrong" messages. By returning `400 Bad Request` with a structured `errors` dictionary from FluentValidation, my frontend partner can easily highlight the exact input fields that failed (e.g. invalid Philippine mobile number or text exceeding 150 characters) directly under the corresponding form inputs. Similarly, receiving `409 Conflict` specifically informs the UI that the car's plate number is already registered, allowing the UI to present a targeted conflict modal rather than a generic crash. Finally, using `Result<T>` instead of throwing expensive exceptions for expected domain outcomes ensures optimal runtime performance and zero unexpected server crashes.

### Question 3: Server-Side Authority & Business Invariants
**Why should the server, and not the client, set the registration fee, number, date, and status? What could go wrong if the frontend sent these values?**

The backend API must be the single source of truth and absolute authority for all domain invariants because client applications are inherently untrusted environments. If the frontend were allowed to supply the `RegistrationFee`, a malicious user or tampered request could send `registrationFee: 1.00` for a VIP registration, resulting in massive financial discrepancy and loss for the event organizers. Similarly, allowing the client to provide `RegistrationNumber` would lead to sequence collisions, race conditions, and uncoordinated numbering formats like `"HACK-1"`. The registration timestamp (`RegistrationDate`) must be recorded in UTC directly on the server to prevent participants from spoofing event deadlines by altering their device clock. Finally, allowing the client to set `Status = "Confirmed"` or `"CheckedIn"` would bypass the organizer's approval and payment collection workflow, allowing unpaid entries to check in freely. Enforcing these values strictly inside `CreateRegistrationHandler` guarantees system security and data integrity regardless of what payload reaches the endpoint.

### Question 4: Server-Side Filtering, Paging & Summary Aggregations
**Why are filtering and paging done in the API instead of the browser, and why does the dashboard need a separate `/summary` endpoint instead of adding up the current page?**

Server-side filtering and paging are essential for scalability, network bandwidth efficiency, and client performance. If the API returned every registration in a single response and relied on the browser to filter and paginate, the application might work with 25 records but would completely freeze and crash user mobile devices when the event grows to 5,000 registrations. By performing SQL-level filtering (`WHERE`), ordering (`ORDER BY`), and paging (`OFFSET / FETCH`) through EF Core, the server only transfers the exact 10 records requested for the active page. Furthermore, the dashboard cannot simply compute totals by summing up the records on the current page, because the current page only represents a tiny, filtered slice of the dataset. If the active page displays 5 Exhibitor records, summing the page would report total revenue of ₱7,500 instead of the real event revenue of ₱61,500 across all participants. A dedicated `/api/registrations/summary` endpoint computes event-wide KPIs across the complete database while applying domain rules, such as strictly excluding cancelled registrations from monetary totals.

### Question 5: Frontend-Backend Collaboration & JSON Contract Alignment
**How did you and your Frontend Developer agree on the JSON contract? Describe one integration problem you hit (CORS, field names, enum values, date formats, ...) and how you solved it.**

My Frontend partner and I agreed upfront on the JSON data contract before writing the integration logic, matching the contract specification outlined on page 5 of the project requirements. We documented the exact casing (camelCase), date formatting (ISO 8601 UTC string), and enum values (`Exhibitor`, `Competitor`, `VIP`, and `Pending`, `Confirmed`, `CheckedIn`, `Cancelled`). During initial integration, we encountered a Cross-Origin Resource Sharing (CORS) restriction: the browser blocked the React development server running on `http://localhost:5173` from accessing the Minimal API running on `http://localhost:5205`. Furthermore, by default, .NET Minimal APIs serialize C# enums as numeric integers (`0`, `1`, `2`) rather than readable strings, causing the frontend status badges and category labels to break. I resolved both challenges on the backend by registering a named CORS policy allowing `http://localhost:5173` with credentials, any header, and any HTTP method, and by registering `JsonStringEnumConverter` in `ConfigureHttpJsonOptions`. This ensured seamless data exchange and instant rendering on the React dashboard.

---

## 4. Completed Sample Test Scenarios (40 / 40 Verified)

| Test ID | Scenario Description | Request / Query | Expected Status | Result |
|---|---|---|---|---|
| **Case 01** | Valid Competitor, partly paid | `POST /api/registrations` (Body A) | `201 Created` | **PASS** |
| **Case 02** | Valid Exhibitor, not paid | `POST /api/registrations` (Exhibitor, fee 1500, paid 0) | `201 Created` | **PASS** |
| **Case 03** | Valid VIP, fully paid | `POST /api/registrations` (VIP, fee 5000, paid 5000) | `201 Created` | **PASS** |
| **Case 04** | Registration number increases consecutively | Compare generated numbers from TC-01..TC-03 | `200 OK` | **PASS** |
| **Case 05** | Client tries to set server-only fields | Extra fields (`fee:1`, `status:Confirmed`, etc.) ignored | `201 Created` | **PASS** |
| **Case 06** | All text fields empty | 6 empty text fields | `400 Bad Request` | **PASS** |
| **Case 07** | Invalid contact number | `contactNumber: "12345"` | `400 Bad Request` | **PASS** |
| **Case 08** | Invalid email format | `email: "juan-at-example"` | `400 Bad Request` | **PASS** |
| **Case 09** | Paid more than the fee | Exhibitor fee 1500 with `amountPaid: 2000` | `400 Bad Request` | **PASS** |
| **Case 10** | Negative amount paid | `amountPaid: -100` | `400 Bad Request` | **PASS** |
| **Case 11** | Unknown registration type | `registrationType: "Sponsor"` | `400 Bad Request` | **PASS** |
| **Case 12** | Text longer than allowed | `participantName` 151 characters | `400 Bad Request` | **PASS** |
| **Case 13** | Duplicate plate number | Same plate `TST 1001` as TC-01 | `409 Conflict` | **PASS** |
| **Case 14** | Default list | `GET /api/registrations` (default page 1, size 10) | `200 OK` | **PASS** |
| **Case 15** | Newest first | Registrations sorted by `RegistrationDate` descending | `200 OK` | **PASS** |
| **Case 16** | Second page, custom size | `GET /api/registrations?page=2&pageSize=5` | `200 OK` | **PASS** |
| **Case 17** | Page past the end | `GET /api/registrations?page=999` (returns items `[]`) | `200 OK` | **PASS** |
| **Case 18** | Invalid page | `GET /api/registrations?page=0` | `400 Bad Request` | **PASS** |
| **Case 19** | Page size too large | `GET /api/registrations?pageSize=100` | `400 Bad Request` | **PASS** |
| **Case 20** | Find by type | `GET /api/registrations?type=VIP` | `200 OK` | **PASS** |
| **Case 21** | Find by status | `GET /api/registrations?status=Confirmed` | `200 OK` | **PASS** |
| **Case 22** | Find by participant name | `GET /api/registrations?participantName=juan` | `200 OK` | **PASS** |
| **Case 23** | Name search ignores case | `GET /api/registrations?participantName=JUAN` | `200 OK` | **PASS** |
| **Case 24** | Partial name match | `GET /api/registrations?participantName=dela` | `200 OK` | **PASS** |
| **Case 25** | Combined filters | `?type=Competitor&status=Pending&participantName=juan` | `200 OK` | **PASS** |
| **Case 26** | No matches | `GET /api/registrations?participantName=zzzzzz` | `200 OK` | **PASS** |
| **Case 27** | Invalid type filter | `GET /api/registrations?type=Sponsor` | `400 Bad Request` | **PASS** |
| **Case 28** | Invalid status filter | `GET /api/registrations?status=Done` | `400 Bad Request` | **PASS** |
| **Case 29** | Existing ID | `GET /api/registrations/{tc01_id}` | `200 OK` | **PASS** |
| **Case 30** | ID that does not exist | `GET /api/registrations/00000000-0000-0000-0000-000000000001` | `404 Not Found` | **PASS** |
| **Case 31** | Not a valid GUID | `GET /api/registrations/abc` (route constraint `{id:guid}`) | `404 Not Found` | **PASS** |
| **Case 32** | Summary returns all fields | `GET /api/registrations/summary` | `200 OK` | **PASS** |
| **Case 33** | Status counts add up | `confirmed + checkedIn + pending + cancelled = total` | `200 OK` | **PASS** |
| **Case 34** | Totals match the list | `summary.totalRegistrations == list.totalCount` | `200 OK` | **PASS** |
| **Case 35** | Money adds up | `totalFees - totalPayments == uncollectedPayments` | `200 OK` | **PASS** |
| **Case 36** | Cancelled excluded from money | Seeded Cancelled fee/payment not in money totals | `200 OK` | **PASS** |
| **Case 37** | Summary updates after new reg | POST Exhibitor with fee 1500, paid 500 -> metrics +1 | `200 OK` | **PASS** |
| **Case 38** | `/summary` not treated as ID | Route constraint `{id:guid}` ensures clean resolution | `200 OK` | **PASS** |
| **Case 39** | Data survives a restart | Restart API server; SQLite preserves data without re-seed | `200 OK` | **PASS** |
| **Case 40** | Unique indexes exist in SQLite | Unique indexes verified on `PlateNumber` & `RegNumber` | `200 OK` | **PASS** |
